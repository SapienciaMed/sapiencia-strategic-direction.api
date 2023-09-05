import { ICause, IEffect, IParticipatingActors, IProject, IProjectTemp } from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Repositories/ProjectRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { ICausesRepository } from "App/Repositories/CausesRepository";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffectsRepository } from "App/Repositories/EffectsRepository";
import { IActorsRepository } from "App/Repositories/ActorsRepository";

export interface IProjectService {
  getProjectByUser(user: string): Promise<ApiResponse<IProject>>;
  createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<ApiResponse<IProject>>;
  updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>>
}

export default class ProjectService implements IProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private causesRepository: ICausesRepository,
    private effectsRepository: IEffectsRepository,
    private actorsRepository: IActorsRepository,
  ) {}

  async getProjectByUser(user: string): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.getProjectByUser(user);

    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<ApiResponse<IProject>> {
    const projectCreate = await this.projectRepository.createProject(project, trx);
    let causes: ICause[] | null = null;
    let effects: IEffect[] | null = null;
    let actors: IParticipatingActors[] | null = null;
    if(project.identification?.problemDescription?.causes) {
      causes = await this.causesRepository.createCauses(project.identification.problemDescription.causes, projectCreate.id, trx);
    }
    if(project.identification?.problemDescription?.effects) {
      effects = await this.effectsRepository.createEffects(project.identification.problemDescription.effects, projectCreate.id, trx);
    }
    if(project.identification?.actors?.actors) {
      actors = await this.actorsRepository.createActors(project.identification.actors.actors, projectCreate.id, trx);
    }
    return new ApiResponse({...projectCreate, causes: causes, effects: effects, actors: actors}, EResponseCodes.OK); 
  }

  async updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.updateProject(project, id, trx);
    let causes: ICause[] | null = null;
    let effects: IEffect[] | null = null;
    let actors: IParticipatingActors[] | null = null;
    if(project.identification?.problemDescription?.causes) {
      causes = await this.causesRepository.updateCauses(project.identification.problemDescription.causes, id, trx);
    }
    if(project.identification?.problemDescription?.effects) {
      effects = await this.effectsRepository.updateEffects(project.identification.problemDescription.effects, id, trx);
    }
    if(project.identification?.actors?.actors) {
      actors = await this.actorsRepository.updateActors(project.identification.actors.actors, id, trx);
    }
    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse({...res, causes: causes, effects: effects, actors: actors}, EResponseCodes.OK); 
  }
}

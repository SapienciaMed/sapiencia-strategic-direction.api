import { ICause, IEffect, IProject, IProjectTemp } from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Repositories/ProjectRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { ICausesRepository } from "App/Repositories/CausesRepository";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffectsRepository } from "App/Repositories/EffectsRepository";

export interface IProjectService {
  getProjectById(id: number): Promise<ApiResponse<IProject>>;
  createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<ApiResponse<IProject>>;
  updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>>
}

export default class ProjectService implements IProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private causesRepository: ICausesRepository,
    private effectsRepository: IEffectsRepository,
  ) {}

  async getProjectById(id: number): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.getProjectById(id);

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
    let causes: ICause[] | null = null;
    let effects: IEffect[] | null = null;
    if(project.identification?.problemDescription?.causes) {
      causes = await this.causesRepository.createCauses(project.identification.problemDescription.causes, trx);
    }
    if(project.identification?.problemDescription?.effects) {
      effects = await this.effectsRepository.createEffects(project.identification.problemDescription.effects, trx);
    }
    const projectCreate = await this.projectRepository.createProject(project, trx, causes, effects);
    projectCreate.causes = causes ? {...causes[0]} : null;
    projectCreate.effects = effects ? {...effects[0]} : null;
    return new ApiResponse(projectCreate, EResponseCodes.OK); 
  }

  async updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.updateProject(project, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

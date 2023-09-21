import { ICause, IDemographicCharacteristics, IEffect, IEffectEnviromentForm, INeedObjetive, IParticipatingActors, IProject, IProjectFilters, IProjectTemp } from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Repositories/ProjectRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { ICausesRepository } from "App/Repositories/CausesRepository";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffectsRepository } from "App/Repositories/EffectsRepository";
import { IActorsRepository } from "App/Repositories/ActorsRepository";
import { IClassificationsRepository } from "App/Repositories/ClassificationsRepository";
import { ISpecificObjectivesRepository } from "App/Repositories/SpecificObjectivesRepository";
import { IEnvironmentalEffectsRepository } from "App/Repositories/EnvironmentalEffectsRepository";

export interface IProjectService {
  getProjectByUser(user: string): Promise<ApiResponse<IProject>>;
  createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<ApiResponse<IProject>>;
  updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>>
  getProjectsByFilters(filters: IProjectFilters): Promise<ApiResponse<IProject[]>>;
}

export default class ProjectService implements IProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private causesRepository: ICausesRepository,
    private effectsRepository: IEffectsRepository,
    private actorsRepository: IActorsRepository,
    private classificationsRepository: IClassificationsRepository,
    private specificObjectivesRepository: ISpecificObjectivesRepository,
    private environmentalEffectsRepository: IEnvironmentalEffectsRepository,
  ) { }


async getProjectsByFilters(filters: IProjectFilters): Promise<ApiResponse<IProject[]>> {
  const res = await this.projectRepository.getProjectsByFilters(filters);
  return new ApiResponse(res, EResponseCodes.OK)
}


  async getProjectByUser(user: string): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.getProjectByUser(user);

    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.WARN,
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
    let classifications: IDemographicCharacteristics[] | null = null;
    let specificObjectives: INeedObjetive[] | null = null;
    let environmentalEffects: IEffectEnviromentForm[] | null = null;
    if (project.identification?.problemDescription?.causes) {
      causes = await this.causesRepository.createCauses(project.identification.problemDescription.causes, projectCreate.id, trx);
    }
    if (project.identification?.problemDescription?.effects) {
      effects = await this.effectsRepository.createEffects(project.identification.problemDescription.effects, projectCreate.id, trx);
    }
    if (project.identification?.actors?.actors) {
      actors = await this.actorsRepository.createActors(project.identification.actors.actors, projectCreate.id, trx);
    }
    if (project.identification?.poblation?.demographic) {
      classifications = await this.classificationsRepository.createClassifications(project.identification.poblation.demographic, projectCreate.id, trx);
    }
    if (project.preparation?.needs?.objetives) {
      specificObjectives = await this.specificObjectivesRepository.createSpecificObjectives(project.preparation.needs.objetives, causes, projectCreate.id, trx);
    }
    if (project.preparation?.enviromentalAnalysis?.effects) {
      environmentalEffects = await this.environmentalEffectsRepository.createEnvironmentalEffectsRepository(project.preparation.enviromentalAnalysis.effects, projectCreate.id, trx);
    }
    return new ApiResponse(
      {
        ...projectCreate,
        causes: causes,
        effects: effects,
        actors: actors,
        classifications: classifications,
        specificObjectives: specificObjectives,
        environmentalEffects: environmentalEffects
      },
      EResponseCodes.OK
    );
  }

  async updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.updateProject(project, id, trx);
    let causes: ICause[] | null = null;
    let effects: IEffect[] | null = null;
    let actors: IParticipatingActors[] | null = null;
    let classifications: IDemographicCharacteristics[] | null = null;
    let specificObjectives: INeedObjetive[] | null = null;
    let environmentalEffects: IEffectEnviromentForm[] | null = null;
    if (project.identification?.problemDescription?.causes) {
      causes = await this.causesRepository.updateCauses(project.identification.problemDescription.causes, id, trx);
    }
    if (project.identification?.problemDescription?.effects) {
      effects = await this.effectsRepository.updateEffects(project.identification.problemDescription.effects, id, trx);
    }
    if (project.identification?.actors?.actors) {
      actors = await this.actorsRepository.updateActors(project.identification.actors.actors, id, trx);
    }
    if (project.identification?.poblation?.demographic) {
      classifications = await this.classificationsRepository.updateClassifications(project.identification.poblation.demographic, id, trx);
    }
    if (project.preparation?.needs?.objetives) {
      specificObjectives = await this.specificObjectivesRepository.updateSpecificObjectives(project.preparation.needs.objetives, causes, id, trx);
    }
    if (project.preparation?.enviromentalAnalysis?.effects) {
      environmentalEffects = await this.environmentalEffectsRepository.updateEnvironmentalEffectsRepository(project.preparation.enviromentalAnalysis.effects, id, trx);
    }
    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(
      {
        ...res,
        causes: causes,
        effects: effects,
        actors: actors,
        classifications: classifications,
        specificObjectives: specificObjectives,
        environmentalEffects: environmentalEffects
      },
      EResponseCodes.OK
    );
  }
}

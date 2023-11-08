import { IActivitiesProject, IActivityMGA, IAddLogicFrame, IProjectFiltersPaginated ,IAddRisks, ICause, IDemographicCharacteristics, IEffect, IEffectEnviromentForm, IIndicator, INeedObjetive, IParticipatingActors, IProject, IProjectFilters, IProjectPaginated, IProjectTemp, ISourceFunding, IprofitsIncome, IFinishProjectForm, IHistoricalFiltersPaginated } from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Interfaces/repositories/IProjectRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { ICausesRepository } from "App/Repositories/CausesRepository";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffectsRepository } from "App/Repositories/EffectsRepository";
import { IActorsRepository } from "App/Repositories/ActorsRepository";
import { IClassificationsRepository } from "App/Repositories/ClassificationsRepository";
import { ISpecificObjectivesRepository } from "App/Repositories/SpecificObjectivesRepository";
import { IEnvironmentalEffectsRepository } from "App/Repositories/EnvironmentalEffectsRepository";
import { IActivitiesRepository } from "App/Repositories/ActivitiesRepository";
import { IRisksRepository } from "App/Repositories/RisksRepository";
import { IProfitsIncomeRepository } from "App/Repositories/ProfitsIncomeRepository"
import { ISourceFundingRepository } from "App/Repositories/SourceFundingRepository";
import { IIndicatorsRepository } from "App/Repositories/IndicatorsRepository";
import { ILogicFrameRepository } from "App/Repositories/LogicFrameRepository";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";

export interface IProjectService {
  getProjectByUser(user: string): Promise<ApiResponse<IProject>>;
  createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<ApiResponse<IProject>>;
  updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>>
  getProjectsByFilters(filters: IProjectFilters): Promise<ApiResponse<IProject[]>>;
  getProjectsPaginated(filters: IProjectPaginated): Promise<ApiResponse<IPagingData<IProject>>>
  getAllProjects(): Promise<ApiResponse<IProject[]>>;
  getAllHistorical( bpin: number ): Promise<ApiResponse<IProject[]>>;
  getAllHistoricalPaginated( 
    filters: IHistoricalFiltersPaginated 
  ): Promise<ApiResponse<IPagingData<IProject>>>;
  getProjectPaginated(
    filters: IProjectFiltersPaginated
  ): Promise<ApiResponse<IPagingData<IProject>>>;
  getAllStatus(): Promise<ApiResponse<MasterTable[]>>
  getProjectById(id: number): Promise<ApiResponse<IProject>>;
  finishProject(data: IFinishProjectForm, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>>;
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
    private activitiesRepository: IActivitiesRepository,
    private risksRepository: IRisksRepository,
    private profitsRepository: IProfitsIncomeRepository,
    private sourceFundingRepository: ISourceFundingRepository,
    private indicatorsRepository: IIndicatorsRepository,
    private logicRepository: ILogicFrameRepository,
  ) { }
  async getProjectsPaginated(filters: IProjectPaginated): Promise<ApiResponse<IPagingData<IProject>>> {
    const res = await this.projectRepository.getProjectsPaginated(filters);
    return new ApiResponse(res, EResponseCodes.OK)
  }

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
    let activities: IActivityMGA[] | null = null;
    let risks: IAddRisks[] | null = null;
    let profitsIncome: IprofitsIncome[] | null = null;
    let sourceFunding: ISourceFunding[] | null = null;
    let indicators: IIndicator[] | null = null;
    let logicFrame: IAddLogicFrame[] | null = null;

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
    if (project.preparation?.activities?.activities) {
      activities = await this.activitiesRepository.createActivities(project.preparation.activities.activities, causes, projectCreate.id, trx);
    }
    if (project.preparation?.risks?.risks) {
      risks = await this.risksRepository.createRisks(project.preparation.risks.risks, projectCreate.id, trx);
    }
    if (project.programation?.profitsIncome?.profitsIncome) {
      profitsIncome = await this.profitsRepository.createProfits(project.programation.profitsIncome.profitsIncome, projectCreate.id, trx);
    }
    if (project.programation?.sourceFunding?.sourceFunding) {
      sourceFunding = await this.sourceFundingRepository.createSourceFunding(project.programation.sourceFunding.sourceFunding, projectCreate.id, trx);
    }
    if (project.programation?.indicators?.indicators) {
      indicators = await this.indicatorsRepository.createIndicators(project.programation.indicators.indicators, projectCreate.id, trx);
    }
    if(project.programation?.logicFrame?.logicFrame){
      logicFrame = await this.logicRepository.createLogicFrame(project.programation.logicFrame.logicFrame, projectCreate.id, trx , indicators );
    }

    return new ApiResponse(
      {
        ...projectCreate,
        causes: causes,
        effects: effects,
        actors: actors,
        classifications: classifications,
        specificObjectives: specificObjectives,
        environmentalEffects: environmentalEffects,
        risks: risks,
        profitsIncome: profitsIncome,
        sourceFunding: sourceFunding,
        activities: activities ? activities.map((item): IActivitiesProject => {
          return {
            ...item, budgetsMGA: [
              {
                budget: item.budgetsMGA.year0.budget,
                year: 0,
                validity: item.budgetsMGA.year0.validity
              },
              {
                budget: item.budgetsMGA.year1.budget,
                year: 1,
                validity: item.budgetsMGA.year1.validity
              },
              {
                budget: item.budgetsMGA.year2.budget,
                year: 2,
                validity: item.budgetsMGA.year2.validity
              },
              {
                budget: item.budgetsMGA.year3.budget,
                year: 3,
                validity: item.budgetsMGA.year3.validity
              },
              {
                budget: item.budgetsMGA.year4.budget,
                year: 4,
                validity: item.budgetsMGA.year4.validity
              }
            ]
          }
        }) : null,
        indicatorsAction: indicators ? indicators.filter(indicator => indicator.type === 3).map(indicator => {
          return {
            type: indicator.type,
            objective: indicator.objective,
            dpnIndicator: indicator.dpnIndicator,
            dpn: indicator.dpn,
            staticValueCode: indicator.staticValueCode,
            staticValue: indicator.staticValue,
            total: indicator.total,
            accumulative: indicator.accumulative,
            productMGA: indicator.productMGA,
            measurement: indicator.measurement,
            year0: indicator.year0,
            year1: indicator.year1,
            year2: indicator.year2,
            year3: indicator.year3,
            year4: indicator.year4
          }
        }) : null,
        indicatorsIndicative: indicators ? indicators.filter(indicator => indicator.type === 2).map(indicator => {
          return {
            type: indicator.type,
            line: indicator.line,
            component: indicator.component,
            program: indicator.program,
            indicator: indicator.indicator,
            developmentPlan: indicator.developmentPlan,
            productMGA: indicator.productMGA,
            measurement: indicator.measurement,
            year0: indicator.year0,
            year1: indicator.year1,
            year2: indicator.year2,
            year3: indicator.year3,
            year4: indicator.year4
          }
        }) : null,
        logicFrame: logicFrame
      },
      EResponseCodes.OK
    );
  }

  async updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>> {

    console.log('project?.createHistory: ', project?.createHistory );
    console.log('project?.oldStatus: ', project?.oldStatus );
    if( project.status === 2 
      || project.status === 3 
      && project?.createHistory 
      && project?.oldStatus !=  project?.status 
    ){
      console.log('entro');
      return await this.createProject( project, trx );
    }

    const res = await this.projectRepository.updateProject(project, id, trx);
    let causes: ICause[] | null = null;
    let effects: IEffect[] | null = null;
    let actors: IParticipatingActors[] | null = null;
    let classifications: IDemographicCharacteristics[] | null = null;
    let specificObjectives: INeedObjetive[] | null = null;
    let environmentalEffects: IEffectEnviromentForm[] | null = null;
    let activities: IActivityMGA[] | null = null;
    let risks: IAddRisks[] | null = null;
    let profitsIncome: IprofitsIncome[] | null = null;
    let sourceFunding: ISourceFunding[] | null = null;
    let indicators: IIndicator[] | null = null;
    let logicFrame: IAddLogicFrame[] | null = null;

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
    if (project.preparation?.activities?.activities) {
      activities = await this.activitiesRepository.updateActivities(project.preparation.activities.activities, causes, id, trx);
    }
    if (project.preparation?.risks?.risks) {
      risks = await this.risksRepository.updateRisks(project.preparation.risks.risks, id, trx);
    }
    if (project.programation?.profitsIncome?.profitsIncome) {
      profitsIncome = await this.profitsRepository.updateProfits(project.programation.profitsIncome.profitsIncome, id, trx);
    }
    if (project.programation?.sourceFunding?.sourceFunding) {
      sourceFunding = await this.sourceFundingRepository.updateSourceFunding(project.programation.sourceFunding.sourceFunding, id, trx);
    }
    if (project.programation?.indicators?.indicators) {
      indicators = await this.indicatorsRepository.updateIndicators(project.programation.indicators.indicators, id, trx);
    }
    if(project.programation?.logicFrame?.logicFrame){
      logicFrame = await this.logicRepository.updateLogicFrame(project.programation.logicFrame.logicFrame, id, trx , indicators );
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
        environmentalEffects: environmentalEffects,
        risks: risks,
        profitsIncome: profitsIncome,
        sourceFunding: sourceFunding,
        activities: activities ? activities.map((item): IActivitiesProject => {
          return {
            ...item, budgetsMGA: [
              {
                budget: item.budgetsMGA.year0.budget,
                year: 0,
                validity: item.budgetsMGA.year0.validity
              },
              {
                budget: item.budgetsMGA.year1.budget,
                year: 1,
                validity: item.budgetsMGA.year1.validity
              },
              {
                budget: item.budgetsMGA.year2.budget,
                year: 2,
                validity: item.budgetsMGA.year2.validity
              },
              {
                budget: item.budgetsMGA.year3.budget,
                year: 3,
                validity: item.budgetsMGA.year3.validity
              },
              {
                budget: item.budgetsMGA.year4.budget,
                year: 4,
                validity: item.budgetsMGA.year4.validity
              }
            ]
          }
        }) : null,
        indicatorsAction: indicators ? indicators.filter(indicator => indicator.type === 3).map(indicator => {
          return {
            type: indicator.type,
            objective: indicator.objective,
            dpnIndicator: indicator.dpnIndicator,
            dpn: indicator.dpn,
            staticValueCode: indicator.staticValueCode,
            staticValue: indicator.staticValue,
            total: indicator.total,
            accumulative: indicator.accumulative,
            productMGA: indicator.productMGA,
            measurement: indicator.measurement,
            year0: indicator.year0,
            year1: indicator.year1,
            year2: indicator.year2,
            year3: indicator.year3,
            year4: indicator.year4
          }
        }) : null,
        indicatorsIndicative: indicators ? indicators.filter(indicator => indicator.type === 2).map(indicator => {
          return {
            type: indicator.type,
            line: indicator.line,
            component: indicator.component,
            program: indicator.program,
            indicator: indicator.indicator,
            developmentPlan: indicator.developmentPlan,
            productMGA: indicator.productMGA,
            measurement: indicator.measurement,
            year0: indicator.year0,
            year1: indicator.year1,
            year2: indicator.year2,
            year3: indicator.year3,
            year4: indicator.year4
          }
        }) : null,
        logicFrame: logicFrame
      },
      EResponseCodes.OK
    );
  }

  async getAllProjects(): Promise<ApiResponse<IProject[]>> {
    const res = await this.projectRepository.getAllProjects();

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllHistorical( bpin: number ): Promise<ApiResponse<IProject[]>> {
    const res = await this.projectRepository.getAllHistorical( bpin );
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllHistoricalPaginated( filters: IHistoricalFiltersPaginated ): Promise<ApiResponse<IPagingData<IProject>>> {
    const res = await this.projectRepository.getAllHistoricalPaginated( filters );
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getProjectPaginated(
    filters: IProjectFiltersPaginated
  ): Promise<ApiResponse<IPagingData<IProject>>> {
    const res = await this.projectRepository.getProjectPaginated(filters);

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllStatus(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.projectRepository.getAllStatus();

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getProjectById(id: number): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.getProjectById(id);
    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async finishProject(data: IFinishProjectForm, id: number, trx: TransactionClientContract): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.finishProject(data, id, trx);
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

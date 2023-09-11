import { IProject, IProjectTemp } from "App/Interfaces/ProjectInterfaces";
import Projects from "../Models/Projects";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IProjectRepository {
  getProjectByUser(user: string): Promise<IProject | null>;
  createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<IProject>;
  updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<IProject | null>;
}

export default class ProjectRepository implements IProjectRepository {

  async getProjectByUser(user: string): Promise<IProject | null> {
    const res = await Projects.findBy("user", user);
    await res?.load('causes', (query) => {
      query.preload("childrens");
    });
    await res?.load('effects', (query) => {
      query.preload("childrens");
    });
    await res?.load('actors');
    await res?.load('classifications');
    await res?.load('specificObjectives', (query) => {
      query.preload("estatesService");
    });
    await res?.load('environmentalEffects');
    if (res?.goal) {
      res.goal = Number(res.goal);
    }
    if(res?.specificObjectives){
      res.specificObjectives.forEach((obj, index) => {
        const objetive = res.causes.find(cause => cause.id === obj.objetive)
        if(objetive){
          res.specificObjectives[index].objetive = objetive;
        }
      });
    }
    return res ? (res.serialize() as IProject) : null;
  }

  async createProject(project: IProjectTemp, trx: TransactionClientContract): Promise<IProject> {
    const toCreate = new Projects();
    toCreate.user = project.user;
    toCreate.status = project.status;
    if (project.register?.bpin) {
      toCreate.bpin = project.register.bpin;
    }
    if (project.register?.project) {
      toCreate.project = project.register.project;
    }
    if (project.register?.dateFrom) {
      toCreate.dateFrom = Number(project.register.dateFrom);
    }
    if (project.register?.dateTo) {
      toCreate.dateTo = Number(project.register.dateTo);
    }
    if (project.register?.process !== undefined) {
      toCreate.process = project.register.process;
    }
    if (project.register?.dependency !== undefined) {
      toCreate.dependency = project.register.dependency;
    }
    if (project.register?.localitation !== undefined) {
      toCreate.localitation = project.register.localitation;
    }
    if (project.register?.object) {
      toCreate.object = project.register.object;
    }
    if (project.identification?.problemDescription?.problemDescription) {
      toCreate.problemDescription = project.identification.problemDescription.problemDescription;
    }
    if (project.identification?.problemDescription?.magnitude) {
      toCreate.magnitude = project.identification.problemDescription.magnitude;
    }
    if (project.identification?.problemDescription?.centerProblem) {
      toCreate.centerProblem = project.identification.problemDescription.centerProblem;
    }
    if (project.identification?.planDevelopment?.pnd_pacto) {
      toCreate.pnd_pacto = project.identification.planDevelopment.pnd_pacto;
    }
    if (project.identification?.planDevelopment?.pnd_linea) {
      toCreate.pnd_linea = project.identification.planDevelopment.pnd_linea;
    }
    if (project.identification?.planDevelopment?.pnd_programa) {
      toCreate.pnd_programa = project.identification.planDevelopment.pnd_programa;
    }
    if (project.identification?.planDevelopment?.pdd_linea) {
      toCreate.pdd_linea = project.identification.planDevelopment.pdd_linea;
    }
    if (project.identification?.planDevelopment?.pdd_componentes) {
      toCreate.pdd_componentes = project.identification.planDevelopment.pdd_componentes;
    }
    if (project.identification?.planDevelopment?.pdd_programa) {
      toCreate.pdd_programa = project.identification.planDevelopment.pdd_programa;
    }
    if (project.identification?.planDevelopment?.pdi_linea) {
      toCreate.pdi_linea = project.identification.planDevelopment.pdi_linea;
    }
    if (project.identification?.planDevelopment?.pdi_componentes) {
      toCreate.pdi_componentes = project.identification.planDevelopment.pdi_componentes;
    }
    if (project.identification?.planDevelopment?.pdi_programa) {
      toCreate.pdi_programa = project.identification.planDevelopment.pdi_programa;
    }
    if (project.identification?.objectives?.indicators) {
      toCreate.indicators = project.identification.objectives.indicators;
    }
    if (project.identification?.objectives?.measurement !== undefined) {
      toCreate.measurement = project.identification.objectives.measurement;
    }
    if (project.identification?.objectives?.goal !== undefined) {
      toCreate.goal = project.identification.objectives.goal;
    }
    if (project.identification?.poblation?.objectivePeople !== undefined) {
      toCreate.objectivePeople = project.identification.poblation.objectivePeople;
    }
    if (project.identification?.poblation?.informationSource) {
      toCreate.informationSource = project.identification.poblation.informationSource;
    }
    if (project.identification?.poblation?.region !== undefined) {
      toCreate.region = project.identification.poblation.region;
    }
    if (project.identification?.poblation?.departament !== undefined) {
      toCreate.departament = project.identification.poblation.departament;
    }
    if (project.identification?.poblation?.district !== undefined) {
      toCreate.district = project.identification.poblation.district;
    }
    if (project.identification?.poblation?.shelter) {
      toCreate.shelter = project.identification.poblation.shelter;
    }
    if (project.preparation?.technicalAnalysis?.alternative) {
      toCreate.alternative = project.preparation.technicalAnalysis.alternative;
    }
    if (project.preparation?.technicalAnalysis?.resumeAlternative) {
      toCreate.resumeAlternative = project.preparation.technicalAnalysis.resumeAlternative;
    }
    if (project.preparation?.capacity?.descriptionCapacity) {
      toCreate.descriptionCapacity = project.preparation.capacity.descriptionCapacity;
    }
    if (project.preparation?.capacity?.unitCapacity !== undefined) {
      toCreate.unitCapacity = project.preparation.capacity.unitCapacity;
    }
    if (project.preparation?.capacity?.capacityGenerated !== undefined) {
      toCreate.capacityGenerated = project.preparation.capacity.capacityGenerated;
    }
    if (project.preparation?.enviromentalAnalysis?.environmentDiagnosis) {
      toCreate.environmentDiagnosis = project.preparation.enviromentalAnalysis.environmentDiagnosis;
    }
    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IProject;
  }

  async updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<IProject | null> {
    const toUpdate = await Projects.find(id);
    if (!toUpdate) {
      return null;
    }
    toUpdate.user = project.user;
    toUpdate.status = project.status;
    if (project.register?.bpin !== undefined) {
      toUpdate.bpin = project.register.bpin;
    }
    if (project.register?.project) {
      toUpdate.project = project.register.project;
    }
    if (project.register?.dateFrom) {
      toUpdate.dateFrom = Number(project.register.dateFrom);
    }
    if (project.register?.dateTo) {
      toUpdate.dateTo = Number(project.register.dateTo);
    }
    if (project.register?.process !== undefined) {
      toUpdate.process = project.register.process;
    }
    if (project.register?.dependency !== undefined) {
      toUpdate.dependency = project.register.dependency;
    }
    if (project.register?.localitation !== undefined) {
      toUpdate.localitation = project.register.localitation;
    }
    if (project.register?.object) {
      toUpdate.object = project.register.object;
    }
    if (project.identification?.problemDescription?.problemDescription) {
      toUpdate.problemDescription = project.identification.problemDescription.problemDescription;
    }
    if (project.identification?.problemDescription?.magnitude) {
      toUpdate.magnitude = project.identification.problemDescription.magnitude;
    }
    if (project.identification?.problemDescription?.centerProblem) {
      toUpdate.centerProblem = project.identification.problemDescription.centerProblem;
    }
    if (project.identification?.planDevelopment?.pnd_pacto) {
      toUpdate.pnd_pacto = project.identification.planDevelopment.pnd_pacto;
    }
    if (project.identification?.planDevelopment?.pnd_linea) {
      toUpdate.pnd_linea = project.identification.planDevelopment.pnd_linea;
    }
    if (project.identification?.planDevelopment?.pnd_programa) {
      toUpdate.pnd_programa = project.identification.planDevelopment.pnd_programa;
    }
    if (project.identification?.planDevelopment?.pdd_linea) {
      toUpdate.pdd_linea = project.identification.planDevelopment.pdd_linea;
    }
    if (project.identification?.planDevelopment?.pdd_componentes) {
      toUpdate.pdd_componentes = project.identification.planDevelopment.pdd_componentes;
    }
    if (project.identification?.planDevelopment?.pdd_programa) {
      toUpdate.pdd_programa = project.identification.planDevelopment.pdd_programa;
    }
    if (project.identification?.planDevelopment?.pdi_linea) {
      toUpdate.pdi_linea = project.identification.planDevelopment.pdi_linea;
    }
    if (project.identification?.planDevelopment?.pdi_componentes) {
      toUpdate.pdi_componentes = project.identification.planDevelopment.pdi_componentes;
    }
    if (project.identification?.planDevelopment?.pdi_programa) {
      toUpdate.pdi_programa = project.identification.planDevelopment.pdi_programa;
    }
    if (project.identification?.objectives?.indicators) {
      toUpdate.indicators = project.identification.objectives.indicators;
    }
    if (project.identification?.objectives?.measurement !== undefined) {
      toUpdate.measurement = project.identification.objectives.measurement;
    }
    if (project.identification?.objectives?.goal !== undefined) {
      toUpdate.goal = project.identification.objectives.goal;
    }
    if (project.identification?.poblation?.objectivePeople !== undefined) {
      toUpdate.objectivePeople = project.identification.poblation.objectivePeople;
    }
    if (project.identification?.poblation?.informationSource) {
      toUpdate.informationSource = project.identification.poblation.informationSource;
    }
    if (project.identification?.poblation?.region !== undefined) {
      toUpdate.region = project.identification.poblation.region;
    }
    if (project.identification?.poblation?.departament !== undefined) {
      toUpdate.departament = project.identification.poblation.departament;
    }
    if (project.identification?.poblation?.district !== undefined) {
      toUpdate.district = project.identification.poblation.district;
    }
    if (project.identification?.poblation?.shelter) {
      toUpdate.shelter = project.identification.poblation.shelter;
    }
    if (project.preparation?.technicalAnalysis?.alternative) {
      toUpdate.alternative = project.preparation.technicalAnalysis.alternative;
    }
    if (project.preparation?.technicalAnalysis?.resumeAlternative) {
      toUpdate.resumeAlternative = project.preparation.technicalAnalysis.resumeAlternative;
    }
    if (project.preparation?.capacity?.descriptionCapacity) {
      toUpdate.descriptionCapacity = project.preparation.capacity.descriptionCapacity;
    }
    if (project.preparation?.capacity?.unitCapacity !== undefined) {
      toUpdate.unitCapacity = project.preparation.capacity.unitCapacity;
    }
    if (project.preparation?.capacity?.capacityGenerated !== undefined) {
      toUpdate.capacityGenerated = project.preparation.capacity.capacityGenerated;
    }
    if (project.preparation?.enviromentalAnalysis?.environmentDiagnosis) {
      toUpdate.environmentDiagnosis = project.preparation.enviromentalAnalysis.environmentDiagnosis;
    }
    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IProject;
  }
}

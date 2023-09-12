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
    const propertiesToCheck = [
      'bpin',
      'project',
      'dateFrom',
      'dateTo',
      'process',
      'dependency',
      'localitation',
      'object',
      'problemDescription',
      'magnitude',
      'centerProblem',
      'pnd_pacto',
      'pnd_linea',
      'pnd_programa',
      'pdd_linea',
      'pdd_componentes',
      'pdd_programa',
      'pdi_linea',
      'pdi_componentes',
      'pdi_programa',
      'indicators',
      'measurement',
      'goal',
      'objectivePeople',
      'informationSource',
      'region',
      'departament',
      'district',
      'shelter',
      'alternative',
      'resumeAlternative',
      'descriptionCapacity',
      'unitCapacity',
      'capacityGenerated',
      'environmentDiagnosis',
    ];
    for (const property of propertiesToCheck) {
      if (project.register?.[property]) {
        toCreate[property] = project.register[property];
      }
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
    const propertiesToCheck = [
      'bpin',
      'project',
      'dateFrom',
      'dateTo',
      'process',
      'dependency',
      'localitation',
      'object',
      'problemDescription',
      'magnitude',
      'centerProblem',
      'pnd_pacto',
      'pnd_linea',
      'pnd_programa',
      'pdd_linea',
      'pdd_componentes',
      'pdd_programa',
      'pdi_linea',
      'pdi_componentes',
      'pdi_programa',
      'indicators',
      'measurement',
      'goal',
      'objectivePeople',
      'informationSource',
      'region',
      'departament',
      'district',
      'shelter',
      'alternative',
      'resumeAlternative',
      'descriptionCapacity',
      'unitCapacity',
      'capacityGenerated',
      'environmentDiagnosis',
    ];
    for (const property of propertiesToCheck) {
      if (project.register?.[property] !== undefined) {
        toUpdate[property] = project.register[property];
      }
    }
    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IProject;
  }
}

import { ICause, IEffect, IProject, IProjectTemp } from "App/Interfaces/ProjectInterfaces";
import Projects from "../Models/Projects";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IProjectRepository {
  getProjectById(id: number): Promise<IProject | null>;
  createProject(project: IProjectTemp, trx: TransactionClientContract, causes: ICause[] | null, effecs: IEffect[] | null): Promise<IProject>;
  updateProject(project: IProjectTemp, id: number, trx: TransactionClientContract): Promise<IProject | null>;
}

export default class ProjectRepository implements IProjectRepository {

  async getProjectById(id: number): Promise<IProject | null> {
    const res = await Projects.find(id);
    await res?.load('causes', (query) => {
      query.preload("childrens");
    });
    await res?.load('effects', (query) => {
      query.preload("childrens");
    });
    if(res?.goal) {
      res.goal = Number(res.goal);
    }
    return res ? (res.serialize() as IProject) : null;
  }

  async createProject(project: IProjectTemp, trx: TransactionClientContract, causes: ICause[] | null, effects: IEffect[] | null): Promise<IProject> {
    const toCreate = new Projects();
    if (project.register?.bpin !== undefined) {
      toCreate.bpin = project.register.bpin;
    }
    if (project.register?.project) {
      toCreate.project = project.register.project;
    }
    if (project.register?.dateFrom) {
      toCreate.dateFrom = project.register.dateFrom;
    }
    if (project.register?.dateTo) {
      toCreate.dateTo = project.register.dateTo.toString();
    }
    if (project.register?.process !== undefined) {
      toCreate.process = project.register.process;
    }
    if (project.register?.dependency !== undefined) {
      toCreate.dependency = project.register.dependency;
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
    if (causes) {
      if (causes[0].id) {
        toCreate.causeId = causes[0].id;
      }
    }
    if (effects) {
      if (effects[0].id) {
        toCreate.effectId = effects[0].id;
      }
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
      //CAMBIO: CAMBIAR A NUMBER PORQUE ES UNA LISTA DESPLEGABLE
      toCreate.measurement = project.identification.objectives.measurement.toString();
    }
    if (project.identification?.objectives?.goal !== undefined) {
      toCreate.goal = project.identification.objectives.goal;
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
    if (project.register?.bpin !== undefined) {
      toUpdate.bpin = project.register.bpin;
    }
    if (project.register?.project) {
      toUpdate.project = project.register.project;
    }
    if (project.register?.dateFrom) {
      toUpdate.dateFrom = project.register.dateFrom;
    }
    if (project.register?.dateTo) {
      toUpdate.dateTo = project.register.dateTo.toString();
    }
    if (project.register?.process !== undefined) {
      toUpdate.process = project.register.process;
    }
    if (project.register?.dependency !== undefined) {
      toUpdate.dependency = project.register.dependency;
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
      //CAMBIO: CAMBIAR A NUMBER PORQUE ES UNA LISTA DESPLEGABLE
      toUpdate.measurement = project.identification.objectives.measurement.toString();
    }
    if (project.identification?.objectives?.goal !== undefined) {
      toUpdate.goal = project.identification.objectives.goal;
    }
    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IProject;
  }
}

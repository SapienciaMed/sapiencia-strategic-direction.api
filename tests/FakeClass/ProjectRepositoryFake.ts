import Projects from "App/Models/Projects";
import { IPagingData } from "App/Utils/ApiResponses";
import {
  IProject,
  IProjectFilters,
  IProjectPaginated,
  IProjectTemp,
  IFinishProjectForm,
  IHistoricalFiltersPaginated
} from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Interfaces/repositories/IProjectRepository";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
const projects = new Projects();
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";

export default class ProjectRepositoryFake implements IProjectRepository {
  getProjectByUser( _user: string): Promise<IProject | null> {
    return Promise.resolve({} as IProject);
  }
  createProject( _project: IProjectTemp, _trx: TransactionClientContract): Promise<IProject> {
    return Promise.resolve( projects.serialize({}) as IProject);
  }
  updateProject( 
    _project: IProjectTemp,
    _id: number,
    _trx: TransactionClientContract): Promise<IProject | null> {
    return Promise.resolve( projects.serialize({}) as IProject);
  }
  getProjectsByFilters( _filters: IProjectFilters ): Promise<IProject[]> {
    return Promise.resolve([ projects.serialize() ] as IProject[]);
  }
  getAllHistorical(): Promise<IProject[]> {
    return Promise.resolve([] as IProject[]);
  }
  getAllHistoricalPaginated( _filters: IHistoricalFiltersPaginated ): Promise<IPagingData<IProject>> {
    return Promise.resolve( projects.serialize() as Promise<IPagingData<IProject>> );
  }
  getProjectsPaginated( _filters: IProjectPaginated ): Promise<IPagingData<IProject>> {
    return Promise.resolve( projects.serialize() as Promise<IPagingData<IProject>> );
  }
  getAllProjects(): Promise<IProject[]> {
    return Promise.resolve({} as IProject[]);
  }
  getProjectPaginated( _filters: IProjectPaginated ): Promise<IPagingData<IProject>> {
    return Promise.resolve( projects.serialize() as Promise<IPagingData<IProject>> );
  }
  getAllStatus(): Promise<MasterTable[]> {
    return Promise.resolve({} as MasterTable[]);
  }
  getProjectById( _id: number ): Promise<IProject | null> {
    return Promise.resolve( projects.serialize()  as Promise<IProject>);
  }
  finishProject(
    _data: IFinishProjectForm,
    _id: number,
    _trx: TransactionClientContract
  ): Promise<IProject | null> {
    return Promise.resolve( projects.serialize() as Promise<IProject>);
  }
  

}


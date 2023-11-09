import {
    IProject,
    IProjectFilters,
    IProjectPaginated,
    IProjectTemp,
    IProjectFiltersPaginated,
    IFinishProjectForm,
    IHistoricalFiltersPaginated,
    IProjectFiltersHistorical
  } from "App/Interfaces/ProjectInterfaces";
  import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
  import { IPagingData } from "App/Utils/ApiResponses";
  import { MasterTable } from "App/Interfaces/MasterTableInterfaces";

export interface IProjectRepository {
    getProjectByUser(user: string): Promise<IProject | null>;
    createProject(
      project: IProjectTemp,
      trx: TransactionClientContract
    ): Promise<IProject>;
    updateProject(
      project: IProjectTemp,
      id: number,
      trx: TransactionClientContract
    ): Promise<IProject | null>;
    getProjectsByFilters(filters: IProjectFilters): Promise<IProject[]>;
    getAllHistorical(data: IProjectFiltersHistorical): Promise<IProject[]>;
    getAllHistoricalPaginated(
      filters: IHistoricalFiltersPaginated
    ): Promise<IPagingData<IProject>>;
    getProjectsPaginated(
      filters: IProjectPaginated
    ): Promise<IPagingData<IProject>>;
    getAllProjects(): Promise<IProject[]>;
    getProjectPaginated(filters: IProjectFiltersPaginated): Promise<IPagingData<IProject>>;
    getAllStatus(): Promise<MasterTable[]>;
    getProjectById(id: number): Promise<IProject | null>;
    finishProject(
      data: IFinishProjectForm,
      id: number,
      trx: TransactionClientContract
    ): Promise<IProject | null>;
}
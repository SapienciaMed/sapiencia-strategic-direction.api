import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IHistoricalProject } from "App/Interfaces/HistoricProjectsInterfaces";
import { IHistoricalProjectsRepository } from "App/Repositories/HistoricalProjectsRepository";

export default class HistoricalProjectsRepositoryFake implements IHistoricalProjectsRepository {
  getHistoricalById(_id): Promise<IHistoricalProject> {
    return Promise.resolve( {} as Promise<IHistoricalProject>);
  }
  getHistoricals(_filters): Promise<IHistoricalProject[]> {
    return Promise.resolve( {} as Promise<IHistoricalProject[]>);
  }
  createHistorical(_historic: IHistoricalProject, _trx: TransactionClientContract): Promise<IHistoricalProject> {
    return Promise.resolve( {} as Promise<IHistoricalProject>);
  }
}


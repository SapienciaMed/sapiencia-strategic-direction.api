import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IAddRisks } from "App/Interfaces/ProjectInterfaces";
import { IRisksRepository } from "App/Repositories/RisksRepository";

export default class RisksRepositoryFake implements IRisksRepository {
  createRisks(
    _risks: IAddRisks[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IAddRisks[]> {
    return Promise.resolve( {} as Promise<IAddRisks[]>);
  }
  updateRisks(
    _risks: IAddRisks[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IAddRisks[]> {
    return Promise.resolve( {} as Promise<IAddRisks[]>);
  }
}



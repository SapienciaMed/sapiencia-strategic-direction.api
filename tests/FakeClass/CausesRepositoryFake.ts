import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ICause } from "App/Interfaces/ProjectInterfaces";
import { ICausesRepository } from "App/Repositories/CausesRepository";

export default class CausesRepositoryFake implements ICausesRepository {
  createCauses( _causes: ICause[], _idProject: number, _trx: TransactionClientContract): Promise<ICause[]>{
    return Promise.resolve( {} as Promise<ICause[]>);
  }
  updateCauses( _causes: ICause[], _idProject: number, _trx: TransactionClientContract): Promise<ICause[]>{
    return Promise.resolve( {} as Promise<ICause[]>);
  }
}


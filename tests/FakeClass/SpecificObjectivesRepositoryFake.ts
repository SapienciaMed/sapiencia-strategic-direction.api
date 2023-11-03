import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ICause, INeedObjetive } from "App/Interfaces/ProjectInterfaces";
import { ISpecificObjectivesRepository } from "App/Repositories/SpecificObjectivesRepository";

export default class SpecificObjectivesRepositoryFake implements ISpecificObjectivesRepository {
  createSpecificObjectives(
  _specificObjectives: INeedObjetive[], 
  _causes: ICause[] | null, 
  _idProject: number, 
  _trx: TransactionClientContract): Promise<INeedObjetive[]>{
    return Promise.resolve( {} as Promise<INeedObjetive[]>);
  }
  updateSpecificObjectives(
  _specificObjectives: INeedObjetive[], 
  _causes: ICause[] | null, 
  _idProject: number, 
  _trx: TransactionClientContract): Promise<INeedObjetive[]>{
    return Promise.resolve( {} as Promise<INeedObjetive[]>);
  }

}


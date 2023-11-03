import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IDemographicCharacteristics } from "App/Interfaces/ProjectInterfaces";
import { IClassificationsRepository } from "App/Repositories/ClassificationsRepository";

export default class ClassificationsRepositoryFake implements IClassificationsRepository {

  createClassifications( 
    _classifications: IDemographicCharacteristics[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IDemographicCharacteristics[]>{
    return Promise.resolve( {} as Promise<IDemographicCharacteristics[]>);
  }
  updateClassifications( 
    _classifications: IDemographicCharacteristics[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IDemographicCharacteristics[]>{
    return Promise.resolve( {} as Promise<IDemographicCharacteristics[]>);
  }

}


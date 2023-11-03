import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ISourceFunding } from "App/Interfaces/ProjectInterfaces";
import { ISourceFundingRepository } from "App/Repositories/SourceFundingRepository";

export default class SourceFundingRepositoryFake implements ISourceFundingRepository {
  createSourceFunding(
    _sources: ISourceFunding[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<ISourceFunding[]>{
    return Promise.resolve( {} as Promise<ISourceFunding[]>);
  }
  updateSourceFunding(
    _sources: ISourceFunding[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<ISourceFunding[]>{
    return Promise.resolve( {} as Promise<ISourceFunding[]>);
  }

}



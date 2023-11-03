import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IprofitsIncome } from "App/Interfaces/ProjectInterfaces";
import { IProfitsIncomeRepository } from "App/Repositories/ProfitsIncomeRepository";

export default class ProfitsIncomeRepositoryFake implements IProfitsIncomeRepository {
  createProfits( 
    _profits: IprofitsIncome[],  
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IprofitsIncome[]> {
    return Promise.resolve( {} as Promise<IprofitsIncome[]>);
  }
  updateProfits( 
    _profits: IprofitsIncome[],  
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IprofitsIncome[]> {
    return Promise.resolve( {} as Promise<IprofitsIncome[]>);
  }
}



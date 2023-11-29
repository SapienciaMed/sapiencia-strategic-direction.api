
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import { IIndicator } from "App/Interfaces/ProjectInterfaces";
import IndicatorsAction from "App/Models/IndicatorsAction";
import { IIndicatorsRepository } from "App/Repositories/IndicatorsRepository";

export default class IndicatorsRepositoryFake implements IIndicatorsRepository {
  getIndicatorDNP(): Promise<MasterTable[] | null> {
    return Promise.resolve( {} as Promise<MasterTable[]>);
  }
  getIndicatorName(): Promise<MasterTable[] | null> {
    return Promise.resolve( {} as Promise<MasterTable[]>);
  }
  getStrategicLine(): Promise<MasterTable[] | null> {
    return Promise.resolve( {} as Promise<MasterTable[]>);
  }
  getIndicatorType(): Promise<MasterTable[] | null> {
    return Promise.resolve( {} as Promise<MasterTable[]>);
  }
  getProgramation(): Promise<MasterTable[] | null> {
    return Promise.resolve( {} as Promise<MasterTable[]>);
  }
  getIndicatorsComponent(): Promise<MasterTable[] | null> {
    return Promise.resolve( {} as Promise<MasterTable[]>);
  }
  getProjectIndicators(_idProject:number): Promise<IndicatorsAction[] | null> {
    return Promise.resolve( {} as Promise<IndicatorsAction[]>);
  }
  createIndicators(
    _indicators: IIndicator[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IIndicator[]> {
    return Promise.resolve( {} as Promise<IIndicator[]>);
  }
  updateIndicators(
    _indicators: IIndicator[], 
    _idProject: number, 
    _trx: TransactionClientContract
    ): Promise<IIndicator[]> {
    return Promise.resolve( {} as Promise<IIndicator[]>);
  }
}



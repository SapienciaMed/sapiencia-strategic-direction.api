import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IAddLogicFrame,IIndicator } from "App/Interfaces/ProjectInterfaces";
import { ILogicFrameRepository } from "App/Repositories/LogicFrameRepository";

export default class LogicFrameRepositoryFake implements ILogicFrameRepository {
  createLogicFrame(
    _logicFrame: IAddLogicFrame[], 
    _idProject: number, 
    _trx: TransactionClientContract, 
    _indicator: IIndicator[] | null 
    ) : Promise<IAddLogicFrame[]> {
    return Promise.resolve( {} as Promise<IAddLogicFrame[]>);
  }
  updateLogicFrame(
    _logicFrame: IAddLogicFrame[], 
    _idProject: number, 
    _trx: TransactionClientContract, 
    _indicator: IIndicator[] | null 
    ) : Promise<IAddLogicFrame[]> {
    return Promise.resolve( {} as Promise<IAddLogicFrame[]>);
  }

}



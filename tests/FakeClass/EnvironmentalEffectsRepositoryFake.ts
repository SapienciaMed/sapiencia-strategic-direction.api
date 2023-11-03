import { IEnvironmentalEffectsRepository } from "App/Repositories/EnvironmentalEffectsRepository";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffectEnviromentForm } from "App/Interfaces/ProjectInterfaces";

export default class EnvironmentalEffectsRepositoryFake implements IEnvironmentalEffectsRepository {
  createEnvironmentalEffectsRepository(
    _effectEnviroments: IEffectEnviromentForm[], 
    _idProject: number, 
    _trx: TransactionClientContract
  ): Promise<IEffectEnviromentForm[]> {
    return Promise.resolve( {} as Promise<IEffectEnviromentForm[]>);
  }
  updateEnvironmentalEffectsRepository(
    _effectEnviroments: IEffectEnviromentForm[], 
    _idProject: number, 
    _trx: TransactionClientContract
  ): Promise<IEffectEnviromentForm[]> {
    return Promise.resolve( {} as Promise<IEffectEnviromentForm[]>);
  }

}



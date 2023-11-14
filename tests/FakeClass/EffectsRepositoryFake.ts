import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffect } from "App/Interfaces/ProjectInterfaces";
import { IEffectsRepository } from "App/Repositories/EffectsRepository";
export default class EffectsRepositoryFake implements IEffectsRepository {
  createEffects( _effects: IEffect[], _idProject: number, _trx: TransactionClientContract): Promise<IEffect[]>{
    return Promise.resolve( {} as Promise<IEffect[]>);
  }
  updateEffects( _effects: IEffect[], _idProject: number, _trx: TransactionClientContract): Promise<IEffect[]>{
    return Promise.resolve( {} as Promise<IEffect[]>);
  }

}


import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IParticipatingActors } from "App/Interfaces/ProjectInterfaces";
import { IActorsRepository } from "App/Repositories/ActorsRepository";
export default class ActorsRepositoryFake implements IActorsRepository {
  createActors( _actors: IParticipatingActors[], _idProject: number, _trx: TransactionClientContract):  Promise<IParticipatingActors[]> {
    return Promise.resolve( {} as Promise<IParticipatingActors[]>);
  }
  updateActors( _causes: IParticipatingActors[], _idProject: number, _trx: TransactionClientContract ): Promise<IParticipatingActors[]>{
    return Promise.resolve( {} as Promise<IParticipatingActors[]>);
  }

}



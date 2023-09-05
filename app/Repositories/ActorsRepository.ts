import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IParticipatingActors } from "App/Interfaces/ProjectInterfaces";
import Actors from "App/Models/Actors";

export interface IActorsRepository {
    createActors(actors: IParticipatingActors[], idProject: number, trx: TransactionClientContract): Promise<IParticipatingActors[]>;
    updateActors(causes: IParticipatingActors[], idProject: number, trx: TransactionClientContract): Promise<IParticipatingActors[]>;
}

export default class ActorsRepository implements IActorsRepository {
    async createActors(actors: IParticipatingActors[], idProject: number, trx: TransactionClientContract): Promise<IParticipatingActors[]> {
        const actorsCreate: IParticipatingActors[] = [];
        for (let actor in actors) {
            const toCreate = new Actors();
            toCreate.actor = actors[actor].actor;
            toCreate.expectation = actors[actor].expectation;
            toCreate.position = actors[actor].position;
            toCreate.contribution = actors[actor].contribution;
            toCreate.idProject = idProject;
            toCreate.useTransaction(trx);
            await toCreate.save();
            actorsCreate.push(toCreate.serialize() as IParticipatingActors)
        }
        return actorsCreate;
    }

    async updateActors(actors: IParticipatingActors[], idProject: number, trx: TransactionClientContract): Promise<IParticipatingActors[]> {
        await Actors.query().where("idProject", idProject).delete().useTransaction(trx);
        const actorsCreate: IParticipatingActors[] = [];
        for (let actor in actors) {
            const toCreate = new Actors();
            toCreate.actor = actors[actor].actor;
            toCreate.expectation = actors[actor].expectation;
            toCreate.position = actors[actor].position;
            toCreate.contribution = actors[actor].contribution;
            toCreate.idProject = idProject;
            toCreate.useTransaction(trx);
            await toCreate.save();
            actorsCreate.push(toCreate.serialize() as IParticipatingActors)
        }
        return actorsCreate;
    }
}

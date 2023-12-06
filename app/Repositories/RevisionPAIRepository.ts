import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IRevisionPAI } from "App/Interfaces/CreatePlanActionInterfaces";
import RevisionPAI from "App/Models/RevisionPAI";

export interface IRevisionPAIRepository {
    createRevisionPAI(revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI>;
    updateRevisionPAI(id: number, revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI | null>;
}

export default class RevisionPAIRepository implements IRevisionPAIRepository {
    async createRevisionPAI(revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI> {
        const toCreate = new RevisionPAI();
        toCreate.fill({ ...revision });
        toCreate.useTransaction(trx);
        await toCreate.save();
        return toCreate.serialize() as IRevisionPAI;
    }

    async updateRevisionPAI(id: number, revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI | null> {
        const toUpdate = await RevisionPAI.find(id);
        if (toUpdate) {
            if(revision.json) toUpdate.json = revision.json;
            toUpdate.completed = revision.completed;
            toUpdate.useTransaction(trx);
            await toUpdate.save();
            return toUpdate.serialize() as IRevisionPAI; 1
        } else {
            return null;
        }
    }
}
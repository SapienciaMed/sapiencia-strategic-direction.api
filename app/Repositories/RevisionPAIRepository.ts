import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IRevisionPAI } from "App/Interfaces/CreatePlanActionInterfaces";
import ActionPlan from "App/Models/ActionPlan";
import RevisionPAI from "App/Models/RevisionPAI";
import { DateTime } from "luxon";
export interface IRevisionPAIRepository {
    createRevisionPAI(revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI>;
    updateRevisionPAI(id: number, revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI | null>;
}

export default class RevisionPAIRepository implements IRevisionPAIRepository {
    async createRevisionPAI(revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI> {
        const pai = await ActionPlan.find(revision.idPai);
        if(!pai) throw new Error("No se pudo encontrar el PAI");
        const toCreate = new RevisionPAI();
        toCreate.fill({ ...revision });
        toCreate.useTransaction(trx);
        if(revision.completed) {
            if(revision.version === 1) {
                if(revision.json !== null && revision.json !== undefined && revision.json !== "" && revision.json !== "{}") {
                    pai.status = 3;
                } else {
                    pai.status = 5;
                    pai.dateCreate =  DateTime.now();
                }
            } else if (revision.version === 2) {
                pai.status = 4;
            }  else if (revision.version === 3) {
                pai.status = 5;
                pai.dateCreate =  DateTime.now();
            }
        }
        pai.useTransaction(trx)
        await toCreate.save();
        await pai.save();
        return toCreate.serialize() as IRevisionPAI;
    }

    async updateRevisionPAI(id: number, revision: IRevisionPAI, trx: TransactionClientContract): Promise<IRevisionPAI | null> {
        const pai = await ActionPlan.find(revision.idPai);
        if(!pai) throw new Error("No se pudo encontrar el PAI");
        const toUpdate = await RevisionPAI.find(id);
        if (toUpdate) {
            if(revision.json) toUpdate.json = revision.json;
            toUpdate.completed = revision.completed;
            toUpdate.useTransaction(trx);
            if(revision.completed) {
                if(revision.version === 1) {
                    if(revision.json !== null && revision.json !== undefined && revision.json !== "" && revision.json !== "{}") {
                        pai.status = 3;
                    } else {
                        pai.status = 5;
                        pai.dateCreate =  DateTime.now();
                    }
                } else if (revision.version === 2) {
                    pai.status = 4;
                }  else if (revision.version === 3) {
                    pai.status = 5;
                    pai.dateCreate =  DateTime.now();
                }
            }
            pai.useTransaction(trx)
            await toUpdate.save();
            await pai.save();
            return toUpdate.serialize() as IRevisionPAI;
        } else {
            return null;
        }
    }
}
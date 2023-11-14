import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IAddRisks } from "App/Interfaces/ProjectInterfaces";
import Risks from "App/Models/Risks";

export interface IRisksRepository {
    createRisks(risks: IAddRisks[], idProject: number, trx: TransactionClientContract): Promise<IAddRisks[]>;
    updateRisks(risks: IAddRisks[],  idProject: number, trx: TransactionClientContract): Promise<IAddRisks[]>;
}

export default class RisksRepository implements IRisksRepository {
    async createRisks(risks: IAddRisks[], idProject: number, trx: TransactionClientContract): Promise<IAddRisks[]> {
        const risksCreate: IAddRisks[] = [];
        for (let risk in risks) {
            const toCreate = new Risks();
            toCreate.idProject = idProject;

            toCreate.level = risks[risk].level;
            toCreate.risk = risks[risk].risk;
            toCreate.typeRisk = risks[risk].typeRisk;
            toCreate.descriptionRisk = risks[risk].descriptionRisk;
            toCreate.probability = risks[risk].probability;
            toCreate.impact = risks[risk].impact;
            toCreate.effects = risks[risk].effects;
            toCreate.mitigation = risks[risk].mitigation;
            toCreate.useTransaction(trx);
            await toCreate.save();
            risksCreate.push({ ...toCreate.serialize() as IAddRisks });
        }
        return risksCreate;
    }

    async updateRisks(risks: IAddRisks[], idProject: number, trx: TransactionClientContract): Promise<IAddRisks[]> {
        await Risks.query().where("idProject", idProject).delete().useTransaction(trx);
        const risksCreate: IAddRisks[] = [];
        for (let risk in risks) {
            const toCreate = new Risks();
            toCreate.idProject = idProject;

            toCreate.level = risks[risk].level;
            toCreate.risk = risks[risk].risk;
            toCreate.typeRisk = risks[risk].typeRisk;
            toCreate.descriptionRisk = risks[risk].descriptionRisk;
            toCreate.probability = risks[risk].probability;
            toCreate.impact = risks[risk].impact;
            toCreate.effects = risks[risk].effects;
            toCreate.mitigation = risks[risk].mitigation;
            toCreate.useTransaction(trx);
            await toCreate.save();
           
            risksCreate.push({ ...toCreate.serialize() as IAddRisks});
        }
        return risksCreate;
    }
}

import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ISourceFunding } from "App/Interfaces/ProjectInterfaces";
import SourceFunding from "App/Models/EntityFinancing";

export interface ISourceFundingRepository {
    createSourceFunding(sources: ISourceFunding[], idProject: number, trx: TransactionClientContract): Promise<ISourceFunding[]>;
    updateSourceFunding(sources: ISourceFunding[],  idProject: number, trx: TransactionClientContract): Promise<ISourceFunding[]>;
}

export default class SourceFundingRepository implements ISourceFundingRepository {
    async createSourceFunding(sources: ISourceFunding[], idProject: number, trx: TransactionClientContract): Promise<ISourceFunding[]> {
        const sourceFundingCreate: ISourceFunding[] = [];
        for (let source in sources) {
            const toCreate = new SourceFunding();
            toCreate.idProject = idProject;
            toCreate.stage = sources[source].stage;
            toCreate.entity = sources[source].entity;
            toCreate.resource = sources[source].resource;
            toCreate.typeEntity = sources[source].typeEntity;
            toCreate.year0 = sources[source].year0;
            toCreate.year1 = sources[source].year1;
            toCreate.year2 = sources[source].year2;
            toCreate.year3 = sources[source].year3;
            toCreate.year4 = sources[source].year4;
            toCreate.useTransaction(trx);
            await toCreate.save();
            sourceFundingCreate.push({ ...toCreate.serialize() as ISourceFunding });
        }
        return sourceFundingCreate;
    }

    async updateSourceFunding(sources: ISourceFunding[], idProject: number, trx: TransactionClientContract): Promise<ISourceFunding[]> {
        await SourceFunding.query().where("idProject", idProject).delete().useTransaction(trx);
        const risksCreate: ISourceFunding[] = [];
        for (let source in sources) {
            const toCreate = new SourceFunding();
            toCreate.idProject = idProject;
            toCreate.stage = sources[source].stage;
            toCreate.entity = sources[source].entity;
            toCreate.resource = sources[source].resource;
            toCreate.typeEntity = sources[source].typeEntity;
            toCreate.year0 = sources[source].year0;
            toCreate.year1 = sources[source].year1;
            toCreate.year2 = sources[source].year2;
            toCreate.year3 = sources[source].year3;
            toCreate.year4 = sources[source].year4;
            toCreate.useTransaction(trx);
            await toCreate.save();
           
            risksCreate.push({ ...toCreate.serialize() as ISourceFunding});
        }
        return risksCreate;
    }
}

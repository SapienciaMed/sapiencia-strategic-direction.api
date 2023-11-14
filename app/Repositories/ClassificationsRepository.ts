import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IDemographicCharacteristics } from "App/Interfaces/ProjectInterfaces";
import Classifications from "App/Models/Classifications";

export interface IClassificationsRepository {
    createClassifications(classifications: IDemographicCharacteristics[], idProject: number, trx: TransactionClientContract): Promise<IDemographicCharacteristics[]>;
    updateClassifications(classifications: IDemographicCharacteristics[], idProject: number, trx: TransactionClientContract): Promise<IDemographicCharacteristics[]>;
}

export default class ClassificationsRepository implements IClassificationsRepository {
    async createClassifications(classifications: IDemographicCharacteristics[], idProject: number, trx: TransactionClientContract): Promise<IDemographicCharacteristics[]> {
        const classificationsCreate: IDemographicCharacteristics[] = [];
        for (let classification in classifications) {
            const toCreate = new Classifications();
            toCreate.idProject = idProject;
            toCreate.clasification = classifications[classification].clasification;
            toCreate.detail = classifications[classification].detail;
            const numPerson = classifications[classification].numPerson;
            const infoSource = classifications[classification].infoSource;
            if (numPerson !== undefined) {
                toCreate.numPerson = numPerson;
            }
            if (infoSource) {
                toCreate.infoSource = infoSource;
            }
            toCreate.useTransaction(trx);
            await toCreate.save();
            classificationsCreate.push(toCreate.serialize() as IDemographicCharacteristics)
        }
        return classificationsCreate;
    }

    async updateClassifications(classifications: IDemographicCharacteristics[], idProject: number, trx: TransactionClientContract): Promise<IDemographicCharacteristics[]> {
        await Classifications.query().where("idProject", idProject).delete().useTransaction(trx);
        const classificationsCreate: IDemographicCharacteristics[] = [];
        for (let classification in classifications) {
            const toCreate = new Classifications();
            toCreate.idProject = idProject;
            toCreate.clasification = classifications[classification].clasification;
            toCreate.detail = classifications[classification].detail;
            const numPerson = classifications[classification].numPerson;
            const infoSource = classifications[classification].infoSource;
            if (numPerson !== undefined) {
                toCreate.numPerson = numPerson;
            }
            if (infoSource) {
                toCreate.infoSource = infoSource;
            }
            toCreate.useTransaction(trx);
            await toCreate.save();
            classificationsCreate.push(toCreate.serialize() as IDemographicCharacteristics)
        }
        return classificationsCreate;
    }
}

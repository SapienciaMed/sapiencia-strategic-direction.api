import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ICause, INeedObjetive } from "App/Interfaces/ProjectInterfaces";
import EstatesServices from "App/Models/EstatesServices";
import SpecificObjectives from "App/Models/SpecificObjectives";

export interface ISpecificObjectivesRepository {
    createSpecificObjectives(specificObjectives: INeedObjetive[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<INeedObjetive[]>;
    updateSpecificObjectives(specificObjectives: INeedObjetive[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<INeedObjetive[]>;
}

export default class SpecificObjectivesRepository implements ISpecificObjectivesRepository {
    async createSpecificObjectives(specificObjectives: INeedObjetive[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<INeedObjetive[]> {
        const classificationsCreate: INeedObjetive[] = [];
        for (let specificObjective in specificObjectives) {
            const toCreate = new SpecificObjectives();
            toCreate.idProject = idProject;
            const cause = causes ? causes.find(cause => specificObjectives[specificObjective].objetive.consecutive === cause.consecutive) : null;
            if (cause) {
                toCreate.objetive = Number(cause.id);
            } else {
                throw (new Error("Causa no encontrada"));
            }
            toCreate.interventionActions = specificObjectives[specificObjective].interventionActions;
            toCreate.quantification = specificObjectives[specificObjective].quantification;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const estatesService = specificObjectives[specificObjective].estatesService;
            if (estatesService?.length > 0) {
                for (let estateService in estatesService) {
                    await toCreate.related("estatesService").create({
                        idObjective: toCreate.id,
                        description: estatesService[estateService].description
                    });
                }
            }
            classificationsCreate.push({ ...toCreate.serialize() as INeedObjetive, estatesService: estatesService });
        }
        return classificationsCreate;
    }

    async updateSpecificObjectives(specificObjectives: INeedObjetive[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<INeedObjetive[]> {
        await EstatesServices.query().whereHas("specificObjective", (query) => {
            query.where("idProject", idProject)
        }).delete().useTransaction(trx);
        await SpecificObjectives.query().where("idProject", idProject).delete().useTransaction(trx);
        const classificationsCreate: INeedObjetive[] = [];
        for (let specificObjective in specificObjectives) {
            const toCreate = new SpecificObjectives();
            toCreate.idProject = idProject;
            const cause = causes ? causes.find(cause => specificObjectives[specificObjective].objetive.consecutive === cause.consecutive) : null;
            if (cause) {
                toCreate.objetive = Number(cause.id);
            } else {
                throw (new Error("Causa no encontrada"));
            }
            toCreate.interventionActions = specificObjectives[specificObjective].interventionActions;
            toCreate.quantification = specificObjectives[specificObjective].quantification;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const estatesService = specificObjectives[specificObjective].estatesService;
            if (estatesService?.length > 0) {
                for (let estateService in estatesService) {
                    await toCreate.related("estatesService").create({
                        idObjective: toCreate.id,
                        description: estatesService[estateService].description
                    });
                }
            }
            classificationsCreate.push({ ...toCreate.serialize() as INeedObjetive, estatesService: estatesService });
        }
        return classificationsCreate;
    }
}

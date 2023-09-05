import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ICause } from "App/Interfaces/ProjectInterfaces";
import Causes from "App/Models/Causes";
import CausesIndirect from "App/Models/CausesIndirect";

export interface ICausesRepository {
    createCauses(causes: ICause[], idProject: number, trx: TransactionClientContract): Promise<ICause[]>;
    updateCauses(causes: ICause[], idProject: number, trx: TransactionClientContract): Promise<ICause[]>;
}

export default class CausesRepository implements ICausesRepository {
    async createCauses(causes: ICause[], idProject: number, trx: TransactionClientContract): Promise<ICause[]> {
        const causesCreate: ICause[] = [];
        for (let cause in causes) {
            const toCreate = new Causes();
            toCreate.description = causes[cause].description;
            toCreate.consecutive = causes[cause].consecutive;
            toCreate.idProject = idProject;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const childrens = causes[cause].childrens;
            if(childrens) {
                for(let children in childrens) {
                    await toCreate.related("childrens").create({
                        description: childrens[children].description,
                        consecutive: childrens[children].consecutive,
                        causeId: toCreate.id
                    })
                }
            }
            causesCreate.push({...toCreate.serialize() as ICause, childrens: childrens})
        }
        return causesCreate;
    }

    async updateCauses(causes: ICause[], idProject: number, trx: TransactionClientContract): Promise<ICause[]> {
        await CausesIndirect.query().whereHas("cause", (query) => {
            query.where("idProject", idProject)
        }).delete().useTransaction(trx);
        await Causes.query().where("idProject", idProject).delete().useTransaction(trx);
        const causesCreate: ICause[] = [];
        for (let cause in causes) {
            const toCreate = new Causes();
            toCreate.description = causes[cause].description;
            toCreate.consecutive = causes[cause].consecutive;
            toCreate.idProject = idProject;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const childrens = causes[cause].childrens;
            if(childrens) {
                for(let children in childrens) {
                    await toCreate.related("childrens").create({
                        description: childrens[children].description,
                        consecutive: childrens[children].consecutive,
                        causeId: toCreate.id
                    })
                }
            }
            causesCreate.push({...toCreate.serialize() as ICause, childrens: childrens})
        }
        return causesCreate;
    }
}

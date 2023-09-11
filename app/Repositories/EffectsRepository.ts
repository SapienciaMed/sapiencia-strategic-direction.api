import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffect } from "App/Interfaces/ProjectInterfaces";
import Effects from "App/Models/Effects";
import EffectsIndirect from "App/Models/EffectsIndirect";

export interface IEffectsRepository {
    createEffects(effects: IEffect[], idProject: number, trx: TransactionClientContract): Promise<IEffect[]>;
    updateEffects(effects: IEffect[], idProject: number, trx: TransactionClientContract): Promise<IEffect[]>;
}

export default class EffectsRepository implements IEffectsRepository {
    async createEffects(effects: IEffect[], idProject: number, trx: TransactionClientContract): Promise<IEffect[]> {
        const effectsCreate: IEffect[] = [];
        for (let effect in effects) {
            const toCreate = new Effects();
            toCreate.consecutive = effects[effect].consecutive;
            toCreate.description = effects[effect].description;
            toCreate.idProject = idProject;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const childrens = effects[effect].childrens;
            if(childrens) {
                for(let children in childrens) {
                    await toCreate.related("childrens").create({
                        consecutive: childrens[children].consecutive,
                        description: childrens[children].description,
                        effectId: toCreate.id
                    })
                }
            }
            effectsCreate.push(toCreate.serialize() as IEffect)
        }
        return effectsCreate;
    }

    async updateEffects(effects: IEffect[], idProject: number, trx: TransactionClientContract): Promise<IEffect[]> {
        await EffectsIndirect.query().whereHas("effect", (query) => {
            query.where("idProject", idProject)
        }).delete().useTransaction(trx);
        await Effects.query().where("idProject", idProject).delete().useTransaction(trx);
        const effectsCreate: IEffect[] = [];
        for (let effect in effects) {
            const toCreate = new Effects();
            toCreate.consecutive = effects[effect].consecutive;
            toCreate.description = effects[effect].description;
            toCreate.idProject = idProject;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const childrens = effects[effect].childrens;
            if(childrens) {
                for(let children in childrens) {
                    await toCreate.related("childrens").create({
                        consecutive: childrens[children].consecutive,
                        description: childrens[children].description,
                        effectId: toCreate.id
                    })
                }
            }
            effectsCreate.push(toCreate.serialize() as IEffect);
        }
        return effectsCreate;
    }
}

import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffect } from "App/Interfaces/ProjectInterfaces";
import Effects from "App/Models/Effects";

export interface IEffectsRepository {
    createEffects(effects: IEffect[], trx: TransactionClientContract): Promise<IEffect[]>;
}

export default class EffectsRepository implements IEffectsRepository {
    async createEffects(effects: IEffect[], trx: TransactionClientContract): Promise<IEffect[]> {
        const effectsCreate: IEffect[] = [];
        for (let effect in effects) {
            const toCreate = new Effects();
            toCreate.type = "tipo";
            toCreate.description = effects[effect].description;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const childrens = effects[effect].childrens;
            if(childrens) {
                for(let children in childrens) {
                    await toCreate.related("childrens").create({
                        type: "tipo",
                        description: childrens[children].description,
                        effectId: toCreate.id
                    })
                }
            }
            effectsCreate.push(toCreate.serialize() as IEffect)
        }
        return effectsCreate;
    }
}

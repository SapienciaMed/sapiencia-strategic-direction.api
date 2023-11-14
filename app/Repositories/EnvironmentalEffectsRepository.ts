import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IEffectEnviromentForm } from "App/Interfaces/ProjectInterfaces";
import EnvironmentalEffects from "App/Models/EnvironmentalEffects";

export interface IEnvironmentalEffectsRepository {
    createEnvironmentalEffectsRepository(effectEnviroments: IEffectEnviromentForm[], idProject: number, trx: TransactionClientContract): Promise<IEffectEnviromentForm[]>;
    updateEnvironmentalEffectsRepository(effectEnviroments: IEffectEnviromentForm[], idProject: number, trx: TransactionClientContract): Promise<IEffectEnviromentForm[]>;
}

export default class EnvironmentalEffectsRepository implements IEnvironmentalEffectsRepository {
    async createEnvironmentalEffectsRepository(effectEnviroments: IEffectEnviromentForm[], idProject: number, trx: TransactionClientContract): Promise<IEffectEnviromentForm[]> {
        const effectEnviromentsCreate: IEffectEnviromentForm[] = [];
        for (let effectEnviroment in effectEnviroments) {
            const toCreate = new EnvironmentalEffects();
            toCreate.idProject = idProject;
            const type = effectEnviroments[effectEnviroment].type;
            const impact = effectEnviroments[effectEnviroment].impact;
            const classification = effectEnviroments[effectEnviroment].classification;
            const level = effectEnviroments[effectEnviroment].level;
            const measures = effectEnviroments[effectEnviroment].measures;
            if (type) {
                toCreate.type = type;
            }
            if (impact) {
                toCreate.impact = impact;
            }
            if (classification) {
                toCreate.classification = classification;
            }
            if (level) {
                toCreate.level = level;
            }
            if (measures) {
                toCreate.measures = measures;
            }
            toCreate.useTransaction(trx);
            await toCreate.save();
            effectEnviromentsCreate.push(toCreate.serialize() as IEffectEnviromentForm);
        }
        return effectEnviromentsCreate;
    }

    async updateEnvironmentalEffectsRepository(effectEnviroments: IEffectEnviromentForm[], idProject: number, trx: TransactionClientContract): Promise<IEffectEnviromentForm[]> {
        await EnvironmentalEffects.query().where("idProject", idProject).delete().useTransaction(trx);
        const classificationsCreate: IEffectEnviromentForm[] = [];
        for (let effectEnviroment in effectEnviroments) {
            const toCreate = new EnvironmentalEffects();
            toCreate.idProject = idProject;
            const type = effectEnviroments[effectEnviroment].type;
            const impact = effectEnviroments[effectEnviroment].impact;
            const classification = effectEnviroments[effectEnviroment].classification;
            const level = effectEnviroments[effectEnviroment].level;
            const measures = effectEnviroments[effectEnviroment].measures;
            if (type) {
                toCreate.type = type;
            }
            if (impact) {
                toCreate.impact = impact;
            }
            if (classification) {
                toCreate.classification = classification;
            }
            if (level) {
                toCreate.level = level;
            }
            if (measures) {
                toCreate.measures = measures;
            }
            toCreate.useTransaction(trx);
            await toCreate.save();
            classificationsCreate.push(toCreate.serialize() as IEffectEnviromentForm);
        }
        return classificationsCreate;
    }
}

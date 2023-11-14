import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IAddLogicFrame,IIndicator } from "App/Interfaces/ProjectInterfaces";
import logicFrame from "App/Models/LogicFrame";

export interface ILogicFrameRepository {
    createLogicFrame(logicFrame: IAddLogicFrame[], idProject: number, trx: TransactionClientContract, indicator: IIndicator[] | null ) : Promise<IAddLogicFrame[]>;
    updateLogicFrame(logicFrame: IAddLogicFrame[],  idProject: number, trx: TransactionClientContract,  indicator: IIndicator[] | null ): Promise<IAddLogicFrame[]>;
}

export default class LogicFrameRepository implements ILogicFrameRepository {
    async createLogicFrame(logics: IAddLogicFrame[], idProject: number, trx: TransactionClientContract, indicator: IIndicator[] | null ): Promise<IAddLogicFrame[]> {
        const logicCreate: IAddLogicFrame[] = [];
        for (let logic in logics) {
            const toCreate = new logicFrame();
            toCreate.idProject = idProject;

            toCreate.resume = logics[logic].resume;
            toCreate.description = logics[logic].description;
            toCreate.indicator = logics[logic].indicator;
            toCreate.meta = logics[logic].meta;
            if( logics[logic]?.sourceVerification !== undefined){
                toCreate.sourceVerification = logics[logic]?.sourceVerification || ''; 
            }
            if( logics[logic]?.assumptions !== undefined){
                toCreate.assumptions = logics[logic]?.assumptions || ''; 
            }   
            const typeIndicator = indicator ? indicator.find(indicator => logics[logic].indicatorType.indicator === indicator.indicator) : null;
            if (typeIndicator?.id ) {
                toCreate.indicator = (typeIndicator.id);
            } else {
                throw (new Error("indicador no encontrado"));
            }

            toCreate.type = typeIndicator.type;
            
            toCreate.useTransaction(trx);
            await toCreate.save();
            logicCreate.push({ ...toCreate.serialize() as IAddLogicFrame });
        }
        return logicCreate;
    }

    async updateLogicFrame(logics: IAddLogicFrame[], idProject: number, trx: TransactionClientContract ,  indicator: IIndicator[] | null): Promise<IAddLogicFrame[]> {
        await logicFrame.query().where("idProject", idProject).delete().useTransaction(trx);
        const logicCreate: IAddLogicFrame[] = [];
        for (let logic in logics) {
            const toCreate = new logicFrame();
            toCreate.idProject = idProject;

            toCreate.resume = logics[logic].resume;
            toCreate.description = logics[logic].description;
            toCreate.indicator = logics[logic].indicator;
            toCreate.meta = logics[logic].meta;
            if( logics[logic]?.sourceVerification !== undefined){
                toCreate.sourceVerification = logics[logic]?.sourceVerification || ''; 
            }
            if( logics[logic]?.assumptions !== undefined){
                toCreate.assumptions = logics[logic]?.assumptions || ''; 
            }
            const typeIndicator = indicator ? indicator.find(indicator => logics[logic].indicatorType.indicator === indicator.indicator) : null;
            if (typeIndicator?.id ) {
                toCreate.indicator = (typeIndicator.id);
            } else {
                throw (new Error("indicador no encontrado"));
            }

            toCreate.type = typeIndicator.type;

            toCreate.useTransaction(trx);
            await toCreate.save();
           
            logicCreate.push({ ...toCreate.serialize() as IAddLogicFrame});
        }
        return logicCreate;
    }
}


import { IStage } from "App/Interfaces/StagesInterfaces";
import Stage from "App/Models/Stage";

export interface IStageRepository {
    getStages(): Promise<IStage[]>;
}

export default class StageRepository implements IStageRepository {
    async getStages(): Promise<IStage[]> {
        const res = await Stage.query().where("LET_ACTIVO", 1).orderBy('LET_ORDEN', 'asc');
        return res.map((i) => i.serialize() as IStage);
    }
}

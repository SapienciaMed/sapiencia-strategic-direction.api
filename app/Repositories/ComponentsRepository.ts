
import { IComponents } from "App/Interfaces/ComponentInterfaces";
import Components from "App/Models/Components";

export interface IComponentsRepository {
    getComponents(): Promise<IComponents[]>;
}

export default class ComponentsRepository implements IComponentsRepository {
    async getComponents(): Promise<IComponents[]> {
        const res = await Components.query().where("CMP_ACTIVO", 1).orderBy('CMP_ORDEN', 'asc');
        return res.map((i) => i.serialize() as IComponents);
    }
}

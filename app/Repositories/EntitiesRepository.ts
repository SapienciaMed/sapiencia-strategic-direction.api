import { IEntities } from "App/Interfaces/EntitiesInterfaces";
import Entities from "App/Models/Process";
import EntitiesDependency from "App/Models/Dependence";
import EntitiesPosition from "App/Models/Position";
import EntitiesTypesRisks from "App/Models/RisksTypes"
import EntitiesImpact from "App/Models/Impact";
import EntitiesProbabiity from "App/Models/Probability"

export interface IEntitiesRepository {
  getEntities(): Promise<IEntities[]>;
  getEntitiesDependency(): Promise<IEntities[]>;
  getEntitiesPosition(): Promise<IEntities[]>;
  getEntitiesTypesRisks(): Promise<IEntities[]>;
  getEntitiesImpact(): Promise<IEntities[]>;
  getEntitiesProbability(): Promise<IEntities[]>;
}

export default class EntitiesRepository implements IEntitiesRepository {
  constructor() {}

  async getEntities(): Promise<IEntities[]> {
  
    const res = await Entities.query().where("PRC_ACTIVO", 1).orderBy('PRC_ORDEN', 'asc');

    return res.map((i) => i.serialize() as IEntities);
  }

  async getEntitiesDependency(): Promise<IEntities[]> {
  
    const res = await EntitiesDependency.query().where("DEP_ACTIVO", 1).orderBy('DEP_ORDEN', 'asc');

    return res.map((i) => i.serialize() as IEntities);
  }

  async getEntitiesPosition(): Promise<IEntities[]> {
  
    const res = await EntitiesPosition.query().orderBy('POS_ORDEN', 'asc');

    return res.map((i) => i.serialize() as IEntities);
  }

  async getEntitiesTypesRisks(): Promise<IEntities[]> {
  
    const res = await EntitiesTypesRisks.query().orderBy('TRI_ORDEN', 'asc');

    return res.map((i) => i.serialize() as IEntities);
  }

  async getEntitiesImpact(): Promise<IEntities[]> {
  
    const res = await EntitiesImpact.query().orderBy('IMP_ORDEN', 'asc');

    return res.map((i) => i.serialize() as IEntities);
  }

  async getEntitiesProbability(): Promise<IEntities[]> {
  
    const res = await EntitiesProbabiity.query().orderBy('PRO_ORDEN', 'asc');

    return res.map((i) => i.serialize() as IEntities);
  }

}

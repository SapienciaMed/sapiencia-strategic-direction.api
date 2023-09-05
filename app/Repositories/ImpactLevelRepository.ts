import { IImpactLevel, IImpactLevelTemp } from "App/Interfaces/ImpactLevelInterfaces";
import ImpactLevels from "../Models/ImpactLevel";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IImpactLevelRepository {
  getImpactLevel(): Promise<IImpactLevel[] | null>;
  getImpactLevelById(id: number): Promise<IImpactLevel | null>;
  createImpactLevel(ImpactLevel: IImpactLevelTemp, trx: TransactionClientContract): Promise<IImpactLevel>;
  updateImpactLevel(ImpactLevel: IImpactLevelTemp, id: number, trx: TransactionClientContract): Promise<IImpactLevel | null>;
}

export default class ImpactLevelRepository implements IImpactLevelRepository {

  async getImpactLevel(): Promise<IImpactLevel[] | null> {
    const res = await ImpactLevels.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getImpactLevelById(id: number): Promise<IImpactLevel | null> {
    const res = await ImpactLevels.find(id);
    return res ? (res.serialize() as IImpactLevel) : null;
  }

  async createImpactLevel(ImpactLevel: IImpactLevelTemp, trx: TransactionClientContract): Promise<IImpactLevel> {
    const toCreate = new ImpactLevels();
    if (ImpactLevel?.id !== undefined) {
      toCreate.id = ImpactLevel.id;
    }
    if (ImpactLevel?.description) {
      toCreate.description = ImpactLevel.description;
    }
    if (ImpactLevel?.active) {
      toCreate.active = ImpactLevel.active;
    }
    if (ImpactLevel?.order) {
      toCreate.order = ImpactLevel.order;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IImpactLevel;
  }

  async updateImpactLevel(ImpactLevel: IImpactLevelTemp, id: number, trx: TransactionClientContract): Promise<IImpactLevel | null> {
    const toUpdate = await ImpactLevels.find(id);
    if (!toUpdate) {
      return null;
    }
    if (ImpactLevel?.description !== undefined) {
      toUpdate.description = ImpactLevel.description;
    }
    if (ImpactLevel?.active) {
      toUpdate.active = ImpactLevel.active;
    }
    if (ImpactLevel?.order) {
      toUpdate.order = ImpactLevel.order;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IImpactLevel;
  }
}

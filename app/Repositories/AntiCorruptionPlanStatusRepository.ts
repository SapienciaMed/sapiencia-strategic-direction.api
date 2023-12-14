import { IAntiCorruptionPlanStatus, IAntiCorruptionPlanStatusTemp } from "App/Interfaces/AntiCorruptionPlanStatusInterfaces";
import AntiCorruptionPlanStatuss from "../Models/AntiCorruptionPlanStatus";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanStatusRepository {
  getAntiCorruptionPlanStatus(): Promise<IAntiCorruptionPlanStatus[] | null>;
  getAntiCorruptionPlanStatusById(id: number): Promise<IAntiCorruptionPlanStatus | null>;
  createAntiCorruptionPlanStatus(AntiCorruptionPlanStatus: IAntiCorruptionPlanStatusTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanStatus>;
  updateAntiCorruptionPlanStatus(AntiCorruptionPlanStatus: IAntiCorruptionPlanStatusTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanStatus | null>;
}

export default class AntiCorruptionPlanStatusRepository implements IAntiCorruptionPlanStatusRepository {

  async getAntiCorruptionPlanStatus(): Promise<IAntiCorruptionPlanStatus[] | null> {
    const res = await AntiCorruptionPlanStatuss.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanStatusById(id: number): Promise<IAntiCorruptionPlanStatus | null> {
    const res = await AntiCorruptionPlanStatuss.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlanStatus) : null;
  }

  async createAntiCorruptionPlanStatus(AntiCorruptionPlanStatus: IAntiCorruptionPlanStatusTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanStatus> {
    const toCreate = new AntiCorruptionPlanStatuss();
    if (AntiCorruptionPlanStatus?.id !== undefined) {
      toCreate.id = AntiCorruptionPlanStatus.id;
    }
    if (AntiCorruptionPlanStatus?.description) {
      toCreate.description = AntiCorruptionPlanStatus.description;
    }
    if (AntiCorruptionPlanStatus?.active) {
      toCreate.active = AntiCorruptionPlanStatus.active;
    }
    if (AntiCorruptionPlanStatus?.order) {
      toCreate.order = AntiCorruptionPlanStatus.order;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlanStatus;
  }

  async updateAntiCorruptionPlanStatus(AntiCorruptionPlanStatus: IAntiCorruptionPlanStatusTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanStatus | null> {
    const toUpdate = await AntiCorruptionPlanStatuss.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlanStatus?.description !== undefined) {
      toUpdate.description = AntiCorruptionPlanStatus.description;
    }
    if (AntiCorruptionPlanStatus?.active) {
      toUpdate.active = AntiCorruptionPlanStatus.active;
    }
    if (AntiCorruptionPlanStatus?.order) {
      toUpdate.order = AntiCorruptionPlanStatus.order;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlanStatus;
  }
}

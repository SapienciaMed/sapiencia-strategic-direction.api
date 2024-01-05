import { IAntiCorruptionPlanDescription, IAntiCorruptionPlanDescriptionTemp } from "App/Interfaces/AntiCorruptionPlanDescriptionInterfaces";
import AntiCorruptionPlanDescriptions from "../Models/AntiCorruptionPlanDescription";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanDescriptionRepository {
  getAntiCorruptionPlanDescription(): Promise<IAntiCorruptionPlanDescription[] | null>;
  getAntiCorruptionPlanDescriptionById(id: number): Promise<IAntiCorruptionPlanDescription | null>;
  createAntiCorruptionPlanDescription(AntiCorruptionPlanDescription: IAntiCorruptionPlanDescriptionTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanDescription>;
  updateAntiCorruptionPlanDescription(AntiCorruptionPlanDescription: IAntiCorruptionPlanDescriptionTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanDescription | null>;
}

export default class AntiCorruptionPlanDescriptionRepository implements IAntiCorruptionPlanDescriptionRepository {

  async getAntiCorruptionPlanDescription(): Promise<IAntiCorruptionPlanDescription[] | null> {
    const res = await AntiCorruptionPlanDescriptions.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanDescriptionById(id: number): Promise<IAntiCorruptionPlanDescription | null> {
    const res = await AntiCorruptionPlanDescriptions.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlanDescription) : null;
  }

  async createAntiCorruptionPlanDescription(AntiCorruptionPlanDescription: IAntiCorruptionPlanDescriptionTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanDescription> {
    const toCreate = new AntiCorruptionPlanDescriptions();
    if (AntiCorruptionPlanDescription?.id !== undefined) {
      toCreate.id = AntiCorruptionPlanDescription.id;
    }
    if (AntiCorruptionPlanDescription?.description) {
      toCreate.description = AntiCorruptionPlanDescription.description;
    }
    if (AntiCorruptionPlanDescription?.active) {
      toCreate.active = AntiCorruptionPlanDescription.active;
    }
    if (AntiCorruptionPlanDescription?.order) {
      toCreate.order = AntiCorruptionPlanDescription.order;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlanDescription;
  }

  async updateAntiCorruptionPlanDescription(AntiCorruptionPlanDescription: IAntiCorruptionPlanDescriptionTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanDescription | null> {
    const toUpdate = await AntiCorruptionPlanDescriptions.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlanDescription?.description !== undefined) {
      toUpdate.description = AntiCorruptionPlanDescription.description;
    }
    if (AntiCorruptionPlanDescription?.active) {
      toUpdate.active = AntiCorruptionPlanDescription.active;
    }
    if (AntiCorruptionPlanDescription?.order) {
      toUpdate.order = AntiCorruptionPlanDescription.order;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlanDescription;
  }
}

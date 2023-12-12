import { IAntiCorruptionPlan, IAntiCorruptionPlanTemp } from "App/Interfaces/AntiCorruptionPlanInterfaces";
import AntiCorruptionPlans from "../Models/AntiCorruptionPlan";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { DateTime } from "luxon";

export interface IAntiCorruptionPlanRepository {
  getAntiCorruptionPlan(): Promise<IAntiCorruptionPlan[] | null>;
  getAntiCorruptionPlanById(id: number): Promise<IAntiCorruptionPlan | null>;
  getAntiCorruptionPlanByStatus(status: number): Promise<IAntiCorruptionPlan[] | null>;
  createAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlan>;
  updateAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlan | null>;
}

export default class AntiCorruptionPlanRepository implements IAntiCorruptionPlanRepository {

  async getAntiCorruptionPlan(): Promise<IAntiCorruptionPlan[] | null> {
    const res = await AntiCorruptionPlans.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanById(id: number): Promise<IAntiCorruptionPlan | null> {
    const res = await AntiCorruptionPlans.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlan) : null;
  }

  async getAntiCorruptionPlanByStatus(status: number): Promise<IAntiCorruptionPlan[] | null> {
    const res = await AntiCorruptionPlans.query().where('PAC_STATUS', status).orderBy('id', 'asc');
    return res ? res.map(plan => plan.serialize() as IAntiCorruptionPlan) : null;
}

  async createAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlan> {
    const toCreate = new AntiCorruptionPlans();
    if (AntiCorruptionPlan?.id !== undefined) {
      toCreate.id = AntiCorruptionPlan.id;
    }
    if (AntiCorruptionPlan?.name) {
      toCreate.name = AntiCorruptionPlan.name;
    }

    toCreate.date = AntiCorruptionPlan.date || DateTime.now().toISO()!;

    if (AntiCorruptionPlan?.status) {
      toCreate.status = AntiCorruptionPlan.status;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlan;
  }

  async updateAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlan | null> {
    const toUpdate = await AntiCorruptionPlans.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlan?.name !== undefined) {
      toUpdate.name = AntiCorruptionPlan.name;
    }
    if (AntiCorruptionPlan?.date) {
      toUpdate.date = AntiCorruptionPlan.date;
    }
    if (AntiCorruptionPlan?.status) {
      toUpdate.status = AntiCorruptionPlan.status;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlan;
  }
}

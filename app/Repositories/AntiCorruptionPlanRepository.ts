import { IAntiCorruptionPlan, IAntiCorruptionPlanTemp, IAntiCorruptionPlanFiltersPaginated } from "App/Interfaces/AntiCorruptionPlanInterfaces";
import AntiCorruptionPlans from "../Models/AntiCorruptionPlan";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IPagingData } from "App/Utils/ApiResponses";
import AntiCorruptionPlan from "../Models/AntiCorruptionPlan";

export interface IAntiCorruptionPlanRepository {
  getAntiCorruptionPlan(): Promise<IAntiCorruptionPlan[] | null>;
  getAntiCorruptionPlanById(id: number): Promise<IAntiCorruptionPlan | null>;
  getAntiCorruptionPlanByStatus(status: number): Promise<IAntiCorruptionPlan[] | null>;
  createAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlan>;
  updateAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlan | null>;
  getAntiCorruptionPlanPaginated(filters: IAntiCorruptionPlanFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlan>>;
}

export default class AntiCorruptionPlanRepository implements IAntiCorruptionPlanRepository {

  async getAntiCorruptionPlanPaginated(filters: IAntiCorruptionPlanFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlan>> {
    const query = AntiCorruptionPlan.query()
      .distinct()
      .orderBy('PAC_STATUS', 'asc')
      .orderBy('PAC_FECHA', 'desc');

    if (filters.name) {
      query.where("name", filters.name);
    }

    if (filters.status) {
      query.where("status", filters.status);
    }

    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IAntiCorruptionPlan[],
      meta,
    };

  }

  async getAntiCorruptionPlan(): Promise<IAntiCorruptionPlan[]> {
    const res = await AntiCorruptionPlans.query().orderBy('id', 'asc');
    return res ? (res) : [];
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

    if (AntiCorruptionPlan?.date) {
      toCreate.date = AntiCorruptionPlan.date
    }

    if (AntiCorruptionPlan?.status) {
      toCreate.status = AntiCorruptionPlan.status;
    }

    if (AntiCorruptionPlan?.year) {
      toCreate.year = AntiCorruptionPlan.year;
    }

    if (AntiCorruptionPlan?.uuid) {
      toCreate.uuid = AntiCorruptionPlan.uuid;
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
    if (AntiCorruptionPlan?.year) {
      toUpdate.year = AntiCorruptionPlan.year;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlan;
  }
}

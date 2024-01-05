import { IAntiCorruptionPlanComponentActivity, IAntiCorruptionPlanComponentActivityTemp, IAntiCorruptionPlanComponentActivityFiltersPaginated, IStore } from "App/Interfaces/AntiCorruptionPlanComponentActivityInterfaces";
import AntiCorruptionPlanActivity from "../Models/AntiCorruptionPlanComponentActivity";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IPagingData } from "App/Utils/ApiResponses";
import AntiCorruptionPlanComponentActivity from "../Models/AntiCorruptionPlanComponentActivity";
import AntiCorruptionPlanIndicator from "App/Models/AntiCorruptionPlanIndicator";
import AntiCorruptionPlanResponsible from "App/Models/AntiCorruptionPlanResponsible";

export interface IAntiCorruptionPlanComponentActivityRepository {
  getAntiCorruptionPlanComponentActivity(): Promise<IAntiCorruptionPlanComponentActivity[] | null>;
  getAntiCorruptionPlanComponentActivityById(id: number): Promise<IAntiCorruptionPlanComponentActivity | null>;
  getAntiCorruptionPlanComponentActivityByPlanId(status: number): Promise<IAntiCorruptionPlanComponentActivity[] | null>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[] | null>;
  store(activities: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentActivityTemp[]>;
  createAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivity: IAntiCorruptionPlanComponentActivityTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentActivity>;
  updateAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivity: IAntiCorruptionPlanComponentActivityTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentActivity | null>;
  getAntiCorruptionPlanComponentActivityPaginated(filters: IAntiCorruptionPlanComponentActivityFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanComponentActivity>>;
}

export default class AntiCorruptionPlanComponentActivityRepository implements IAntiCorruptionPlanComponentActivityRepository {

  async getAntiCorruptionPlanComponentActivityPaginated(filters: IAntiCorruptionPlanComponentActivityFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanComponentActivity>> {
    const query = AntiCorruptionPlanComponentActivity.query()
      .distinct();

    if (filters.description) {
      query.where("description", filters.description);
    }
    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IAntiCorruptionPlanComponentActivity[],
      meta,
    };

  }

  async getAntiCorruptionPlanComponentActivity(): Promise<IAntiCorruptionPlanComponentActivity[] | null> {
    const res = await AntiCorruptionPlanActivity.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanComponentActivityById(id: number): Promise<IAntiCorruptionPlanComponentActivity | null> {
    const res = await AntiCorruptionPlanActivity.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlanComponentActivity) : null;
  }

  async getAntiCorruptionPlanComponentActivityByPlanId(id: number): Promise<IAntiCorruptionPlanComponentActivity[] | null> {
    const res = await AntiCorruptionPlanActivity.query().where("pac_id", id);
    return res ? (res) : null;
  }

  async createAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivity: IAntiCorruptionPlanComponentActivityTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentActivity> {
    const toCreate = new AntiCorruptionPlanActivity();
    if (AntiCorruptionPlanComponentActivity?.id !== undefined) {
      toCreate.id = AntiCorruptionPlanComponentActivity.id;
    }
    if (AntiCorruptionPlanComponentActivity?.description) {
      toCreate.description = AntiCorruptionPlanComponentActivity.description;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlanComponentActivity;
  }

  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[]> {
    const indicators = await AntiCorruptionPlanIndicator.query().useTransaction(trx).whereIn('acpa_uuid', ids);
    const responsibleIds = indicators.map(indicator => indicator.uuid);
  
    await trx.transaction(async (transaction) => {
      await AntiCorruptionPlanIndicator.query().useTransaction(transaction).whereIn('acpa_uuid', ids).delete();
      await AntiCorruptionPlanResponsible.query().useTransaction(transaction).whereIn('ipa_uuid', responsibleIds).delete();
      await AntiCorruptionPlanComponentActivity.query().useTransaction(transaction).whereIn('uuid', ids).delete();
    });
  
    return ids;
  }
  
  async store(store: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentActivityTemp[]> {
    await trx.transaction(async (transaction) => {
      for (const activity of store.activities) {
        const { id, description, uuid, cpac_uuid, pac_id } = activity;
  
        if (pac_id && id) {
          await AntiCorruptionPlanActivity.query().useTransaction(transaction).where('id', id).update({ description });
        } else {
          await AntiCorruptionPlanActivity.create({ description: description, uuid, cpac_uuid, pac_id: store.plan_id }, transaction);
        }
      }
    });
  
    return store.activities;
  }
  
  
  async updateAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivity: IAntiCorruptionPlanComponentActivityTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentActivity | null> {
    const toUpdate = await AntiCorruptionPlanActivity.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlanComponentActivity?.description !== undefined) {
      toUpdate.description = AntiCorruptionPlanComponentActivity.description;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlanComponentActivity;
  }
}

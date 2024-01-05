import { IAntiCorruptionPlanResponsible, IAntiCorruptionPlanResponsibleTemp, IAntiCorruptionPlanResponsibleFiltersPaginated, IStore } from "App/Interfaces/AntiCorruptionPlanResponsibleInterfaces";
import AntiCorruptionPlanActivity from "../Models/AntiCorruptionPlanResponsible";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IPagingData } from "App/Utils/ApiResponses";
import AntiCorruptionPlanResponsible from "../Models/AntiCorruptionPlanResponsible";

export interface IAntiCorruptionPlanResponsibleRepository {
  getAntiCorruptionPlanResponsible(): Promise<IAntiCorruptionPlanResponsible[] | null>;
  getAntiCorruptionPlanResponsibleById(id: number): Promise<IAntiCorruptionPlanResponsible | null>;
  getAntiCorruptionPlanResponsibleByPlanId(status: number): Promise<IAntiCorruptionPlanResponsible[] | null>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[] | null>;
  store(responsibles: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanResponsibleTemp[]>;
  createAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsible: IAntiCorruptionPlanResponsibleTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanResponsible>;
  updateAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsible: IAntiCorruptionPlanResponsibleTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanResponsible | null>;
  getAntiCorruptionPlanResponsiblePaginated(filters: IAntiCorruptionPlanResponsibleFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanResponsible>>;
}

export default class AntiCorruptionPlanResponsibleRepository implements IAntiCorruptionPlanResponsibleRepository {

  async getAntiCorruptionPlanResponsiblePaginated(filters: IAntiCorruptionPlanResponsibleFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanResponsible>> {
    const query = AntiCorruptionPlanResponsible.query()
      .distinct();

    if (filters.description) {
      query.where("description", filters.description);
    }
    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IAntiCorruptionPlanResponsible[],
      meta,
    };
  }

  async getAntiCorruptionPlanResponsible(): Promise<IAntiCorruptionPlanResponsible[] | null> {
    const res = await AntiCorruptionPlanActivity.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanResponsibleById(id: number): Promise<IAntiCorruptionPlanResponsible | null> {
    const res = await AntiCorruptionPlanActivity.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlanResponsible) : null;
  }

  async getAntiCorruptionPlanResponsibleByPlanId(id: number): Promise<IAntiCorruptionPlanResponsible[] | null> {
    const res = await AntiCorruptionPlanActivity.query().where("pac_id", id);
    return res ? (res) : null;
  }

  async createAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsible: IAntiCorruptionPlanResponsibleTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanResponsible> {
    const toCreate = new AntiCorruptionPlanActivity();
    if (AntiCorruptionPlanResponsible?.id !== undefined) {
      toCreate.id = AntiCorruptionPlanResponsible.id;
    }
    if (AntiCorruptionPlanResponsible?.description) {
      toCreate.description = AntiCorruptionPlanResponsible.description;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlanResponsible;
  }


  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[]> {
    await trx.transaction(async (transaction) => {
      await AntiCorruptionPlanActivity.query().useTransaction(transaction).whereIn('id', ids).delete();
    });
    return ids;
  }
  
  async store(store: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanResponsibleTemp[]> {
    await trx.transaction(async (transaction) => {
      for (const responsible of store.responsibles) {
        const { id, description, uuid, ipa_uuid, pac_id } = responsible;
  
        if (pac_id && id) {
          await AntiCorruptionPlanActivity.query().useTransaction(transaction).where('id', id).update({ description });
        } else {
          await AntiCorruptionPlanActivity.create({ description: description, uuid, ipa_uuid, pac_id: store.plan_id }, transaction);
        }
      }
    });
  
    return store.responsibles;
  }
  
  async updateAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsible: IAntiCorruptionPlanResponsibleTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanResponsible | null> {
    const toUpdate = await AntiCorruptionPlanActivity.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlanResponsible?.description !== undefined) {
      toUpdate.description = AntiCorruptionPlanResponsible.description;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlanResponsible;
  }
}

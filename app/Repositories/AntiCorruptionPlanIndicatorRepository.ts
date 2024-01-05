import { IAntiCorruptionPlanIndicator, IAntiCorruptionPlanIndicatorTemp, IAntiCorruptionPlanIndicatorFiltersPaginated, IStore } from "App/Interfaces/AntiCorruptionPlanIndicatorInterfaces";
import AntiCorruptionPlanIndicatorModel from "../Models/AntiCorruptionPlanIndicator";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IPagingData } from "App/Utils/ApiResponses";
import AntiCorruptionPlanResponsible from "App/Models/AntiCorruptionPlanResponsible";

export interface IAntiCorruptionPlanIndicatorRepository {
  getAntiCorruptionPlanIndicator(): Promise<IAntiCorruptionPlanIndicator[] | null>;
  getAntiCorruptionPlanIndicatorById(id: number): Promise<IAntiCorruptionPlanIndicator | null>;
  getAntiCorruptionPlanIndicatorByPlanId(status: number): Promise<IAntiCorruptionPlanIndicator[] | null>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[] | null>;
  store(indicators: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanIndicatorTemp[]>;
  createAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicator: IAntiCorruptionPlanIndicatorTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanIndicator>;
  updateAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicator: IAntiCorruptionPlanIndicatorTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanIndicator | null>;
  getAntiCorruptionPlanIndicatorPaginated(filters: IAntiCorruptionPlanIndicatorFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanIndicator>>;
}

export default class AntiCorruptionPlanIndicatorRepository implements IAntiCorruptionPlanIndicatorRepository {

  async getAntiCorruptionPlanIndicatorPaginated(filters: IAntiCorruptionPlanIndicatorFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanIndicator>> {
    const query = AntiCorruptionPlanIndicatorModel.query()
      .distinct();

    if (filters.description) {
      query.where("description", filters.description);
    }
    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IAntiCorruptionPlanIndicator[],
      meta,
    };

  }

  async getAntiCorruptionPlanIndicator(): Promise<IAntiCorruptionPlanIndicator[] | null> {
    const res = await AntiCorruptionPlanIndicatorModel.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanIndicatorById(id: number): Promise<IAntiCorruptionPlanIndicator | null> {
    const res = await AntiCorruptionPlanIndicatorModel.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlanIndicator) : null;
  }

  async getAntiCorruptionPlanIndicatorByPlanId(id: number): Promise<IAntiCorruptionPlanIndicator[] | null> {
    const res = await AntiCorruptionPlanIndicatorModel.query().where("pac_id", id);
    return res ? (res) : null;
  }

  async createAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicator: IAntiCorruptionPlanIndicatorTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanIndicator> {
    const toCreate = new AntiCorruptionPlanIndicatorModel();
    if (AntiCorruptionPlanIndicator?.id !== undefined) {
      toCreate.id = AntiCorruptionPlanIndicator.id;
    }
    if (AntiCorruptionPlanIndicator?.description) {
      toCreate.description = AntiCorruptionPlanIndicator.description;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlanIndicator;
  }

  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[]> {
  
    await trx.transaction(async (transaction) => {
      await AntiCorruptionPlanResponsible.query().useTransaction(transaction).whereIn('ipa_uuid', ids).delete();
      await AntiCorruptionPlanIndicatorModel.query().useTransaction(transaction).whereIn('uuid', ids).delete();
    });
  
    return ids;
  }
  
  async store(store: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanIndicatorTemp[]> {
    await trx.transaction(async (transaction) => {
      for (const activity of store.indicators) {
        const { id, description, uuid, acpa_uuid, pac_id, quarterly_goal1, quarterly_goal2, quarterly_goal3, unit1, unit2, unit3 } = activity;
  
        if (pac_id && id) {
          await AntiCorruptionPlanIndicatorModel.query().useTransaction(transaction).where('id', id).update({ description });
        } else {
          await AntiCorruptionPlanIndicatorModel.create({
            description: description, uuid, acpa_uuid, pac_id: store.plan_id,
            quarterly_goal1, quarterly_goal2, quarterly_goal3, unit1, unit2, unit3
          }, transaction);
        }
      }
    });
  
    return store.indicators;
  }
  
  
  async updateAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicator: IAntiCorruptionPlanIndicatorTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanIndicator | null> {
    const toUpdate = await AntiCorruptionPlanIndicatorModel.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlanIndicator?.description !== undefined) {
      toUpdate.description = AntiCorruptionPlanIndicator.description;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlanIndicator;
  }
}

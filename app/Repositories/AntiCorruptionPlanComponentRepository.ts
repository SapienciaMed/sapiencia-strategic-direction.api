import { IAntiCorruptionPlanComponent, IAntiCorruptionPlanComponentTemp, IAntiCorruptionPlanComponentFiltersPaginated, IStore } from "App/Interfaces/AntiCorruptionPlanComponentInterfaces";
import AntiCorruptionPlanComponents from "../Models/AntiCorruptionPlanComponent";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IPagingData } from "App/Utils/ApiResponses";
import AntiCorruptionPlanComponentActivity from "../Models/AntiCorruptionPlanComponentActivity";
import AntiCorruptionPlanIndicator from "../Models/AntiCorruptionPlanIndicator";
import AntiCorruptionPlanResponsible from "../Models/AntiCorruptionPlanResponsible";

export interface IAntiCorruptionPlanComponentRepository {
  getAntiCorruptionPlanComponent(): Promise<IAntiCorruptionPlanComponent[] | null>;
  getAntiCorruptionPlanComponentById(id: number): Promise<IAntiCorruptionPlanComponent | null>;
  getAntiCorruptionPlanComponentByPlanId(status: number): Promise<IAntiCorruptionPlanComponent[] | null>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[] | null>;
  store(components: IStore, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponentTemp[]>;
  createAntiCorruptionPlanComponent(AntiCorruptionPlanComponent: IAntiCorruptionPlanComponentTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponent>;
  updateAntiCorruptionPlanComponent(AntiCorruptionPlanComponent: IAntiCorruptionPlanComponentTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponent | null>;
  getAntiCorruptionPlanComponentPaginated(filters: IAntiCorruptionPlanComponentFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanComponent>>;
}

export default class AntiCorruptionPlanComponentRepository implements IAntiCorruptionPlanComponentRepository {

  async getAntiCorruptionPlanComponentPaginated(filters: IAntiCorruptionPlanComponentFiltersPaginated): Promise<IPagingData<IAntiCorruptionPlanComponent>> {
    const query = AntiCorruptionPlanComponents.query()
      .distinct();

    if (filters.description) {
      query.where("description", filters.description);
    }
    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IAntiCorruptionPlanComponent[],
      meta,
    };

  }

  async getAntiCorruptionPlanComponent(): Promise<IAntiCorruptionPlanComponent[] | null> {
    const res = await AntiCorruptionPlanComponents.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getAntiCorruptionPlanComponentById(id: number): Promise<IAntiCorruptionPlanComponent | null> {
    const res = await AntiCorruptionPlanComponents.find(id);
    return res ? (res.serialize() as IAntiCorruptionPlanComponent) : null;
  }

  async getAntiCorruptionPlanComponentByPlanId(id: number): Promise<IAntiCorruptionPlanComponent[] | null> {
    const res = await AntiCorruptionPlanComponents.query().where("pac_id", id);
    return res ? (res) : null;
  }

  async createAntiCorruptionPlanComponent(AntiCorruptionPlanComponent: IAntiCorruptionPlanComponentTemp, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponent> {
    const toCreate = new AntiCorruptionPlanComponents();
    if (AntiCorruptionPlanComponent?.id !== undefined) {
      toCreate.id = AntiCorruptionPlanComponent.id;
    }
    if (AntiCorruptionPlanComponent?.description) {
      toCreate.description = AntiCorruptionPlanComponent.description;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IAntiCorruptionPlanComponent;
  }


  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<string[]> {
    const activities = await AntiCorruptionPlanComponentActivity.query().useTransaction(trx).whereIn('cpac_uuid', ids);
    const activityIds = activities.map(activity => activity.uuid);
  
    const indicators = await AntiCorruptionPlanIndicator.query().useTransaction(trx).whereIn('acpa_uuid', activityIds);
    const responsibleIds = indicators.map(indicator => indicator.uuid);
  
    await trx.transaction(async (transaction) => {
      await AntiCorruptionPlanComponentActivity.query().useTransaction(transaction).whereIn('cpac_uuid', ids).delete();
      await AntiCorruptionPlanIndicator.query().useTransaction(transaction).whereIn('acpa_uuid', activityIds).delete();
      await AntiCorruptionPlanResponsible.query().useTransaction(transaction).whereIn('ipa_uuid', responsibleIds).delete();
      await AntiCorruptionPlanComponents.query().useTransaction(transaction).whereIn('uuid', ids).delete();
    });
  
    return ids;
  }
  
  async store(store: IStore, trx: TransactionClientContract): Promise<any[]> {
    await trx.transaction(async (transaction) => {
      for (const component of store.components) {
        const { id, description, pac_id, uuid } = component;
  
        if (pac_id && id) {
          await AntiCorruptionPlanComponents.query().useTransaction(transaction).where('id', id).update({ description });
        } else {
          await AntiCorruptionPlanComponents.create({ description: description, uuid, pac_id: store.plan_id }, transaction);
        }
      }
    });
  
    return store.components;
  }
  
  
  async updateAntiCorruptionPlanComponent(AntiCorruptionPlanComponent: IAntiCorruptionPlanComponentTemp, id: number, trx: TransactionClientContract): Promise<IAntiCorruptionPlanComponent | null> {
    const toUpdate = await AntiCorruptionPlanComponents.find(id);
    if (!toUpdate) {
      return null;
    }
    if (AntiCorruptionPlanComponent?.description !== undefined) {
      toUpdate.description = AntiCorruptionPlanComponent.description;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IAntiCorruptionPlanComponent;
  }
}

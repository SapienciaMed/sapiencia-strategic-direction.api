import { IImpactType, IImpactTypeTemp } from "App/Interfaces/ImpactTypeInterfaces";
import ImpactTypes from "../Models/ImpactType";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IImpactTypeRepository {
  getImpactType(): Promise<IImpactType[] | null>;
  getImpactTypeById(id: number): Promise<IImpactType | null>;
  createImpactType(ImpactType: IImpactTypeTemp, trx: TransactionClientContract): Promise<IImpactType>;
  updateImpactType(ImpactType: IImpactTypeTemp, id: number, trx: TransactionClientContract): Promise<IImpactType | null>;
}

export default class ImpactTypeRepository implements IImpactTypeRepository {

  async getImpactType(): Promise<IImpactType[] | null> {
    const res = await ImpactTypes.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getImpactTypeById(id: number): Promise<IImpactType | null> {
    const res = await ImpactTypes.find(id);
    return res ? (res.serialize() as IImpactType) : null;
  }

  async createImpactType(ImpactType: IImpactTypeTemp, trx: TransactionClientContract): Promise<IImpactType> {
    const toCreate = new ImpactTypes();
    if (ImpactType?.id !== undefined) {
      toCreate.id = ImpactType.id;
    }
    if (ImpactType?.description) {
      toCreate.description = ImpactType.description;
    }
    if (ImpactType?.active) {
      toCreate.active = ImpactType.active;
    }
    if (ImpactType?.order) {
      toCreate.order = ImpactType.order;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IImpactType;
  }

  async updateImpactType(ImpactType: IImpactTypeTemp, id: number, trx: TransactionClientContract): Promise<IImpactType | null> {
    const toUpdate = await ImpactTypes.find(id);
    if (!toUpdate) {
      return null;
    }
    if (ImpactType?.description !== undefined) {
      toUpdate.description = ImpactType.description;
    }
    if (ImpactType?.active) {
      toUpdate.active = ImpactType.active;
    }
    if (ImpactType?.order) {
      toUpdate.order = ImpactType.order;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IImpactType;
  }
}

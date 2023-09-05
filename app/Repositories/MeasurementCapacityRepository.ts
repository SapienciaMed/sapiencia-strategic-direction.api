import { IMeasurementCapacity, IMeasurementCapacityTemp } from "App/Interfaces/MeasurementCapacityInterfaces";
import MeasurementCapacitys from "../Models/MeasurentCapacity";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IMeasurementCapacityRepository {
  getMeasurementCapacity(): Promise<IMeasurementCapacity[] | null>;
  getMeasurementCapacityById(id: number): Promise<IMeasurementCapacity | null>;
  createMeasurementCapacity(MeasurementCapacity: IMeasurementCapacityTemp, trx: TransactionClientContract): Promise<IMeasurementCapacity>;
  updateMeasurementCapacity(MeasurementCapacity: IMeasurementCapacityTemp, id: number, trx: TransactionClientContract): Promise<IMeasurementCapacity | null>;
}

export default class MeasurementCapacityRepository implements IMeasurementCapacityRepository {

  async getMeasurementCapacity(): Promise<IMeasurementCapacity[] | null> {
    const res = await MeasurementCapacitys.query().orderBy('id', 'asc');
    return res ? (res) : null;
  }

  async getMeasurementCapacityById(id: number): Promise<IMeasurementCapacity | null> {
    const res = await MeasurementCapacitys.find(id);
    return res ? (res.serialize() as IMeasurementCapacity) : null;
  }

  async createMeasurementCapacity(MeasurementCapacity: IMeasurementCapacityTemp, trx: TransactionClientContract): Promise<IMeasurementCapacity> {
    const toCreate = new MeasurementCapacitys();
    if (MeasurementCapacity?.id !== undefined) {
      toCreate.id = MeasurementCapacity.id;
    }
    if (MeasurementCapacity?.description) {
      toCreate.description = MeasurementCapacity.description;
    }
    if (MeasurementCapacity?.active) {
      toCreate.active = MeasurementCapacity.active;
    }
    if (MeasurementCapacity?.order) {
      toCreate.order = MeasurementCapacity.order;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IMeasurementCapacity;
  }

  async updateMeasurementCapacity(MeasurementCapacity: IMeasurementCapacityTemp, id: number, trx: TransactionClientContract): Promise<IMeasurementCapacity | null> {
    const toUpdate = await MeasurementCapacitys.find(id);
    if (!toUpdate) {
      return null;
    }
    if (MeasurementCapacity?.description !== undefined) {
      toUpdate.description = MeasurementCapacity.description;
    }
    if (MeasurementCapacity?.active) {
      toUpdate.active = MeasurementCapacity.active;
    }
    if (MeasurementCapacity?.order) {
      toUpdate.order = MeasurementCapacity.order;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IMeasurementCapacity;
  }
}

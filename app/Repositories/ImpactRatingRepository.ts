import { IImpactRating, IImpactRatingTemp } from "App/Interfaces/ImpactRatingInterfaces";
import ImpactRatings from "../Models/ImpactRating";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IImpactRatingRepository {
  getImpactRating(): Promise<IImpactRating[] | null>;
  getImpactRatingById(id: number): Promise<IImpactRating | null>;
  createImpactRating(ImpactRating: IImpactRatingTemp, trx: TransactionClientContract): Promise<IImpactRating>;
  updateImpactRating(ImpactRating: IImpactRatingTemp, id: number, trx: TransactionClientContract): Promise<IImpactRating | null>;
}

export default class ImpactRatingRepository implements IImpactRatingRepository {

  async getImpactRating(): Promise<IImpactRating[] | null> {
    const res = await ImpactRatings.all();
    return res ? (res) : null;
  }

  async getImpactRatingById(id: number): Promise<IImpactRating | null> {
    const res = await ImpactRatings.find(id);
    return res ? (res.serialize() as IImpactRating) : null;
  }

  async createImpactRating(ImpactRating: IImpactRatingTemp, trx: TransactionClientContract): Promise<IImpactRating> {
    const toCreate = new ImpactRatings();
    if (ImpactRating?.id !== undefined) {
      toCreate.id = ImpactRating.id;
    }
    if (ImpactRating?.description) {
      toCreate.description = ImpactRating.description;
    }
    if (ImpactRating?.active) {
      toCreate.active = ImpactRating.active;
    }
    if (ImpactRating?.order) {
      toCreate.order = ImpactRating.order;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IImpactRating;
  }

  async updateImpactRating(ImpactRating: IImpactRatingTemp, id: number, trx: TransactionClientContract): Promise<IImpactRating | null> {
    const toUpdate = await ImpactRatings.find(id);
    if (!toUpdate) {
      return null;
    }
    if (ImpactRating?.description !== undefined) {
      toUpdate.description = ImpactRating.description;
    }
    if (ImpactRating?.active) {
      toUpdate.active = ImpactRating.active;
    }
    if (ImpactRating?.order) {
      toUpdate.order = ImpactRating.order;
    }

    toUpdate.useTransaction(trx);
    await toUpdate.save();
    return toUpdate.serialize() as IImpactRating;
  }
}

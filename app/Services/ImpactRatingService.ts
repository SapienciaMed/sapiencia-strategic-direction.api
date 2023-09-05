import {IImpactRating, IImpactRatingTemp } from "App/Interfaces/ImpactRatingInterfaces";
import { IImpactRatingRepository } from "App/Repositories/ImpactRatingRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IImpactRatingService {
  getImpactRating(): Promise<ApiResponse<IImpactRating[]>>;
  getImpactRatingById(id: number): Promise<ApiResponse<IImpactRating>>;
  createImpactRating(ImpactRating: IImpactRatingTemp, trx: TransactionClientContract): Promise<ApiResponse<IImpactRating>>;
  updateImpactRating(ImpactRating: IImpactRatingTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IImpactRating>>
}

export default class ImpactRatingService implements IImpactRatingService {
  constructor(
    private ImpactRatingtRepository: IImpactRatingRepository,
  ) {}

  async getImpactRating(): Promise<ApiResponse<IImpactRating[]>> {
    const res = await this.ImpactRatingtRepository.getImpactRating();

    if (!res) {
      return new ApiResponse(
        {} as IImpactRating[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getImpactRatingById(id: number): Promise<ApiResponse<IImpactRating>> {
    const res = await this.ImpactRatingtRepository.getImpactRatingById(id);

    if (!res) {
      return new ApiResponse(
        {} as IImpactRating,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createImpactRating(ImpactRatingt: IImpactRatingTemp, trx: TransactionClientContract): Promise<ApiResponse<IImpactRating>> {
    const ImpactRatingtCreate = await this.ImpactRatingtRepository.createImpactRating(ImpactRatingt, trx);
    return new ApiResponse(ImpactRatingtCreate, EResponseCodes.OK);
  }

  async updateImpactRating(ImpactRatingt: IImpactRatingTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IImpactRating>> {
    const res = await this.ImpactRatingtRepository.updateImpactRating(ImpactRatingt, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IImpactRating,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

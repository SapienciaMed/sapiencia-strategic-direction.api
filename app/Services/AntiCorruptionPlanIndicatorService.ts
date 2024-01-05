import {IAntiCorruptionPlanIndicator, IAntiCorruptionPlanIndicatorPaginated, IAntiCorruptionPlanIndicatorTemp, IStore } from "App/Interfaces/AntiCorruptionPlanIndicatorInterfaces";
import { IAntiCorruptionPlanIndicatorRepository } from "App/Repositories/AntiCorruptionPlanIndicatorRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanIndicatorService {
  getAntiCorruptionPlanIndicator(): Promise<ApiResponse<IAntiCorruptionPlanIndicator[]>>;
  getAntiCorruptionPlanIndicatorById(id: number): Promise<ApiResponse<IAntiCorruptionPlanIndicator>>;
  getAntiCorruptionPlanIndicatorByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanIndicator[]>>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>>;
  store(indicators: IStore, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanIndicatorTemp[]>>;
  createAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicator: IAntiCorruptionPlanIndicatorTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanIndicator>>;
  updateAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicator: IAntiCorruptionPlanIndicatorTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanIndicator>>;
  getAntiCorruptionPlanIndicatorPaginated(filters: IAntiCorruptionPlanIndicatorPaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanIndicator>>>;
}

export default class AntiCorruptionPlanIndicatorService implements IAntiCorruptionPlanIndicatorService {
  constructor(
    private AntiCorruptionPlanIndicatortRepository: IAntiCorruptionPlanIndicatorRepository,
  ) {}

  async getAntiCorruptionPlanIndicatorPaginated(filters: IAntiCorruptionPlanIndicatorPaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanIndicator>>> {
    const res = await this.AntiCorruptionPlanIndicatortRepository.getAntiCorruptionPlanIndicatorPaginated(filters);
    return new ApiResponse(res, EResponseCodes.OK)
  }

  async getAntiCorruptionPlanIndicator(): Promise<ApiResponse<IAntiCorruptionPlanIndicator[]>> {
    const res = await this.AntiCorruptionPlanIndicatortRepository.getAntiCorruptionPlanIndicator();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanIndicator[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanIndicatorById(id: number): Promise<ApiResponse<IAntiCorruptionPlanIndicator>> {
    const res = await this.AntiCorruptionPlanIndicatortRepository.getAntiCorruptionPlanIndicatorById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanIndicator,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
  async getAntiCorruptionPlanIndicatorByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanIndicator[]>> {
    const res = await this.AntiCorruptionPlanIndicatortRepository.getAntiCorruptionPlanIndicatorByPlanId(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanIndicator[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicatort: IAntiCorruptionPlanIndicatorTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanIndicator>> {
    const AntiCorruptionPlanIndicatortCreate = await this.AntiCorruptionPlanIndicatortRepository.createAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicatort, trx);
    return new ApiResponse(AntiCorruptionPlanIndicatortCreate, EResponseCodes.OK);
  }

  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>> {
    await this.AntiCorruptionPlanIndicatortRepository.deleteAllByIds(ids, trx);
    return new ApiResponse(ids, EResponseCodes.OK);
  }

  async store(indicators: IStore, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanIndicatorTemp[]>> {
    const AntiCorruptionPlanIndicatortCreate = await this.AntiCorruptionPlanIndicatortRepository.store(indicators, trx);
    return new ApiResponse(AntiCorruptionPlanIndicatortCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicatort: IAntiCorruptionPlanIndicatorTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanIndicator>> {
    const res = await this.AntiCorruptionPlanIndicatortRepository.updateAntiCorruptionPlanIndicator(AntiCorruptionPlanIndicatort, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanIndicator,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

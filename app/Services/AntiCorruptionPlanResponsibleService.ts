import {IAntiCorruptionPlanResponsible, IAntiCorruptionPlanResponsiblePaginated, IAntiCorruptionPlanResponsibleTemp, IStore } from "App/Interfaces/AntiCorruptionPlanResponsibleInterfaces";
import { IAntiCorruptionPlanResponsibleRepository } from "App/Repositories/AntiCorruptionPlanResponsibleRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanResponsibleService {
  getAntiCorruptionPlanResponsible(): Promise<ApiResponse<IAntiCorruptionPlanResponsible[]>>;
  getAntiCorruptionPlanResponsibleById(id: number): Promise<ApiResponse<IAntiCorruptionPlanResponsible>>;
  getAntiCorruptionPlanResponsibleByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanResponsible[]>>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>>;
  store(responsibles: IStore, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanResponsibleTemp[]>>;
  createAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsible: IAntiCorruptionPlanResponsibleTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanResponsible>>;
  updateAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsible: IAntiCorruptionPlanResponsibleTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanResponsible>>;
  getAntiCorruptionPlanResponsiblePaginated(filters: IAntiCorruptionPlanResponsiblePaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanResponsible>>>;
}

export default class AntiCorruptionPlanResponsibleService implements IAntiCorruptionPlanResponsibleService {
  constructor(
    private AntiCorruptionPlanResponsibletRepository: IAntiCorruptionPlanResponsibleRepository,
  ) {}

  async getAntiCorruptionPlanResponsiblePaginated(filters: IAntiCorruptionPlanResponsiblePaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanResponsible>>> {
    const res = await this.AntiCorruptionPlanResponsibletRepository.getAntiCorruptionPlanResponsiblePaginated(filters);
    return new ApiResponse(res, EResponseCodes.OK)
  }

  async getAntiCorruptionPlanResponsible(): Promise<ApiResponse<IAntiCorruptionPlanResponsible[]>> {
    const res = await this.AntiCorruptionPlanResponsibletRepository.getAntiCorruptionPlanResponsible();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanResponsible[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanResponsibleById(id: number): Promise<ApiResponse<IAntiCorruptionPlanResponsible>> {
    const res = await this.AntiCorruptionPlanResponsibletRepository.getAntiCorruptionPlanResponsibleById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanResponsible,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
  async getAntiCorruptionPlanResponsibleByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanResponsible[]>> {
    const res = await this.AntiCorruptionPlanResponsibletRepository.getAntiCorruptionPlanResponsibleByPlanId(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanResponsible[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsiblet: IAntiCorruptionPlanResponsibleTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanResponsible>> {
    const AntiCorruptionPlanResponsibletCreate = await this.AntiCorruptionPlanResponsibletRepository.createAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsiblet, trx);
    return new ApiResponse(AntiCorruptionPlanResponsibletCreate, EResponseCodes.OK);
  }

  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>> {
    await this.AntiCorruptionPlanResponsibletRepository.deleteAllByIds(ids, trx);
    return new ApiResponse(ids, EResponseCodes.OK);
  }

  async store(responsibles: IStore, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanResponsibleTemp[]>> {
    const AntiCorruptionPlanResponsibletCreate = await this.AntiCorruptionPlanResponsibletRepository.store(responsibles, trx);
    return new ApiResponse(AntiCorruptionPlanResponsibletCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsiblet: IAntiCorruptionPlanResponsibleTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanResponsible>> {
    const res = await this.AntiCorruptionPlanResponsibletRepository.updateAntiCorruptionPlanResponsible(AntiCorruptionPlanResponsiblet, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanResponsible,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

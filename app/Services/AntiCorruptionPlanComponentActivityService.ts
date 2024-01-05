import {IAntiCorruptionPlanComponentActivity, IAntiCorruptionPlanComponentActivityPaginated, IAntiCorruptionPlanComponentActivityTemp, IStore } from "App/Interfaces/AntiCorruptionPlanComponentActivityInterfaces";
import { IAntiCorruptionPlanComponentActivityRepository } from "App/Repositories/AntiCorruptionPlanComponentActivityRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanComponentActivityService {
  getAntiCorruptionPlanComponentActivity(): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity[]>>;
  getAntiCorruptionPlanComponentActivityById(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity>>;
  getAntiCorruptionPlanComponentActivityByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity[]>>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>>;
  store(activities: IStore, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentActivityTemp[]>>;
  createAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivity: IAntiCorruptionPlanComponentActivityTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity>>;
  updateAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivity: IAntiCorruptionPlanComponentActivityTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity>>;
  getAntiCorruptionPlanComponentActivityPaginated(filters: IAntiCorruptionPlanComponentActivityPaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanComponentActivity>>>;
}

export default class AntiCorruptionPlanComponentActivityService implements IAntiCorruptionPlanComponentActivityService {
  constructor(
    private AntiCorruptionPlanComponentActivitytRepository: IAntiCorruptionPlanComponentActivityRepository,
  ) {}

  async getAntiCorruptionPlanComponentActivityPaginated(filters: IAntiCorruptionPlanComponentActivityPaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanComponentActivity>>> {
    const res = await this.AntiCorruptionPlanComponentActivitytRepository.getAntiCorruptionPlanComponentActivityPaginated(filters);
    return new ApiResponse(res, EResponseCodes.OK)
  }

  async getAntiCorruptionPlanComponentActivity(): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity[]>> {
    const res = await this.AntiCorruptionPlanComponentActivitytRepository.getAntiCorruptionPlanComponentActivity();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponentActivity[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanComponentActivityById(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity>> {
    const res = await this.AntiCorruptionPlanComponentActivitytRepository.getAntiCorruptionPlanComponentActivityById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponentActivity,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
  async getAntiCorruptionPlanComponentActivityByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity[]>> {
    const res = await this.AntiCorruptionPlanComponentActivitytRepository.getAntiCorruptionPlanComponentActivityByPlanId(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponentActivity[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivityt: IAntiCorruptionPlanComponentActivityTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity>> {
    const AntiCorruptionPlanComponentActivitytCreate = await this.AntiCorruptionPlanComponentActivitytRepository.createAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivityt, trx);
    return new ApiResponse(AntiCorruptionPlanComponentActivitytCreate, EResponseCodes.OK);
  }

  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>> {
    await this.AntiCorruptionPlanComponentActivitytRepository.deleteAllByIds(ids, trx);
    return new ApiResponse(ids, EResponseCodes.OK);
  }

  async store(activities: IStore, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentActivityTemp[]>> {
    const AntiCorruptionPlanComponentActivitytCreate = await this.AntiCorruptionPlanComponentActivitytRepository.store(activities, trx);
    return new ApiResponse(AntiCorruptionPlanComponentActivitytCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivityt: IAntiCorruptionPlanComponentActivityTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentActivity>> {
    const res = await this.AntiCorruptionPlanComponentActivitytRepository.updateAntiCorruptionPlanComponentActivity(AntiCorruptionPlanComponentActivityt, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponentActivity,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

import {IAntiCorruptionPlan, IAntiCorruptionPlanTemp } from "App/Interfaces/AntiCorruptionPlanInterfaces";
import { IAntiCorruptionPlanRepository } from "App/Repositories/AntiCorruptionPlanRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanService {
  getAntiCorruptionPlan(): Promise<ApiResponse<IAntiCorruptionPlan[]>>;
  getAntiCorruptionPlanByStatus(status: number): Promise<ApiResponse<IAntiCorruptionPlan[]>>;
  getAntiCorruptionPlanById(id: number): Promise<ApiResponse<IAntiCorruptionPlan>>;
  createAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlan>>;
  updateAntiCorruptionPlan(AntiCorruptionPlan: IAntiCorruptionPlanTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlan>>
}

export default class AntiCorruptionPlanService implements IAntiCorruptionPlanService {
  constructor(
    private AntiCorruptionPlantRepository: IAntiCorruptionPlanRepository,
  ) {}

  async getAntiCorruptionPlan(): Promise<ApiResponse<IAntiCorruptionPlan[]>> {
    const res = await this.AntiCorruptionPlantRepository.getAntiCorruptionPlan();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlan[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanById(id: number): Promise<ApiResponse<IAntiCorruptionPlan>> {
    const res = await this.AntiCorruptionPlantRepository.getAntiCorruptionPlanById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlan,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanByStatus(status: number): Promise<ApiResponse<IAntiCorruptionPlan[]>> {
    const res = await this.AntiCorruptionPlantRepository.getAntiCorruptionPlanByStatus(status);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlan[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlan(AntiCorruptionPlant: IAntiCorruptionPlanTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlan>> {
    const AntiCorruptionPlantCreate = await this.AntiCorruptionPlantRepository.createAntiCorruptionPlan(AntiCorruptionPlant, trx);
    return new ApiResponse(AntiCorruptionPlantCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlan(AntiCorruptionPlant: IAntiCorruptionPlanTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlan>> {
    const res = await this.AntiCorruptionPlantRepository.updateAntiCorruptionPlan(AntiCorruptionPlant, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlan,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

import {IAntiCorruptionPlanStatus, IAntiCorruptionPlanStatusTemp } from "App/Interfaces/AntiCorruptionPlanStatusInterfaces";
import { IAntiCorruptionPlanStatusRepository } from "App/Repositories/AntiCorruptionPlanStatusRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanStatusService {
  getAntiCorruptionPlanStatus(): Promise<ApiResponse<IAntiCorruptionPlanStatus[]>>;
  getAntiCorruptionPlanStatusById(id: number): Promise<ApiResponse<IAntiCorruptionPlanStatus>>;
  createAntiCorruptionPlanStatus(AntiCorruptionPlanStatus: IAntiCorruptionPlanStatusTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanStatus>>;
  updateAntiCorruptionPlanStatus(AntiCorruptionPlanStatus: IAntiCorruptionPlanStatusTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanStatus>>
}

export default class AntiCorruptionPlanStatusService implements IAntiCorruptionPlanStatusService {
  constructor(
    private AntiCorruptionPlanStatustRepository: IAntiCorruptionPlanStatusRepository,
  ) {}

  async getAntiCorruptionPlanStatus(): Promise<ApiResponse<IAntiCorruptionPlanStatus[]>> {
    const res = await this.AntiCorruptionPlanStatustRepository.getAntiCorruptionPlanStatus();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanStatus[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanStatusById(id: number): Promise<ApiResponse<IAntiCorruptionPlanStatus>> {
    const res = await this.AntiCorruptionPlanStatustRepository.getAntiCorruptionPlanStatusById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanStatus,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlanStatus(AntiCorruptionPlanStatust: IAntiCorruptionPlanStatusTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanStatus>> {
    const AntiCorruptionPlanStatustCreate = await this.AntiCorruptionPlanStatustRepository.createAntiCorruptionPlanStatus(AntiCorruptionPlanStatust, trx);
    return new ApiResponse(AntiCorruptionPlanStatustCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlanStatus(AntiCorruptionPlanStatust: IAntiCorruptionPlanStatusTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanStatus>> {
    const res = await this.AntiCorruptionPlanStatustRepository.updateAntiCorruptionPlanStatus(AntiCorruptionPlanStatust, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanStatus,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

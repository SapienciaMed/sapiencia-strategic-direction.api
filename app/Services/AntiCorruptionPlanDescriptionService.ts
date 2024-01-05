import {IAntiCorruptionPlanDescription, IAntiCorruptionPlanDescriptionTemp } from "App/Interfaces/AntiCorruptionPlanDescriptionInterfaces";
import { IAntiCorruptionPlanDescriptionRepository } from "App/Repositories/AntiCorruptionPlanDescriptionRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanDescriptionService {
  getAntiCorruptionPlanDescription(): Promise<ApiResponse<IAntiCorruptionPlanDescription[]>>;
  getAntiCorruptionPlanDescriptionById(id: number): Promise<ApiResponse<IAntiCorruptionPlanDescription>>;
  createAntiCorruptionPlanDescription(AntiCorruptionPlanDescription: IAntiCorruptionPlanDescriptionTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanDescription>>;
  updateAntiCorruptionPlanDescription(AntiCorruptionPlanDescription: IAntiCorruptionPlanDescriptionTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanDescription>>
}

export default class AntiCorruptionPlanDescriptionService implements IAntiCorruptionPlanDescriptionService {
  constructor(
    private AntiCorruptionPlanDescriptiontRepository: IAntiCorruptionPlanDescriptionRepository,
  ) {}

  async getAntiCorruptionPlanDescription(): Promise<ApiResponse<IAntiCorruptionPlanDescription[]>> {
    const res = await this.AntiCorruptionPlanDescriptiontRepository.getAntiCorruptionPlanDescription();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanDescription[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanDescriptionById(id: number): Promise<ApiResponse<IAntiCorruptionPlanDescription>> {
    const res = await this.AntiCorruptionPlanDescriptiontRepository.getAntiCorruptionPlanDescriptionById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanDescription,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlanDescription(AntiCorruptionPlanDescriptiont: IAntiCorruptionPlanDescriptionTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanDescription>> {
    const AntiCorruptionPlanDescriptiontCreate = await this.AntiCorruptionPlanDescriptiontRepository.createAntiCorruptionPlanDescription(AntiCorruptionPlanDescriptiont, trx);
    return new ApiResponse(AntiCorruptionPlanDescriptiontCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlanDescription(AntiCorruptionPlanDescriptiont: IAntiCorruptionPlanDescriptionTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanDescription>> {
    const res = await this.AntiCorruptionPlanDescriptiontRepository.updateAntiCorruptionPlanDescription(AntiCorruptionPlanDescriptiont, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanDescription,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

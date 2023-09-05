import {IImpactLevel, IImpactLevelTemp } from "App/Interfaces/ImpactLevelInterfaces";
import { IImpactLevelRepository } from "App/Repositories/ImpactLevelRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IImpactLevelService {
  getImpactLevel(): Promise<ApiResponse<IImpactLevel[]>>;
  getImpactLevelById(id: number): Promise<ApiResponse<IImpactLevel>>;
  createImpactLevel(ImpactLevel: IImpactLevelTemp, trx: TransactionClientContract): Promise<ApiResponse<IImpactLevel>>;
  updateImpactLevel(ImpactLevel: IImpactLevelTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IImpactLevel>>
}

export default class ImpactLevelService implements IImpactLevelService {
  constructor(
    private ImpactLeveltRepository: IImpactLevelRepository,
  ) {}

  async getImpactLevel(): Promise<ApiResponse<IImpactLevel[]>> {
    const res = await this.ImpactLeveltRepository.getImpactLevel();

    if (!res) {
      return new ApiResponse(
        {} as IImpactLevel[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getImpactLevelById(id: number): Promise<ApiResponse<IImpactLevel>> {
    const res = await this.ImpactLeveltRepository.getImpactLevelById(id);

    if (!res) {
      return new ApiResponse(
        {} as IImpactLevel,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createImpactLevel(ImpactLevelt: IImpactLevelTemp, trx: TransactionClientContract): Promise<ApiResponse<IImpactLevel>> {
    const ImpactLeveltCreate = await this.ImpactLeveltRepository.createImpactLevel(ImpactLevelt, trx);
    return new ApiResponse(ImpactLeveltCreate, EResponseCodes.OK);
  }

  async updateImpactLevel(ImpactLevelt: IImpactLevelTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IImpactLevel>> {
    const res = await this.ImpactLeveltRepository.updateImpactLevel(ImpactLevelt, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IImpactLevel,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

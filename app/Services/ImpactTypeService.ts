import {IImpactType, IImpactTypeTemp } from "App/Interfaces/ImpactTypeInterfaces";
import { IImpactTypeRepository } from "App/Repositories/ImpactTypeRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IImpactTypeService {
  getImpactType(): Promise<ApiResponse<IImpactType[]>>;
  getImpactTypeById(id: number): Promise<ApiResponse<IImpactType>>;
  createImpactType(ImpactType: IImpactTypeTemp, trx: TransactionClientContract): Promise<ApiResponse<IImpactType>>;
  updateImpactType(ImpactType: IImpactTypeTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IImpactType>>
}

export default class ImpactTypeService implements IImpactTypeService {
  constructor(
    private ImpactTypetRepository: IImpactTypeRepository,
  ) {}

  async getImpactType(): Promise<ApiResponse<IImpactType[]>> {
    const res = await this.ImpactTypetRepository.getImpactType();

    if (!res) {
      return new ApiResponse(
        {} as IImpactType[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getImpactTypeById(id: number): Promise<ApiResponse<IImpactType>> {
    const res = await this.ImpactTypetRepository.getImpactTypeById(id);

    if (!res) {
      return new ApiResponse(
        {} as IImpactType,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createImpactType(ImpactTypet: IImpactTypeTemp, trx: TransactionClientContract): Promise<ApiResponse<IImpactType>> {
    const ImpactTypetCreate = await this.ImpactTypetRepository.createImpactType(ImpactTypet, trx);
    return new ApiResponse(ImpactTypetCreate, EResponseCodes.OK);
  }

  async updateImpactType(ImpactTypet: IImpactTypeTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IImpactType>> {
    const res = await this.ImpactTypetRepository.updateImpactType(ImpactTypet, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IImpactType,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

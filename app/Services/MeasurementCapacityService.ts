import {IMeasurementCapacity, IMeasurementCapacityTemp } from "App/Interfaces/MeasurementCapacityInterfaces";
import { IMeasurementCapacityRepository } from "App/Repositories/MeasurementCapacityRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IMeasurementCapacityService {
  getMeasurementCapacity(): Promise<ApiResponse<IMeasurementCapacity[]>>;
  getMeasurementCapacityById(id: number): Promise<ApiResponse<IMeasurementCapacity>>;
  createMeasurementCapacity(MeasurementCapacity: IMeasurementCapacityTemp, trx: TransactionClientContract): Promise<ApiResponse<IMeasurementCapacity>>;
  updateMeasurementCapacity(MeasurementCapacity: IMeasurementCapacityTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IMeasurementCapacity>>
}

export default class MeasurementCapacityService implements IMeasurementCapacityService {
  constructor(
    private MeasurementCapacitytRepository: IMeasurementCapacityRepository,
  ) {}

  async getMeasurementCapacity(): Promise<ApiResponse<IMeasurementCapacity[]>> {
    const res = await this.MeasurementCapacitytRepository.getMeasurementCapacity();

    if (!res) {
      return new ApiResponse(
        {} as IMeasurementCapacity[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getMeasurementCapacityById(id: number): Promise<ApiResponse<IMeasurementCapacity>> {
    const res = await this.MeasurementCapacitytRepository.getMeasurementCapacityById(id);

    if (!res) {
      return new ApiResponse(
        {} as IMeasurementCapacity,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createMeasurementCapacity(MeasurementCapacityt: IMeasurementCapacityTemp, trx: TransactionClientContract): Promise<ApiResponse<IMeasurementCapacity>> {
    const MeasurementCapacitytCreate = await this.MeasurementCapacitytRepository.createMeasurementCapacity(MeasurementCapacityt, trx);
    return new ApiResponse(MeasurementCapacitytCreate, EResponseCodes.OK);
  }

  async updateMeasurementCapacity(MeasurementCapacityt: IMeasurementCapacityTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IMeasurementCapacity>> {
    const res = await this.MeasurementCapacitytRepository.updateMeasurementCapacity(MeasurementCapacityt, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IMeasurementCapacity,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

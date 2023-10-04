import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IIndicatorsRepository } from "App/Repositories/IndicatorsRepository";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";

export interface IIndicatorsService {
    getIndicatorDNP(): Promise<ApiResponse<MasterTable[]>>;
    getIndicatorName(): Promise<ApiResponse<MasterTable[]>>;
    getIndicatorType(): Promise<ApiResponse<MasterTable[]>>;
    getStrategicLine(): Promise<ApiResponse<MasterTable[]>>;
    getProgramation(): Promise<ApiResponse<MasterTable[]>>;
    getIndicatorsComponent(): Promise<ApiResponse<MasterTable[]>>;
}

export default class IndicatorsService implements IIndicatorsService {
  constructor(
    private indicatorsRepository: IIndicatorsRepository,
  ) {}

  async getIndicatorDNP(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.indicatorsRepository.getIndicatorDNP();

    if (!res) {
      return new ApiResponse(
        {} as MasterTable[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getIndicatorName(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.indicatorsRepository.getIndicatorName();

    if (!res) {
      return new ApiResponse(
        {} as MasterTable[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getIndicatorType(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.indicatorsRepository.getIndicatorType();

    if (!res) {
      return new ApiResponse(
        {} as MasterTable[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getStrategicLine(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.indicatorsRepository.getStrategicLine();

    if (!res) {
      return new ApiResponse(
        {} as MasterTable[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getProgramation(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.indicatorsRepository.getProgramation();

    if (!res) {
      return new ApiResponse(
        {} as MasterTable[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getIndicatorsComponent(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.indicatorsRepository.getIndicatorsComponent();

    if (!res) {
      return new ApiResponse(
        {} as MasterTable[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}

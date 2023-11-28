import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import IndicatorsPAIRepository from '../Repositories/IndicatorsPAIRepository';

export interface IIndicatorsPAIService {
    getPaiIndicatorsType(): Promise<ApiResponse<MasterTable[]>>;
}

export default class IndicatorsPAIService implements IIndicatorsPAIService {
  constructor(
    private IndicatorsPAIRepository: IndicatorsPAIRepository,
  ) {}
  async getPaiIndicatorsType(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.IndicatorsPAIRepository.getPaiIndicatorsType();

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
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IComponents } from "App/Interfaces/ComponentInterfaces";
import { IStageRepository } from "App/Repositories/StageRepository";
import { IStage } from "App/Interfaces/StagesInterfaces";

export interface IStageService {
    getStage(): Promise<ApiResponse<IStage[]>>;
}

export default class StageService implements StageService {
  constructor(
    private stageRepository: IStageRepository,
  ) {}

  async getStage(): Promise<ApiResponse<IComponents[]>> {
    const res = await this.stageRepository.getStage();

    if (!res) {
      return new ApiResponse(
        {} as IStage[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}

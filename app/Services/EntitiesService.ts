import { IEntities } from "App/Interfaces/EntitiesInterfaces";
import { IEntitiesRepository } from "App/Repositories/EntitiesRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IEntitiesService {
  getEntities(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesDependency(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesPosition(): Promise<ApiResponse<IEntities[]>>;
}

export default class EntitiesService implements IEntitiesService {
  constructor(private entitiesRepository: IEntitiesRepository) {}

  async getEntities(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntities();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }


  async getEntitiesDependency(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntitiesDependency();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getEntitiesPosition(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntitiesPosition();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }


  
}



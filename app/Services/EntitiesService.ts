import { IEntities } from "App/Interfaces/EntitiesInterfaces";
import { IEntitiesRepository } from "App/Repositories/EntitiesRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IEntitiesService {
  getEntities(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesDependency(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesPosition(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesTypesRisks(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesImpact(): Promise<ApiResponse<IEntities[]>>;
  getEntitiesProbability(): Promise<ApiResponse<IEntities[]>>;
  getEntity(): Promise<ApiResponse<IEntities[]>>;
  getResource(): Promise<ApiResponse<IEntities[]>>;
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

  async getEntitiesTypesRisks(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntitiesTypesRisks();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getEntitiesImpact(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntitiesImpact();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getEntitiesProbability(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntitiesProbability();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getEntity(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getEntity();

    if (!res) {
      return new ApiResponse(
        [] as IEntities[],
        EResponseCodes.WARN,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }


  async getResource(): Promise<ApiResponse<IEntities[]>> {
    const res = await this.entitiesRepository.getResource();

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



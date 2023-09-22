import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IComponents } from "App/Interfaces/ComponentInterfaces";
import { IComponentsRepository } from "App/Repositories/ComponentsRepository";

export interface IComponentsService {
    getComponents(): Promise<ApiResponse<IComponents[]>>;
}

export default class ComponentsService implements IComponentsService {
  constructor(
    private componentsRepository: IComponentsRepository,
  ) {}

  async getComponents(): Promise<ApiResponse<IComponents[]>> {
    const res = await this.componentsRepository.getComponents();

    if (!res) {
      return new ApiResponse(
        {} as IComponents[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}

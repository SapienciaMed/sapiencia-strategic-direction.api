import { IProject } from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Repositories/ProjectRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

export interface IProjectService {
  getProjectById(id: number): Promise<ApiResponse<IProject>>;
}

export default class ProjectService implements IProjectService {
  constructor(private projectRepository: IProjectRepository) {}

  async getProjectById(id: number): Promise<ApiResponse<IProject>> {
    const res = await this.projectRepository.getProjectById(id);

    if (!res) {
      return new ApiResponse(
        {} as IProject,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}

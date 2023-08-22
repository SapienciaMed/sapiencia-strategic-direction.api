import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProjectProvider from "@ioc:core.ProjectProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ProjectController {
  public async getProjectById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await ProjectProvider.getProjectById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

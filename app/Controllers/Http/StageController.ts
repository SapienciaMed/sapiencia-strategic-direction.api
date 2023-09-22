import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import StageProvider from "@ioc:core.StageProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ComponentsController {
  public async getStages({ response }: HttpContextContract) {
    try {
      return response.send(await StageProvider.getStage());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

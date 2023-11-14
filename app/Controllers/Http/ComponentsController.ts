import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ComponentsProvider from "@ioc:core.ComponentsProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ComponentsController {
  public async getComponents({ response }: HttpContextContract) {
    try {
      return response.send(await ComponentsProvider.getComponents());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

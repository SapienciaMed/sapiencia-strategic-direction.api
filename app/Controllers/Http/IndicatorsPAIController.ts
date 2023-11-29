import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import IndicatorsPAIProvider from "@ioc:core.IndicatorsPAIProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class IndicatorsPAIController {
  public async getPaiIndicatorsType({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsPAIProvider.getPaiIndicatorsType());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

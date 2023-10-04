import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import IndicatorsProvider from "@ioc:core.IndicatorsProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class IndicatorsController {
  public async getIndicatorDNP({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsProvider.getIndicatorDNP());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getIndicatorName({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsProvider.getIndicatorName());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getIndicatorType({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsProvider.getIndicatorType());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getIndicatorsComponent({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsProvider.getIndicatorsComponent());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getProgramation({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsProvider.getProgramation());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getStrategicLine({ response }: HttpContextContract) {
    try {
      return response.send(await IndicatorsProvider.getStrategicLine());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

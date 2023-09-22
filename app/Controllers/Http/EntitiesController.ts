import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import EntitiesProvider from "@ioc:core.EntitiesProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class EntitiesController {
  public async getEntities({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntities());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getEntitiesDependency({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntitiesDependency());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getEntitiesPosition({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntitiesPosition());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getEntitiesTypesRisks({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntitiesTypesRisks());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getEntitiesProbability({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntitiesProbability());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
  public async getEntitiesImpact({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntitiesImpact());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getResource({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getResource());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getEntity({ response }: HttpContextContract) {
    try {
      return response.send(await EntitiesProvider.getEntity());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

}

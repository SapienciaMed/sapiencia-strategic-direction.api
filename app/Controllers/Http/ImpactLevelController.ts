import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ImpactLevelProvider from "@ioc:core.ImpactLevelProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import ImpactLevelValidator from "App/Validators/ImpactLevelValidator";

export default class ImpactLevelController {
  public async getImpactLevel({ response }: HttpContextContract) {
    try {
      return response.send(await ImpactLevelProvider.getImpactLevel());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getImpactLevelById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await ImpactLevelProvider.getImpactLevelById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createImpactLevel({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(ImpactLevelValidator);
        return response.send(
          await ImpactLevelProvider.createImpactLevel(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateImpactLevel({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(ImpactLevelValidator);
        return response.send(
          await ImpactLevelProvider.updateImpactLevel(data, id, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }
}

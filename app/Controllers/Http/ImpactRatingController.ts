import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ImpactRatingProvider from "@ioc:core.ImpactRatingProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import ImpactRatingValidator from "App/Validators/ImpactRatingValidator";

export default class ImpactRatingController {
  public async getImpactRating({ response }: HttpContextContract) {
    try {
      return response.send(await ImpactRatingProvider.getImpactRating());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getImpactRatingById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await ImpactRatingProvider.getImpactRatingById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createImpactRating({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(ImpactRatingValidator);
        return response.send(
          await ImpactRatingProvider.createImpactRating(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateImpactRating({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(ImpactRatingValidator);
        return response.send(
          await ImpactRatingProvider.updateImpactRating(data, id, trx)
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

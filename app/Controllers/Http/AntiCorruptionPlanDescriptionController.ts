import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import DescriptionProvider from "@ioc:core.AntiCorruptionPlanDescriptionProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import DescriptionValidator from "App/Validators/AntiCorruptionPlanDescriptionValidator";

export default class DescriptionController {
  public async getDescription({ response }: HttpContextContract) {
    try {
      return response.send(await DescriptionProvider.getAntiCorruptionPlanDescription());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getDescriptionById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await DescriptionProvider.getAntiCorruptionPlanDescriptionById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createDescription({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(DescriptionValidator);
        return response.send(
          await DescriptionProvider.createAntiCorruptionPlanDescription(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateDescription({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(DescriptionValidator);
        return response.send(
          await DescriptionProvider.updateAntiCorruptionPlanDescription(data, id, trx)
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

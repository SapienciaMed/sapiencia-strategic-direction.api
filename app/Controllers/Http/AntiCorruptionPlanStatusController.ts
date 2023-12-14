import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import AntiCorruptionPlanStatusProvider from "@ioc:core.AntiCorruptionPlanStatusProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import AntiCorruptionPlanStatusValidator from "App/Validators/AntiCorruptionPlanStatusValidator";

export default class AntiCorruptionPlanStatusController {
  public async getAntiCorruptionPlanStatus({ response }: HttpContextContract) {
    try {
      return response.send(await AntiCorruptionPlanStatusProvider.getAntiCorruptionPlanStatus());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanStatusById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanStatusProvider.getAntiCorruptionPlanStatusById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createAntiCorruptionPlanStatus({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(AntiCorruptionPlanStatusValidator);
        return response.send(
          await AntiCorruptionPlanStatusProvider.createAntiCorruptionPlanStatus(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateAntiCorruptionPlanStatus({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(AntiCorruptionPlanStatusValidator);
        return response.send(
          await AntiCorruptionPlanStatusProvider.updateAntiCorruptionPlanStatus(data, id, trx)
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

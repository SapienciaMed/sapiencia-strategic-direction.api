import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { IAntiCorruptionPlanPaginated } from "App/Interfaces/AntiCorruptionPlanInterfaces";
import AntiCorruptionPlanProvider from "@ioc:core.AntiCorruptionPlanProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import AntiCorruptionPlanValidator from "App/Validators/AntiCorruptionPlanValidator";

export default class AntiCorruptionPlanController {

  public async getPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.all();
      return response.send(
        await AntiCorruptionPlanProvider.getAntiCorruptionPlanPaginated(data as IAntiCorruptionPlanPaginated)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
}

  public async getAntiCorruptionPlan({ response }: HttpContextContract) {
    try {
      return response.send(await AntiCorruptionPlanProvider.getAntiCorruptionPlan());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanProvider.getAntiCorruptionPlanById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanByStatus({ request, response }: HttpContextContract) {
    try {
      const { status } = request.params();
      return response.send(await AntiCorruptionPlanProvider.getAntiCorruptionPlanByStatus(status));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createAntiCorruptionPlan({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(AntiCorruptionPlanValidator);
        return response.send(
          await AntiCorruptionPlanProvider.createAntiCorruptionPlan(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateAntiCorruptionPlan({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(AntiCorruptionPlanValidator);
        return response.send(
          await AntiCorruptionPlanProvider.updateAntiCorruptionPlan(data, id, trx)
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

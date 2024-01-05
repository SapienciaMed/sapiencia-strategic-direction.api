import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { IAntiCorruptionPlanIndicatorPaginated, IStore } from "App/Interfaces/AntiCorruptionPlanIndicatorInterfaces";
import AntiCorruptionPlanIndicatorProvider from "@ioc:core.AntiCorruptionPlanIndicatorProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import AntiCorruptionPlanIndicatorValidator from "App/Validators/AntiCorruptionPlanIndicatorValidator";

export default class AntiCorruptionPlanIndicatorController {

  public async getPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.all();
      return response.send(
        await AntiCorruptionPlanIndicatorProvider.getAntiCorruptionPlanIndicatorPaginated(data as IAntiCorruptionPlanIndicatorPaginated)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
}

  public async getAntiCorruptionPlanIndicator({ response }: HttpContextContract) {
    try {
      return response.send(await AntiCorruptionPlanIndicatorProvider.getAntiCorruptionPlanIndicator());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }


  public async deleteAllByIds({ response, request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const ids = request.body() as string[] || [];
        return response.send(await AntiCorruptionPlanIndicatorProvider.deleteAllByIds(ids, trx));
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async store({ response, request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = request.body() as IStore || [];
        await AntiCorruptionPlanIndicatorProvider.store(data, trx);
        response.send(new ApiResponse<IStore>(data,  EResponseCodes.OK));
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async getAntiCorruptionPlanIndicatorById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanIndicatorProvider.getAntiCorruptionPlanIndicatorById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanIndicatorByPlanId({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanIndicatorProvider.getAntiCorruptionPlanIndicatorByPlanId(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createAntiCorruptionPlanIndicator({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(AntiCorruptionPlanIndicatorValidator);
        return response.send(
          await AntiCorruptionPlanIndicatorProvider.createAntiCorruptionPlanIndicator(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateAntiCorruptionPlanIndicator({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(AntiCorruptionPlanIndicatorValidator);
        return response.send(
          await AntiCorruptionPlanIndicatorProvider.updateAntiCorruptionPlanIndicator(data, id, trx)
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

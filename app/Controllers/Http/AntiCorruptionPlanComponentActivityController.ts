import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { IAntiCorruptionPlanComponentActivityPaginated, IStore } from "App/Interfaces/AntiCorruptionPlanComponentActivityInterfaces";
import AntiCorruptionPlanComponentActivityProvider from "@ioc:core.AntiCorruptionPlanComponentActivityProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import AntiCorruptionPlanComponentActivityValidator from "App/Validators/AntiCorruptionPlanComponentActivityValidator";

export default class AntiCorruptionPlanComponentActivityController {

  public async getPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.all();
      return response.send(
        await AntiCorruptionPlanComponentActivityProvider.getAntiCorruptionPlanComponentActivityPaginated(data as IAntiCorruptionPlanComponentActivityPaginated)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
}

  public async getAntiCorruptionPlanComponentActivity({ response }: HttpContextContract) {
    try {
      return response.send(await AntiCorruptionPlanComponentActivityProvider.getAntiCorruptionPlanComponentActivity());
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
        return response.send(await AntiCorruptionPlanComponentActivityProvider.deleteAllByIds(ids, trx));
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
        await AntiCorruptionPlanComponentActivityProvider.store(data, trx);
        response.send(new ApiResponse<IStore>(data,  EResponseCodes.OK));
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async getAntiCorruptionPlanComponentActivityById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanComponentActivityProvider.getAntiCorruptionPlanComponentActivityById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanComponentActivityByPlanId({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanComponentActivityProvider.getAntiCorruptionPlanComponentActivityByPlanId(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createAntiCorruptionPlanComponentActivity({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(AntiCorruptionPlanComponentActivityValidator);
        return response.send(
          await AntiCorruptionPlanComponentActivityProvider.createAntiCorruptionPlanComponentActivity(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateAntiCorruptionPlanComponentActivity({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(AntiCorruptionPlanComponentActivityValidator);
        return response.send(
          await AntiCorruptionPlanComponentActivityProvider.updateAntiCorruptionPlanComponentActivity(data, id, trx)
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

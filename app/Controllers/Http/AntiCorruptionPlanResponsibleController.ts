import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { IAntiCorruptionPlanResponsiblePaginated, IStore } from "App/Interfaces/AntiCorruptionPlanResponsibleInterfaces";
import AntiCorruptionPlanResponsibleProvider from "@ioc:core.AntiCorruptionPlanResponsibleProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import AntiCorruptionPlanResponsibleValidator from "App/Validators/AntiCorruptionPlanResponsibleValidator";

export default class AntiCorruptionPlanResponsibleController {

  public async getPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.all();
      return response.send(
        await AntiCorruptionPlanResponsibleProvider.getAntiCorruptionPlanResponsiblePaginated(data as IAntiCorruptionPlanResponsiblePaginated)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
}

  public async getAntiCorruptionPlanResponsible({ response }: HttpContextContract) {
    try {
      return response.send(await AntiCorruptionPlanResponsibleProvider.getAntiCorruptionPlanResponsible());
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
        return response.send(await AntiCorruptionPlanResponsibleProvider.deleteAllByIds(ids, trx));
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
        await AntiCorruptionPlanResponsibleProvider.store(data, trx);
        response.send(new ApiResponse<IStore>(data,  EResponseCodes.OK));
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async getAntiCorruptionPlanResponsibleById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanResponsibleProvider.getAntiCorruptionPlanResponsibleById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanResponsibleByPlanId({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanResponsibleProvider.getAntiCorruptionPlanResponsibleByPlanId(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createAntiCorruptionPlanResponsible({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(AntiCorruptionPlanResponsibleValidator);
        return response.send(
          await AntiCorruptionPlanResponsibleProvider.createAntiCorruptionPlanResponsible(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateAntiCorruptionPlanResponsible({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(AntiCorruptionPlanResponsibleValidator);
        return response.send(
          await AntiCorruptionPlanResponsibleProvider.updateAntiCorruptionPlanResponsible(data, id, trx)
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

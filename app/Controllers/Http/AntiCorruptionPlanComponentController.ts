import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { IAntiCorruptionPlanComponentPaginated, IAntiCorruptionPlanComponentTemp } from "App/Interfaces/AntiCorruptionPlanComponentInterfaces";
import AntiCorruptionPlanComponentProvider from "@ioc:core.AntiCorruptionPlanComponentProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import AntiCorruptionPlanComponentValidator from "App/Validators/AntiCorruptionPlanComponentValidator";

export default class AntiCorruptionPlanComponentController {

  public async getPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.all();
      return response.send(
        await AntiCorruptionPlanComponentProvider.getAntiCorruptionPlanComponentPaginated(data as IAntiCorruptionPlanComponentPaginated)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
}

  public async getAntiCorruptionPlanComponent({ response }: HttpContextContract) {
    try {
      return response.send(await AntiCorruptionPlanComponentProvider.getAntiCorruptionPlanComponent());
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
        return response.send(await AntiCorruptionPlanComponentProvider.deleteAllByIds(ids, trx));
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

        const components = request.body() as IAntiCorruptionPlanComponentTemp[] || [];
        const store = response.send(await AntiCorruptionPlanComponentProvider.store(components, trx));

        response.send({ store });
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async getAntiCorruptionPlanComponentById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanComponentProvider.getAntiCorruptionPlanComponentById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAntiCorruptionPlanComponentByPlanId({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await AntiCorruptionPlanComponentProvider.getAntiCorruptionPlanComponentByPlanId(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createAntiCorruptionPlanComponent({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(AntiCorruptionPlanComponentValidator);
        return response.send(
          await AntiCorruptionPlanComponentProvider.createAntiCorruptionPlanComponent(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateAntiCorruptionPlanComponent({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(AntiCorruptionPlanComponentValidator);
        return response.send(
          await AntiCorruptionPlanComponentProvider.updateAntiCorruptionPlanComponent(data, id, trx)
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

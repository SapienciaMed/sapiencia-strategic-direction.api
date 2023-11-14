import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ImpactTypeProvider from "@ioc:core.ImpactTypeProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import ImpactTypeValidator from "App/Validators/ImpactTypeValidator";

export default class ImpactTypeController {
  public async getImpactType({ response }: HttpContextContract) {
    try {
      return response.send(await ImpactTypeProvider.getImpactType());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getImpactTypeById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await ImpactTypeProvider.getImpactTypeById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createImpactType({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(ImpactTypeValidator);
        return response.send(
          await ImpactTypeProvider.createImpactType(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateImpactType({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(ImpactTypeValidator);
        return response.send(
          await ImpactTypeProvider.updateImpactType(data, id, trx)
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

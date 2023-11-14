import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import MeasurementCapacityProvider from "@ioc:core.MeasurementCapacityProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import MeasurementCapacityValidator from "App/Validators/MeasurementCapacityValidator";

export default class MeasurementCapacityController {
  public async getMeasurementCapacity({ response }: HttpContextContract) {
    try {
      return response.send(await MeasurementCapacityProvider.getMeasurementCapacity());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getMeasurementCapacityById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await MeasurementCapacityProvider.getMeasurementCapacityById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createMeasurementCapacity({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(MeasurementCapacityValidator);
        return response.send(
          await MeasurementCapacityProvider.createMeasurementCapacity(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateMeasurementCapacity({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(MeasurementCapacityValidator);
        return response.send(
          await MeasurementCapacityProvider.updateMeasurementCapacity(data, id, trx)
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

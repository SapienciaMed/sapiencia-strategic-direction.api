import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import Database from "@ioc:Adonis/Lucid/Database";
import ActionPlanProvider from "@ioc:core.ActionPlanProvider";

import ActionPlanValidator from "App/Validators/ActionPlanValidator";
import RevisionPAIValidator from "App/Validators/RevisionPAIValidator";



export default class ActionPlanController {
  public async createPAI({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(ActionPlanValidator);
        return response.send(
          await ActionPlanProvider.createPAI(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateProject({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(ActionPlanValidator);
        return response.send(
          await ActionPlanProvider.updatePAI(data, id, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async getPAIById({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        return response.send(
          await ActionPlanProvider.getPAIById(id)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async createRevisionPAI({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(RevisionPAIValidator);
        return response.send(
          await ActionPlanProvider.createRevisionPAI(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateRevisionPAI({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(RevisionPAIValidator);
        return response.send(
          await ActionPlanProvider.updateRevisionPAI(id, data, trx)
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

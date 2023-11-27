import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import SchedulesPAIProvider from "@ioc:core.SchedulesPAIProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import SchedulesPAIValidator from "App/Validators/SchedulesPAIValidator";

export default class SchedulesPAIController {
    public async getSchedulesPAI({ response }: HttpContextContract) {
        try {
            return response.send(await SchedulesPAIProvider.getSchedulesPAI());
        } catch (err) {
            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }
    }

    public async getScheduleStatuses({ response }: HttpContextContract) {
        try {
            return response.send(await SchedulesPAIProvider.getScheduleStatuses());
        } catch (err) {
            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }
    }

    public async crudSchedulesPAI({ request, response }: HttpContextContract) {
        await Database.transaction(async (trx) => {
            try {
                const schedules = await request.validate(SchedulesPAIValidator);
                return response.send(
                    await SchedulesPAIProvider.crudSchedulesPAI(schedules.data, trx)
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
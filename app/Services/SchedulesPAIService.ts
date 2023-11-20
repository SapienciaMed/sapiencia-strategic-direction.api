import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ISchedulesPAI } from "App/Interfaces/SchedulesPAIInterfaces";
import { ISchedulesPAIRepository } from "App/Repositories/SchedulesPAIRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface ISchedulesPAIService {
    getSchedulesPAI(): Promise<ApiResponse<ISchedulesPAI[]>>;
    crudSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ApiResponse<ISchedulesPAI[]>>;
}

export default class SchedulesPAIService implements ISchedulesPAIService {
    constructor(
        private schedulesPAIRepository: ISchedulesPAIRepository
    ) { }

    async getSchedulesPAI(): Promise<ApiResponse<ISchedulesPAI[]>> {
        const res = await this.schedulesPAIRepository.getSchedulesPAI();
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async crudSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ApiResponse<ISchedulesPAI[]>> {
        const schedulesCreating = schedules.filter(schedule => !schedule.id);
        const schedulesUptading = schedules.filter(schedule => schedule.id);
        let schedulesCreated: ISchedulesPAI[] = [];
        let schedulesUpdated: ISchedulesPAI[] = [];
        if (schedulesCreating.length > 0) {
            schedulesCreated = await this.schedulesPAIRepository.createSchedulesPAI(schedulesCreating, trx);
        }
        if (schedulesUptading.length > 0) {
            schedulesUpdated = await this.schedulesPAIRepository.createSchedulesPAI(schedulesUptading, trx);
        }
        return new ApiResponse(schedulesCreated.concat(schedulesUpdated), EResponseCodes.OK)
    }
}
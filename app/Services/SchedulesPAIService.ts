import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IComponents } from "App/Interfaces/ComponentInterfaces";
import { ISchedulesPAI } from "App/Interfaces/SchedulesPAIInterfaces";
import { ISchedulesPAIRepository } from "App/Repositories/SchedulesPAIRepository";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface ISchedulesPAIService {
    getSchedulesPAI(): Promise<ApiResponse<ISchedulesPAI[]>>;
    getScheduleStatuses(): Promise<ApiResponse<IComponents[]>>;
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

    async getScheduleStatuses(): Promise<ApiResponse<IComponents[]>> {
        const res = await this.schedulesPAIRepository.getScheduleStatuses();
        return new ApiResponse(res, EResponseCodes.OK)
    }

    async crudSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ApiResponse<ISchedulesPAI[]>> {
        const schedulesDeleting = schedules.filter(schedule => schedule.delete);
        const schedulesCreating = schedules.filter(schedule => !schedule.id && !schedule.delete);
        const schedulesUptading = schedules.filter(schedule => schedule.id && !schedule.delete);
        let schedulesCreated: ISchedulesPAI[] = [];
        let schedulesUpdated: ISchedulesPAI[] = [];
        if(schedulesDeleting.length > 0) {
            await this.schedulesPAIRepository.deleteSchedulesPAI(schedulesDeleting, trx);
        }
        if (schedulesCreating.length > 0) {
            schedulesCreated = await this.schedulesPAIRepository.createSchedulesPAI(schedulesCreating, trx);
        }
        if (schedulesUptading.length > 0) {
            schedulesUpdated = await this.schedulesPAIRepository.updateSchedulesPAI(schedulesUptading, trx);
        }
        return new ApiResponse(schedulesCreated.concat(schedulesUpdated), EResponseCodes.OK)
    }
}
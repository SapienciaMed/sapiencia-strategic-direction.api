import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IComponents } from "App/Interfaces/ComponentInterfaces";
import { ISchedulesPAI } from "App/Interfaces/SchedulesPAIInterfaces";
import ScheduleStatuses from "App/Models/ScheduleStatuses";
import SchedulesPAI from "App/Models/SchedulesPAI";

export interface ISchedulesPAIRepository {
    getSchedulesPAI(): Promise<ISchedulesPAI[]>;
    getScheduleStatuses(): Promise<IComponents[]>;
    createSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ISchedulesPAI[]>;
    updateSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ISchedulesPAI[]>;
}

export default class SchedulesPAIRepository implements ISchedulesPAIRepository {
    async getSchedulesPAI(): Promise<ISchedulesPAI[]> {
        const res = await SchedulesPAI.query();
        return res.map((i) => i.serialize() as ISchedulesPAI);
    }

    async getScheduleStatuses(): Promise<IComponents[]> {
        const res = await ScheduleStatuses.query();
        return res.map((i) => i.serialize() as IComponents);
    }

    async createSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ISchedulesPAI[]> {
        const schedulesCreate: ISchedulesPAI[] = [];
        for (let schedule in schedules) {
            const toCreate = new SchedulesPAI();
            toCreate.fill({ ...schedules[schedule] });
            toCreate.useTransaction(trx);
            await toCreate.save();
            schedulesCreate.push(toCreate.serialize() as ISchedulesPAI)
        }
        return schedulesCreate;
    }

    async updateSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ISchedulesPAI[]> {
        const schedulesUpdate: ISchedulesPAI[] = [];
        function enviarError(schedule: ISchedulesPAI) {
            throw new Error(`No se ha encontrado el id para el registro ${JSON.stringify(schedule)}`);
        }
        for (let schedule in schedules){
            const toUpdate = await SchedulesPAI.find(schedules[schedule].id);
            if(toUpdate) {
                toUpdate.startDate = schedules[schedule].startDate;
                toUpdate.endDate = schedules[schedule].endDate;
                toUpdate.bimester = schedules[schedule].bimester;
                toUpdate.idRol = schedules[schedule].idRol;
                toUpdate.idStatus = schedules[schedule].idStatus;
                toUpdate.useTransaction(trx);
                await toUpdate.save();
                schedulesUpdate.push(toUpdate.serialize() as ISchedulesPAI);
            } else {
                enviarError(schedules[schedule]);
            }
        }
        return schedulesUpdate;
    }
}
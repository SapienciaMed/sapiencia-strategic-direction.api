import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { ISchedulesPAI } from "App/Interfaces/SchedulesPAIInterfaces";
import SchedulesPAI from "App/Models/SchedulesPAI";

export interface ISchedulesPAIRepository {
    getSchedulesPAI(): Promise<ISchedulesPAI[]>;
    createSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ISchedulesPAI[]>;
    updateSchedulesPAI(schedules: ISchedulesPAI[], trx: TransactionClientContract): Promise<ISchedulesPAI[]>;
}

export default class SchedulesPAIRepository implements ISchedulesPAIRepository {
    async getSchedulesPAI(): Promise<ISchedulesPAI[]> {
        const res = await SchedulesPAI.query();
        return res.map((i) => i.serialize() as ISchedulesPAI);
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
        for (let schedule in schedules) {
            const schedul = await SchedulesPAI.query()
                .where("id", schedules[schedule].id ?? 0)
                .update({ ...schedules[schedule], dateModified: new Date() })
                .useTransaction(trx);
            if (schedul) {
                // Busca el registro actualizado
                const updatedSchedule = await SchedulesPAI.find(schedules[schedule].id ?? 0);

                if (updatedSchedule) {
                    schedulesUpdate.push(updatedSchedule.serialize() as ISchedulesPAI);
                } else {
                    enviarError(schedules[schedule]);
                }
            } else {
                enviarError(schedules[schedule]);
            }
        }
        return schedulesUpdate;
    }
}
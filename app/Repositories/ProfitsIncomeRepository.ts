import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IprofitsIncome } from "App/Interfaces/ProjectInterfaces";
import Profits from "App/Models/ProfitsIncome";
import Period from "App/Models/Period";

export interface IProfitsIncomeRepository {
    createProfits(profits: IprofitsIncome[],  idProject: number, trx: TransactionClientContract): Promise<IprofitsIncome[]>;
    updateProfits(profits: IprofitsIncome[],  idProject: number, trx: TransactionClientContract): Promise<IprofitsIncome[]>;
}

export default class ProfitsRepository implements IProfitsIncomeRepository {
    async createProfits(profits: IprofitsIncome[],  idProject: number, trx: TransactionClientContract): Promise<IprofitsIncome[]> {
        const profitsCreate: IprofitsIncome[] = [];
        for (let profit in profits) {
            const toCreate = new Profits();
            toCreate.idProject = idProject;
            toCreate.type = profits[profit].type;
            toCreate.description = profits[profit].description;
            toCreate.unit = profits[profit].unit;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const periods = profits[profit].period;
            if (periods?.length > 0) {
                for (let period in periods) {
                    await toCreate.related("period").create({
                        id: toCreate.id,
                        period: periods[period].period,
                        quantity: periods[period].quantity,
                        unitValue: periods[period].unitValue,
                        financialValue: periods[period].financialValue,
                    });
                }
            }
            profitsCreate.push({ ...toCreate.serialize() as IprofitsIncome, period: periods,});
        }
        return profitsCreate;
    }

    async updateProfits(profits: IprofitsIncome[], idProject: number, trx: TransactionClientContract): Promise<IprofitsIncome[]> {
        await Period.query().whereHas("profit", (query) => {
            query.where("idProject", idProject)
        }).delete().useTransaction(trx);

        await Profits.query().where("idProject", idProject).delete().useTransaction(trx);
        const profitsCreate: IprofitsIncome[] = [];
        for (let profit in profits) {
            const toCreate = new Profits();
            toCreate.idProject = idProject;
            toCreate.type = profits[profit].type;
            toCreate.description = profits[profit].description;
            toCreate.unit = profits[profit].unit;
            toCreate.useTransaction(trx);
            await toCreate.save();

            const periods = profits[profit].period;
            if (periods?.length > 0) {
                for (let period in periods) {
                    await toCreate.related("period").create({
                        period: periods[period].period,
                        quantity: periods[period].quantity,
                        unitValue: periods[period].unitValue,
                        financialValue: periods[period].financialValue,
                    });
                }
            }
            profitsCreate.push({ ...toCreate.serialize() as IprofitsIncome, period: periods,});
        }
        return profitsCreate;
    }
}

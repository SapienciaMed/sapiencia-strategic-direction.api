import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IHistoricalProject } from "App/Interfaces/HistoricProjectsInterfaces";
import { IProjectFiltersHistorical } from "App/Interfaces/ProjectInterfaces";
import HistoricalProjects from "App/Models/HistoricalProjects";

export interface IHistoricalProjectsRepository {
    getHistoricals(filters): Promise<IHistoricalProject[]>;
    createHistorical(historic: IHistoricalProject, trx: TransactionClientContract): Promise<IHistoricalProject>;
}

export default class HistoricalProjectsRepository implements IHistoricalProjectsRepository {
    async getHistoricals(filters: IProjectFiltersHistorical): Promise<IHistoricalProject[]> {
        const query = HistoricalProjects.query();
        query.whereHas("project", (subquery) => {
            if (filters.bpin) {
                subquery.where('bpin', filters.bpin);
            }
            if (filters.project) {
                subquery.where('project', filters.project);
            }
            if (filters.validity) {
                subquery.whereRaw("YEAR(PRY_FECHA_CREO) = ?", [filters.validity])
            }
            if (filters.idProject) {
                subquery.where('id', filters.idProject);
            }
        });
        query.preload("project");
        query.orderBy('HPR_VERSION', 'desc')
        const res = await query;

        return res.map((i) => i.serialize() as IHistoricalProject);
    }

    async createHistorical(historic: IHistoricalProject, trx: TransactionClientContract): Promise<IHistoricalProject> {
        const toCreate = new HistoricalProjects();
        toCreate.fill({ ...historic });
        toCreate.useTransaction(trx);
        await toCreate.save();
        return toCreate.serialize() as IHistoricalProject;
    }
}
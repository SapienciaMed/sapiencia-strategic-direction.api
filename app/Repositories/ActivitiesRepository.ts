import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IActivityFilter, IActivityMGA, ICause, IDetailActivity, IDetailedActivityFilter, IDetailedActivityPaginated } from "App/Interfaces/ProjectInterfaces";
import Activities from "App/Models/Activities";
import Budgets from "App/Models/Budgets";
import DetailActivities from "App/Models/DetailsActivities";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IActivitiesRepository {
    createActivities(activities: IActivityMGA[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<IActivityMGA[]>;
    updateActivities(activities: IActivityMGA[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<IActivityMGA[]>;
    getDetailedActivitiesByFilters(filters: IDetailedActivityFilter): Promise<IDetailActivity[]>
    getDetailedActivitiesPaginated(filters: IDetailedActivityPaginated): Promise<IPagingData<IDetailActivity>>;
    getActivitiesByFilters(filters: IActivityFilter): Promise<IActivityMGA[]>

}

export default class ActivitiesRepository implements IActivitiesRepository {
    async getActivitiesByFilters(filters: IActivityFilter): Promise<IActivityMGA[]> {
        const query = Activities.query().preload("detailActivities")

        if(filters.year) {
            query.where('validity', filters.year)
        }

        const res = await query

        return res.map(i => i.serialize() as IActivityMGA)

    }

    async getDetailedActivitiesPaginated(filters: IDetailedActivityPaginated): Promise<IPagingData<IDetailActivity>> {
        const query = DetailActivities.query().preload('activity')

        if (filters.detail) {
            query.andWhere((sub)=> {
                sub.whereILike('consecutive', `%${filters.detail}%`)
                sub.orWhereILike('detailActivity', `%${filters.detail}%`)
            });
        }

        const res = await query.paginate(filters.page, filters.perPage);
        const { data, meta } = res.serialize();

        return {
        array: data as IDetailActivity[],
        meta,
        };
    }
    
    async getDetailedActivitiesByFilters(filters: IDetailedActivityFilter): Promise<IDetailActivity[]> {
        const query = DetailActivities.query().preload('activity')

        if (filters.detail) {
            query.andWhere((sub)=> {
                sub.whereILike('consecutive', `%${filters.detail}%`)
                sub.orWhereILike('detailActivity', `%${filters.detail}%`)
            });
          }

        if (filters.idList) {
          query.whereIn("id", filters.idList);
        }
    
        if (filters.description) {
          query.whereILike("detailActivity", `%${filters.description}%`);
        }
        const res = await query;
    
        return res.map((i) => i.serialize() as IDetailActivity);   
    }

    async createActivities(activities: IActivityMGA[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<IActivityMGA[]> {
        const activitiesCreate: IActivityMGA[] = [];
        for (let activity in activities) {
            const toCreate = new Activities();
            toCreate.idProject = idProject;
            const cause = causes ? causes.find(cause => activities[activity].objetiveActivity.consecutive === cause.consecutive) : null;
            if (cause) {
                toCreate.objetiveActivity = Number(cause.id);
            } else {
                throw (new Error("Causa no encontrada"));
            }
            toCreate.stageActivity = activities[activity].stageActivity;
            toCreate.productMGA = activities[activity].productMGA;
            toCreate.activityMGA = activities[activity].activityMGA;
            toCreate.productDescriptionMGA = activities[activity].productDescriptionMGA;
            toCreate.activityDescriptionMGA = activities[activity].activityDescriptionMGA;
            toCreate.validity = activities[activity].validity;
            toCreate.year = activities[activity].year;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const budgets = activities[activity].budgetsMGA;
            if (budgets) {
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 0,
                    validity: budgets.year0.validity,
                    budget: budgets.year0.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 1,
                    validity: budgets.year1.validity,
                    budget: budgets.year1.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 2,
                    validity: budgets.year2.validity,
                    budget: budgets.year2.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 3,
                    validity: budgets.year3.validity,
                    budget: budgets.year3.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 4,
                    validity: budgets.year4.validity,
                    budget: budgets.year4.budget
                });
            }
            const detailActivities = activities[activity].detailActivities;
            if ((detailActivities || []).length > 0) {
                for (let detailActivity in detailActivities) {
                    await toCreate.related("detailActivities").create({
                        activityId: toCreate.id,
                        consecutive: detailActivities[detailActivity].consecutive,
                        detailActivity: detailActivities[detailActivity].detailActivity,
                        component: detailActivities[detailActivity].component,
                        measurement: detailActivities[detailActivity].measurement,
                        amount: detailActivities[detailActivity].amount,
                        unitCost: detailActivities[detailActivity].unitCost,
                        pospre: detailActivities[detailActivity].pospre,
                        validatorCPC: detailActivities[detailActivity].validatorCPC,
                        clasificatorCPC: detailActivities[detailActivity].clasificatorCPC,
                        sectionValidatorCPC: detailActivities[detailActivity].sectionValidatorCPC,
                    });
                }
            }
            activitiesCreate.push({ ...toCreate.serialize() as IActivityMGA, detailActivities: detailActivities, budgetsMGA: budgets });
        }
        return activitiesCreate;
    }

    async updateActivities(activities: IActivityMGA[], causes: ICause[] | null, idProject: number, trx: TransactionClientContract): Promise<IActivityMGA[]> {
        await DetailActivities.query().whereHas("activity", (query) => {
            query.where("idProject", idProject)
        }).delete().useTransaction(trx);
        await Budgets.query().whereHas("activity", (query) => {
            query.where("idProject", idProject)
        }).delete().useTransaction(trx);
        await Activities.query().where("idProject", idProject).delete().useTransaction(trx);
        const activitiesCreate: IActivityMGA[] = [];
        for (let activity in activities) {
            const toCreate = new Activities();
            toCreate.idProject = idProject;
            const cause = causes ? causes.find(cause => activities[activity].objetiveActivity.consecutive === cause.consecutive) : null;
            if (cause) {
                toCreate.objetiveActivity = Number(cause.id);
            } else {
                throw (new Error("Causa no encontrada"));
            }
            toCreate.stageActivity = activities[activity].stageActivity;
            toCreate.productMGA = activities[activity].productMGA;
            toCreate.activityMGA = activities[activity].activityMGA;
            toCreate.productDescriptionMGA = activities[activity].productDescriptionMGA;
            toCreate.activityDescriptionMGA = activities[activity].activityDescriptionMGA;
            toCreate.validity = activities[activity].validity;
            toCreate.year = activities[activity].year;
            toCreate.useTransaction(trx);
            await toCreate.save();
            const budgets = activities[activity].budgetsMGA;
            if (budgets) {
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 0,
                    validity: budgets.year0.validity,
                    budget: budgets.year0.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 1,
                    validity: budgets.year1.validity,
                    budget: budgets.year1.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 2,
                    validity: budgets.year2.validity,
                    budget: budgets.year2.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 3,
                    validity: budgets.year3.validity,
                    budget: budgets.year3.budget
                });
                await toCreate.related("budgetsMGA").create({
                    activityId: toCreate.id,
                    year: 4,
                    validity: budgets.year4.validity,
                    budget: budgets.year4.budget
                });
            }
            const detailActivities = activities[activity].detailActivities;
            if ((detailActivities || []).length > 0) {
                for (let detailActivity in detailActivities) {
                    await toCreate.related("detailActivities").create({
                        activityId: toCreate.id,
                        consecutive: detailActivities[detailActivity].consecutive,
                        detailActivity: detailActivities[detailActivity].detailActivity,
                        component: detailActivities[detailActivity].component,
                        measurement: detailActivities[detailActivity].measurement,
                        amount: detailActivities[detailActivity].amount,
                        unitCost: detailActivities[detailActivity].unitCost,
                        pospre: detailActivities[detailActivity].pospre,
                        validatorCPC: detailActivities[detailActivity].validatorCPC,
                        clasificatorCPC: detailActivities[detailActivity].clasificatorCPC,
                        sectionValidatorCPC: detailActivities[detailActivity].sectionValidatorCPC,
                    });
                }
            }
            activitiesCreate.push({ ...toCreate.serialize() as IActivityMGA, detailActivities: detailActivities, budgetsMGA: budgets });
        }
        return activitiesCreate;
    }
}

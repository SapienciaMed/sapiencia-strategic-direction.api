import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IActivityMGA, 
         ICause, 
         IDetailActivity, 
         IDetailedActivityFilter, 
         IDetailedActivityPaginated, 
         ITotalCostsFilter} from "App/Interfaces/ProjectInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import { IActivitiesRepository } from "App/Repositories/ActivitiesRepository";

interface IActivityFilter {}
export default class ActivitiesRepositoryFake implements IActivitiesRepository {
  createActivities(
    _activities: IActivityMGA[], 
    _causes: ICause[] | null, 
    _idProject: number, 
    _trx: TransactionClientContract): Promise<IActivityMGA[]> {
    return Promise.resolve( {} as Promise<IActivityMGA[]>);
  }
  updateActivities(
    _activities: IActivityMGA[], 
    _causes: ICause[] | null, 
    _idProject: number, 
    _trx: TransactionClientContract): Promise<IActivityMGA[]> {
    return Promise.resolve( {} as Promise<IActivityMGA[]>);
  }
  getDetailedActivitiesByFilters( _filters: IDetailedActivityFilter): Promise<IDetailActivity[]> {
    return Promise.resolve( {} as Promise<IDetailActivity[]>);
  }
  getDetailedActivitiesPaginated( _filters: IDetailedActivityPaginated): Promise<IPagingData<IDetailActivity>> {
    return Promise.resolve( {} as IPagingData<IDetailActivity>);
  }
  getActivitiesByFilters(_filters: IActivityFilter): Promise<IActivityMGA[]> {
    return Promise.resolve( {} as Promise<IActivityMGA[]>);
  }
  getTotalCostsByFilters(_filter: ITotalCostsFilter): Promise<number> {
    return Promise.resolve(0);
  }

}



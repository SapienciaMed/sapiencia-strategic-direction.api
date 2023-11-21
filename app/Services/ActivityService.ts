import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import {
  IActivityFilter,
  IActivityMGA,
  IDetailActivity,
  IDetailedActivityFilter,
  IDetailedActivityPaginated,
  ITotalCostsFilter,
} from "../Interfaces/ProjectInterfaces";
import { IActivitiesRepository } from "../Repositories/ActivitiesRepository";

export interface IActivityService {
  getDetailedActivitiesByFilters(
    filters: IDetailedActivityFilter
  ): Promise<ApiResponse<IDetailActivity[]>>;
  getDetailedActivitiesPaginated(
    filters: IDetailedActivityPaginated
  ): Promise<ApiResponse<IPagingData<IDetailActivity>>>;
  getActivitiesByFilters(filters: IActivityFilter): Promise<ApiResponse<IActivityMGA[]>>
  getTotalCostsByFilters(filter: ITotalCostsFilter): Promise<ApiResponse<number>>
}

export default class ActivityService implements IActivityService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async getTotalCostsByFilters(filter: ITotalCostsFilter): Promise<ApiResponse<number>> {
    const res = await this.activitiesRepository.getTotalCostsByFilters(filter)
    return new ApiResponse(res,EResponseCodes.OK)
  }

  async getActivitiesByFilters(filters: IActivityFilter): Promise<ApiResponse<IActivityMGA[]>> {
    const res = await this.activitiesRepository.getActivitiesByFilters(filters)
    return new ApiResponse(res, EResponseCodes.OK)
  }

  async getDetailedActivitiesPaginated(
    filters: IDetailedActivityPaginated
  ): Promise<ApiResponse<IPagingData<IDetailActivity>>> {
    const res = await this.activitiesRepository.getDetailedActivitiesPaginated(
      filters
    );

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getDetailedActivitiesByFilters(
    filters: IDetailedActivityFilter
  ): Promise<ApiResponse<IDetailActivity[]>> {
    const res = await this.activitiesRepository.getDetailedActivitiesByFilters(
      filters
    );

    return new ApiResponse(res, EResponseCodes.OK);
  }
}

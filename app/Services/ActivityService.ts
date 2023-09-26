import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import {
  IDetailActivity,
  IDetailedActivityFilter,
  IDetailedActivityPaginated,
} from "../Interfaces/ProjectInterfaces";
import { IActivitiesRepository } from "../Repositories/ActivitiesRepository";

export interface IActivityService {
  getDetailedActivitiesByFilters(
    filters: IDetailedActivityFilter
  ): Promise<ApiResponse<IDetailActivity[]>>;
  getDetailedActivitiesPaginated(
    filters: IDetailedActivityPaginated
  ): Promise<ApiResponse<IPagingData<IDetailActivity>>>;
}

export default class ActivityService implements IActivityService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

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

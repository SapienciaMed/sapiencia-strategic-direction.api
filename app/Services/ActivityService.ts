import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import {
  IDetailActivity,
  IDetailedActivityFilter,
} from "../Interfaces/ProjectInterfaces";
import { IActivitiesRepository } from "../Repositories/ActivitiesRepository";

export interface IActivityService {
  getDetailedActivitiesByFilters(
    filters: IDetailedActivityFilter
  ): Promise<ApiResponse<IDetailActivity[]>>;
}

export default class ActivityService implements IActivityService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async getDetailedActivitiesByFilters(
    filters: IDetailedActivityFilter
  ): Promise<ApiResponse<IDetailActivity[]>> {
    const res =
      await this.activitiesRepository.getDetailedActivitiesByFilters(filters);

    return new ApiResponse(res, EResponseCodes.OK);
  }
}

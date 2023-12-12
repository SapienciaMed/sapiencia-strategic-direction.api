import { IParameter , IGenericList  } from "App/Interfaces/CoreInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";


export interface ICoreService {
  getParametersByCodes(
    code: string[],
  ): Promise<IParameter>;

  getParametersByGrouper(
    groupers: string,
    ): Promise<IGenericList[]>;

}

export default class CoreService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.URL_API_CORE,
      timeout: 20000,
    });
  }

  

  public async getParametersByCodes(
    codes: Array<string>
  ): Promise<IParameter[]> {
    const dataUser = await this.axiosInstance.get<ApiResponse<IParameter[]>>(
      `/api/v1/parameter/get-by-codes`,
      {
        params: {
          codes,
        },
        headers: {
          Authorization: process.env.CURRENT_AUTHORIZATION,
        },
      }
    );
    return dataUser.data.data;
  }

  public async getParametersByGrouper(
    groupers: string
  ): Promise<IGenericList[]> {
    const dataUser = await this.axiosInstance.get<ApiResponse<IGenericList[]>>(
      `/api/v1/generic-list/get-by-grouper/${groupers}`,
      {
        headers: {
          Authorization: process.env.CURRENT_AUTHORIZATION,
        },
      }
    );
    return dataUser.data.data;
  }

}

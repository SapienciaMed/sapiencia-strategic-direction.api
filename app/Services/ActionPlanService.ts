import { ICreatePlanAction, IRevisionPAI } from "App/Interfaces/CreatePlanActionInterfaces";
import { IPlanActionRepository } from "App/Interfaces/repositories/IActionPlanRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";

import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IRevisionPAIRepository } from "App/Repositories/RevisionPAIRepository";
import { IActionPlanFilters, IActionPlanFiltersPaginated } from "App/Interfaces/ActionPlanInterface";

export interface IPlanActionService {
  createPAI(pai: ICreatePlanAction, trx: TransactionClientContract): Promise<ApiResponse<ICreatePlanAction>>;
  updatePAI(pai: ICreatePlanAction, id: number, trx: TransactionClientContract): Promise<ApiResponse<ICreatePlanAction>>;
  createRevisionPAI(revision: IRevisionPAI, trx: TransactionClientContract): Promise<ApiResponse<IRevisionPAI>>;
  updateRevisionPAI(id: number, revision: IRevisionPAI, trx: TransactionClientContract): Promise<ApiResponse<IRevisionPAI>>;
  getPAIById(id: number): Promise<ApiResponse<ICreatePlanAction>>;
  getAllStatus(): Promise<ApiResponse<MasterTable[]>>
  getActionPlanPaginated(
    filters: IActionPlanFiltersPaginated
  ): Promise<ApiResponse<IPagingData<ICreatePlanAction>>>;
  getActionPlansByFilters(filters: IActionPlanFilters): Promise<ApiResponse<ICreatePlanAction[]>>;
}

export default class PlanActionService implements IPlanActionService {
  constructor(
    private planActionRepository: IPlanActionRepository,
    private revisionPAIRepository: IRevisionPAIRepository,
  ) { }


  async createPAI(pai: ICreatePlanAction, trx: TransactionClientContract): Promise<ApiResponse<ICreatePlanAction>> {
    const projectCreate = await this.planActionRepository.createPAI(pai, trx);

    return new ApiResponse(
      {
        ...projectCreate,
      },
      EResponseCodes.OK
    );
  }

  async updatePAI(pai: ICreatePlanAction, id: number, trx: TransactionClientContract): Promise<ApiResponse<ICreatePlanAction>> {
    const res = await this.planActionRepository.updatePAI(pai, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as ICreatePlanAction,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(
      {
        ...res,
      },
      EResponseCodes.OK
    );
  }

  async createRevisionPAI(revision: IRevisionPAI, trx: TransactionClientContract): Promise<ApiResponse<IRevisionPAI>> {
    const projectCreate = await this.revisionPAIRepository.createRevisionPAI(revision, trx);
    return new ApiResponse({...projectCreate},EResponseCodes.OK);
  }

  async updateRevisionPAI(id: number, revision: IRevisionPAI, trx: TransactionClientContract): Promise<ApiResponse<IRevisionPAI>> {
    const res = await this.revisionPAIRepository.updateRevisionPAI(id, revision, trx);
    if (!res) {
      return new ApiResponse(
        {} as IRevisionPAI,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getPAIById(id: number): Promise<ApiResponse<ICreatePlanAction>> {
    const res = await this.planActionRepository.getPAIById(id);
    if (!res) {
      return new ApiResponse(
        {} as ICreatePlanAction,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllStatus(): Promise<ApiResponse<MasterTable[]>> {
    const res = await this.planActionRepository.getAllStatus();

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getActionPlanPaginated(
    filters: IActionPlanFiltersPaginated
  ): Promise<ApiResponse<IPagingData<ICreatePlanAction>>> {
    const res = await this.planActionRepository.getActionPlanPaginated(filters);

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getActionPlansByFilters(filters: IActionPlanFilters): Promise<ApiResponse<ICreatePlanAction[]>> {
    const res = await this.planActionRepository.getActionPlanByFilters(filters);
    return new ApiResponse(res, EResponseCodes.OK)
  }

}

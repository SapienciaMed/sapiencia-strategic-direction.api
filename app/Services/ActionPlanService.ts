import { ICreatePlanAction } from "App/Interfaces/CreatePlanActionInterfaces";
import { IPlanActionRepository } from "App/Interfaces/repositories/IActionPlanRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";

import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IPlanActionService {
  createPAI(pai: ICreatePlanAction, trx: TransactionClientContract): Promise<ApiResponse<ICreatePlanAction>>;
  updatePAI(pai: ICreatePlanAction, id: number, trx: TransactionClientContract): Promise<ApiResponse<ICreatePlanAction>>
}

export default class PlanActionService implements IPlanActionService {
  constructor(
    private planActionRepository: IPlanActionRepository,
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


}

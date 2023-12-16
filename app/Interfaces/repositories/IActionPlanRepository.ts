import {
  ICreatePlanAction
} from "App/Interfaces/CreatePlanActionInterfaces";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";
import { IActionPlanFilters, IActionPlanFiltersPaginated } from "../ActionPlanInterface";


export interface IPlanActionRepository {
  createPAI(
    pai: ICreatePlanAction,
    trx: TransactionClientContract
  ): Promise<ICreatePlanAction>;
  updatePAI(
    pai: ICreatePlanAction,
    id: number,
    trx: TransactionClientContract
  ): Promise<ICreatePlanAction | null>;
  getPAIById(
    id: number
  ): Promise<ICreatePlanAction | null>;
  getAllStatus(): Promise<MasterTable[]>;
  getActionPlanByFilters(filters: IActionPlanFilters): Promise<ICreatePlanAction[]>;
  getActionPlanPaginated(filters: IActionPlanFiltersPaginated): Promise<IPagingData<ICreatePlanAction>>;
}

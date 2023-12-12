import {
  ICreatePlanAction
} from "App/Interfaces/CreatePlanActionInterfaces";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";


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
}

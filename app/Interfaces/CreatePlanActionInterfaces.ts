import { DateTime } from "luxon";
import { IIndicatorsPAITemp } from "./IndicatorsPAIInterfaces";

export interface ICreatePlanAction {
  id?: number;
  yearPAI?: number;
  budgetPAI?: number;
  typePAI?: number;
  namePAI?: number;
  objectivePAI?: string;
  articulationPAI?: string;
  linePAI?: ILine[];
  risksPAI?: IRisks[];
  selectedRisk?: number;
  actionsPAi?: IAddAction[];
  dateCreate?: DateTime | null;
  dateModify?: Date | null;
  version?: string | null;
  status: number;
  user: string;
  revision?: IRevisionPAI[];
}

export interface IAddAction {
  id?: number;
  action?: number;
  description: string;
  indicators?: IIndicatorsPAITemp[];
}

export interface ILine {
  id?: number;
  line: string;
}

export interface IRisks {
  id?: number;
  risk: string;
}

export interface IActionPlanTemp {
  id?: number;
  user: string;
  yearPAI: number;
  budgetPAI: number;
  typePAI: number;
  namePAI: number;
  objectivePAI: string;
  articulationPAI: string;
  linePAI: ILine;
  risksPAI: IRisks;
}

export interface IRevisionPAI {
  id?: number;
  idPai: number;
  json?: string;
  completed: boolean;
  version: number;
  userCreate: string;
  dateCreate?: DateTime;
}
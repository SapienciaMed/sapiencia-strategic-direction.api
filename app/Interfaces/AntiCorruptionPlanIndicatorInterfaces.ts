export interface IAntiCorruptionPlanIndicator {
  id: number,
  description: string,
  pac_id: number,
}

export interface IAntiCorruptionPlanIndicatorTemp {
  id?: number,
  description?: string,
  acpa_uuid: string,
  uuid: string,
  quarterly_goal1: number,
  quarterly_goal2: number,
  quarterly_goal3: number,
  unit1: string,
  unit2: string,
  unit3: string,
  pac_id?: number,
}

export interface IStore {
  indicators: IAntiCorruptionPlanIndicatorTemp[];
  plan_id: number;
}

export interface IAntiCorruptionPlanIndicatorPaginated {
  nameOrCode: string;
  excludeIds?: number[];
  page: number;
  perPage: number;
}

export interface IAntiCorruptionPlanIndicatorFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

export interface IAntiCorruptionPlanIndicatorFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

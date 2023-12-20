export interface IAntiCorruptionPlan {
  id: number,
  name: string,
  date?: string,
  status: number
}

export interface IAntiCorruptionPlanTemp {
  id?: number,
  name: string,
  date?: string,
  status: number,
}

export interface IAntiCorruptionPlanPaginated {
  nameOrCode: string;
  excludeIds?: number[];
  page: number;
  perPage: number;
}

export interface IAntiCorruptionPlanFiltersPaginated {
  page: number;
  perPage: number;
  name?: string;
  status?: number;
}

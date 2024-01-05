export interface IAntiCorruptionPlan {
  uuid: string;
  id: number,
  name: string,
  date: string,
  status: number
  year: string;
}

export interface IAntiCorruptionPlanTemp {
  uuid: string;
  name: string,
  date: string,
  status: number,
  year: string;
  id?: number,
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

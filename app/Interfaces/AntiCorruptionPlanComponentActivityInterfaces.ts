export interface IAntiCorruptionPlanComponentActivity {
  id: number,
  description: string,
  pac_id: number,
}

export interface IAntiCorruptionPlanComponentActivityTemp {
  id?: number,
  description?: string,
  cpac_uuid: string,
  uuid: string,
  pac_id?: number,
}

export interface IStore {
  activities: IAntiCorruptionPlanComponentActivityTemp[];
  plan_id: number;
}

export interface IAntiCorruptionPlanComponentActivityPaginated {
  nameOrCode: string;
  excludeIds?: number[];
  page: number;
  perPage: number;
}

export interface IAntiCorruptionPlanComponentActivityFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

export interface IAntiCorruptionPlanComponentActivityFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

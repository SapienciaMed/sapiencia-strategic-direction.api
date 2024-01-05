export interface IAntiCorruptionPlanComponent {
  id: number,
  description: string,
  uuid: string,
  pac_id: number,
}

export interface IAntiCorruptionPlanComponentTemp {
  id?: number;
  description?: string;
  uuid: string;
  pac_id?: number;
}

export interface IStore {
  components: IAntiCorruptionPlanComponentTemp[];
  plan_id: number;
  plan_uuid: string
}

export interface IAntiCorruptionPlanComponentPaginated {
  nameOrCode: string;
  excludeIds?: number[];
  page: number;
  perPage: number;
}

export interface IAntiCorruptionPlanComponentFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

export interface IAntiCorruptionPlanComponentFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

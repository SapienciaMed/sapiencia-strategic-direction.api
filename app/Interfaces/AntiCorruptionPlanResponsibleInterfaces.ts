export interface IAntiCorruptionPlanResponsible {
  id: number,
  description: string,
  pac_id: number,
}

export interface IAntiCorruptionPlanResponsibleTemp {
  id?: number,
  description?: string,
  ipa_uuid: string,
  uuid: string,
  pac_id?: number,
}

export interface IStore {
  responsibles: IAntiCorruptionPlanResponsibleTemp[];
  plan_id: number;
}

export interface IAntiCorruptionPlanResponsiblePaginated {
  nameOrCode: string;
  excludeIds?: number[];
  page: number;
  perPage: number;
}

export interface IAntiCorruptionPlanResponsibleFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

export interface IAntiCorruptionPlanResponsibleFiltersPaginated {
  page: number;
  perPage: number;
  description?: string;
}

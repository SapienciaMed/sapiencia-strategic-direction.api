export interface IAntiCorruptionPlanDescription {
  id: number,
  description: string,
  active: boolean,
  order: number
}

export interface IAntiCorruptionPlanDescriptionTemp {
  id?: number,
  description: string,
  active: boolean,
  order: number
}

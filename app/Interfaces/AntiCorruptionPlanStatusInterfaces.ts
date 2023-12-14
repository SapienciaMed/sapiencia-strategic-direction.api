export interface IAntiCorruptionPlanStatus {
  id: number,
  description: string,
  active: boolean,
  order: number
}

export interface IAntiCorruptionPlanStatusTemp {
  id?: number,
  description: string,
  active: boolean,
  order: number
}

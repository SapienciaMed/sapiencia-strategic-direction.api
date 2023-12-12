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

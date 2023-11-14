export interface IImpactLevel {
  id: number,
  description: string,
  active: boolean,
  order: number
}

export interface IImpactLevelTemp {
  id?: number,
  description: string,
  active: boolean,
  order: number
}

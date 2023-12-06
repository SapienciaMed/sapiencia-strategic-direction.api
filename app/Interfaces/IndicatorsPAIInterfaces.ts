
export interface IIndicatorsPAI {
    id?: number;
    projectIndicator?: number;
    indicatorType: number;
    indicatorDesc?: string;
    bimesters: IBimester[];
    totalPlannedGoal: number;
    products: IProducts[];
    responsibles: IResponsible[];
    coresponsibles: ICoResponsible[];
}

export interface IBimester {
    bimester?: string;
    value?: number;
}

export interface IProducts {
    id?: number;
    product: string;
}

export interface IResponsible {
    id?: number;
    responsible: string;
}

export interface ICoResponsible {
    id?: number;
    coresponsible: string;
}
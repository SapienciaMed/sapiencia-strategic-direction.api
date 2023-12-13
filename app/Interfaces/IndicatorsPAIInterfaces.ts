
export interface IIndicatorsPAI {
    id?: number;
    projectIndicator?: number;
    indicatorType: number;
    indicatorDesc?: string;
    totalPlannedGoal: number;
    products: IProducts[];
    responsibles: IResponsible[];
    coresponsibles: ICoResponsible[];
}

export interface IIndicatorsPAITemp extends IIndicatorsPAI{
    bimesters: IBimester[];
}

export interface IBimester {
    id?: number;
    bimester?: string;
    value?: number;
    disaggregate?: IDisaggregate[];
    showDisaggregate?: number;
    sumOfPercentage?: number;
}

export interface IDisaggregate {
    id?: number;
    percentage: number,
    description?: string;
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
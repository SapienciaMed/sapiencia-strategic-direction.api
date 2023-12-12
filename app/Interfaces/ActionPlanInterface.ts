

export interface IActionPlanFiltersPaginated {
    page: number;
    perPage: number;
    yearPAI?: number;
    namePAI?: string;
    status?: number;
  }

export interface IActionPlanFilters {
    idList?: number[];
    codeList?: string[];
    status?: boolean;
  }
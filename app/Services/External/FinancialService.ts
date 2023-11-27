import { IBudgets } from "App/Interfaces/BudgetsInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";

export interface IFinancialExternalService {
  getAllBudgets(): Promise<ApiResponse<IBudgets[]>>;
}

export default class FinancialExternalService implements IFinancialExternalService {
    private apiFinancial: AxiosInstance;
    private baseURL = `${process.env.URL_API_FINANCIAL}/api/v1/budgets`;
  
    constructor() {
      this.apiFinancial = axios.create({
        baseURL: this.baseURL,
      });
    }
  
    public async getAllBudgets(): Promise<ApiResponse<IBudgets[]>> {
        try {
          const response = await this.apiFinancial.get<ApiResponse<IBudgets[]>>(
            `/get-all`,
            {
                headers: {
                  authorization: process.env.CURRENT_AUTHORIZATION,  
                  Permissions: process.env.CURRENT_PERMISSIONS,
                },
              }
          );
          return response.data;
        } catch (error) {
          console.error("Error al llamar a getAllBudgets:", error);
          // Puedes lanzar un error personalizado o manejarlo según tus necesidades
          throw new Error("Error al obtener presupuestos desde la API financiera");
        }
      }
  
}

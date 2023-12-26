import {IAntiCorruptionPlanComponent, IAntiCorruptionPlanComponentPaginated, IAntiCorruptionPlanComponentTemp } from "App/Interfaces/AntiCorruptionPlanComponentInterfaces";
import { IAntiCorruptionPlanComponentRepository } from "App/Repositories/AntiCorruptionPlanComponentRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";

export interface IAntiCorruptionPlanComponentService {
  getAntiCorruptionPlanComponent(): Promise<ApiResponse<IAntiCorruptionPlanComponent[]>>;
  getAntiCorruptionPlanComponentById(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponent>>;
  getAntiCorruptionPlanComponentByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponent[]>>;
  deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>>;
  store(components: IAntiCorruptionPlanComponentTemp[], trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentTemp[]>>;
  createAntiCorruptionPlanComponent(AntiCorruptionPlanComponent: IAntiCorruptionPlanComponentTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponent>>;
  updateAntiCorruptionPlanComponent(AntiCorruptionPlanComponent: IAntiCorruptionPlanComponentTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponent>>;
  getAntiCorruptionPlanComponentPaginated(filters: IAntiCorruptionPlanComponentPaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanComponent>>>;
}

export default class AntiCorruptionPlanComponentService implements IAntiCorruptionPlanComponentService {
  constructor(
    private AntiCorruptionPlanComponenttRepository: IAntiCorruptionPlanComponentRepository,
  ) {}

  async getAntiCorruptionPlanComponentPaginated(filters: IAntiCorruptionPlanComponentPaginated): Promise<ApiResponse<IPagingData<IAntiCorruptionPlanComponent>>> {
    const res = await this.AntiCorruptionPlanComponenttRepository.getAntiCorruptionPlanComponentPaginated(filters);
    return new ApiResponse(res, EResponseCodes.OK)
  }

  async getAntiCorruptionPlanComponent(): Promise<ApiResponse<IAntiCorruptionPlanComponent[]>> {
    const res = await this.AntiCorruptionPlanComponenttRepository.getAntiCorruptionPlanComponent();

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponent[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAntiCorruptionPlanComponentById(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponent>> {
    const res = await this.AntiCorruptionPlanComponenttRepository.getAntiCorruptionPlanComponentById(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponent,
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
  async getAntiCorruptionPlanComponentByPlanId(id: number): Promise<ApiResponse<IAntiCorruptionPlanComponent[]>> {
    const res = await this.AntiCorruptionPlanComponenttRepository.getAntiCorruptionPlanComponentByPlanId(id);

    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponent[],
        EResponseCodes.FAIL,
        "Registro no encontrado"
      );
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  async createAntiCorruptionPlanComponent(AntiCorruptionPlanComponentt: IAntiCorruptionPlanComponentTemp, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponent>> {
    const AntiCorruptionPlanComponenttCreate = await this.AntiCorruptionPlanComponenttRepository.createAntiCorruptionPlanComponent(AntiCorruptionPlanComponentt, trx);
    return new ApiResponse(AntiCorruptionPlanComponenttCreate, EResponseCodes.OK);
  }

  async deleteAllByIds(ids: string[], trx: TransactionClientContract): Promise<ApiResponse<string[]>> {
    const AntiCorruptionPlanComponenttCreate = await this.AntiCorruptionPlanComponenttRepository.deleteAllByIds(ids, trx);
    return new ApiResponse(AntiCorruptionPlanComponenttCreate, EResponseCodes.OK);
  }

  async store(components: IAntiCorruptionPlanComponentTemp[], trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponentTemp[]>> {
    const AntiCorruptionPlanComponenttCreate = await this.AntiCorruptionPlanComponenttRepository.store(components, trx);
    return new ApiResponse(AntiCorruptionPlanComponenttCreate, EResponseCodes.OK);
  }

  async updateAntiCorruptionPlanComponent(AntiCorruptionPlanComponentt: IAntiCorruptionPlanComponentTemp, id: number, trx: TransactionClientContract): Promise<ApiResponse<IAntiCorruptionPlanComponent>> {
    const res = await this.AntiCorruptionPlanComponenttRepository.updateAntiCorruptionPlanComponent(AntiCorruptionPlanComponentt, id, trx);
    if (!res) {
      return new ApiResponse(
        {} as IAntiCorruptionPlanComponent,
        EResponseCodes.FAIL,
        "El registro indicado no existe"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }
}

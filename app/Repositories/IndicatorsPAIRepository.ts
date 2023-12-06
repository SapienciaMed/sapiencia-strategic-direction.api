import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import IndicatorsPAI from "App/Models/PAIIndicators";
import ProductsPAI from "App/Models/PAIProducts";
import ResponsiblesPAI from "App/Models/PAIResponsibles";
import CoResponsiblesPAI from "App/Models/PAICoResponsibles";
import { ICoResponsible, 
         IIndicatorsPAI, 
         IProducts, 
         IResponsible } from "App/Interfaces/IndicatorsPAIInterfaces";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import PAIIndicatorType from "App/Models/PAIIndicatorType";

export interface IIndicatorsPAIRepository {
    createIndicator(
      indicators: IIndicatorsPAI[], 
      idPAI: number, 
      trx?: TransactionClientContract
    ): Promise<IIndicatorsPAI[]>;
    createProduct( 
      products: IProducts[], 
      idIndicator: number,
      trx?: TransactionClientContract
    ): Promise<IProducts[]>;
    createResponsible( 
      responsibles: IResponsible[], 
      idIndicator: number,
      trx?: TransactionClientContract
    ): Promise<IResponsible[]>;
    createCoResponsible( 
      coresponsibles: ICoResponsible[], 
      idIndicator: number,
      trx?: TransactionClientContract
    ): Promise<ICoResponsible[]>;
    getPaiIndicatorsType(): Promise<MasterTable[] | null>;
}

export default class IndicatorsPAIRepository implements IIndicatorsPAIRepository {

    async getPaiIndicatorsType(): Promise<MasterTable[] | null> {
      const res = await PAIIndicatorType.query().orderBy('id', 'asc');
      return res || null;
    }
    async createIndicator(
      indicators: IIndicatorsPAI[],
      idPAI: number, 
      trx: TransactionClientContract
    ): Promise<IIndicatorsPAI[]> {
        const indicatorsCreate: IIndicatorsPAI[] = [];
        let products: IProducts[] | [];
        let responsibles: IResponsible[] | [];
        let coresponsibles: ICoResponsible[] | [];
        for (let index in indicators) {
          const indicator = indicators[index];
          const toCreate = new IndicatorsPAI();
          toCreate.actionId = idPAI;
          if(toCreate.projectIndicator){
            toCreate.projectIndicator = indicator.projectIndicator || 0;
          }
          if(toCreate.indicatorDesc){
            toCreate.indicatorDesc = indicator.indicatorDesc || "";
          }
          toCreate.indicatorType = indicator.indicatorType;
          toCreate.firstBimester = indicator.bimesters.at(0)?.value || 0;
          toCreate.secondBimester = indicator.bimesters.at(1)?.value || 0;
          toCreate.thirdBimester = indicator.bimesters.at(2)?.value || 0;
          toCreate.fourthBimester = indicator.bimesters.at(3)?.value || 0;
          toCreate.fifthBimester = indicator.bimesters.at(4)?.value || 0;
          toCreate.sixthBimester = indicator.bimesters.at(5)?.value || 0;
          toCreate.totalPlannedGoal = indicator.totalPlannedGoal;
          toCreate.useTransaction(trx);
          await toCreate.save();
          if(indicator?.products && toCreate?.id){
            products = await this.createProduct(indicator?.products,toCreate.id,trx);
          }
          if(indicator?.responsibles && toCreate?.id){
            responsibles = await this.createResponsible(indicator?.responsibles,toCreate.id,trx);
          }
          if(indicator?.coresponsibles && toCreate?.id){
            coresponsibles = await this.createCoResponsible(indicator?.coresponsibles,toCreate.id,trx);
          }
          indicatorsCreate.push({ 
            ...toCreate.serialize() as IIndicatorsPAI,
            products: products!,
            responsibles: responsibles!,
            coresponsibles: coresponsibles!,
          });
        }
        return indicatorsCreate;
    }

    async createProduct(
      products: IProducts[],
      idIndicator: number, 
      trx: TransactionClientContract
    ): Promise<IProducts[]> {
        const productsCreate: IProducts[] = [];
        for (let index in products) {
          const product = products[index];
          const toCreate = new ProductsPAI();
          toCreate.idIndicatorPAI = idIndicator;
          toCreate.product = product.product;
          toCreate.useTransaction(trx);
          await toCreate.save();
          productsCreate.push({ ...toCreate.serialize() as IProducts });
        }
        return productsCreate;
    }

    async createResponsible(
      products: IResponsible[],
      idIndicator: number, 
      trx: TransactionClientContract
    ): Promise<IResponsible[]> {
        const productsCreate: IResponsible[] = [];
        for (let index in products) {
          const responsible = products[index];
          const toCreate = new ResponsiblesPAI();
          toCreate.idIndicatorPAI = idIndicator;
          toCreate.responsible = responsible.responsible;
          toCreate.useTransaction(trx);
          await toCreate.save();
          productsCreate.push({ ...toCreate.serialize() as IResponsible });
        }
        return productsCreate;
    }

    async createCoResponsible(
      products: ICoResponsible[],
      idIndicator: number, 
      trx: TransactionClientContract
    ): Promise<ICoResponsible[]> {
        const productsCreate: ICoResponsible[] = [];
        for (let index in products) {
          const coresponsible = products[index];
          const toCreate = new CoResponsiblesPAI();
          toCreate.idIndicatorPAI = idIndicator;
          toCreate.coresponsible = coresponsible.coresponsible;
          toCreate.useTransaction(trx);
          await toCreate.save();
          productsCreate.push({ ...toCreate.serialize() as ICoResponsible });
        }
        return productsCreate;
    }

}
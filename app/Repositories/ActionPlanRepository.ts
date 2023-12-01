import {ICreatePlanAction} from "App/Interfaces/CreatePlanActionInterfaces";
  import ActionPlan from "../Models/ActionPlan";
  import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
  import { DateTime } from "luxon";
  import { IPlanActionRepository } from "App/Interfaces/repositories/IActionPlanRepository";

  
  export default class PlanActionRepository implements IPlanActionRepository {
    
  
    async createPAI(
      pai: ICreatePlanAction,
      trx: TransactionClientContract
    ): Promise<ICreatePlanAction> {
      const toCreate = new ActionPlan();
      toCreate.user = pai.user;
  
      const query = ActionPlan.query();
  
      if (pai?.id) {
        const existingPai = await query.where("id", pai?.id)
          .limit(1);
        if (existingPai && existingPai.length > 0 ) {
          throw new Error("Ya existe un plan de acción institucional con este id.");
        }
        toCreate.dateModify = DateTime.local().toJSDate();
        toCreate.id = pai.id;
       }

       if (pai?.yearPAI) {
          toCreate.yearPAI = pai.yearPAI;
       }
       if (pai?.budgetPAI) {
        toCreate.budgetPAI = pai.budgetPAI;
       }
       if (pai?.typePAI) {
        toCreate.typePAI = pai.typePAI;
       }
       if (pai?.namePAI) {
        toCreate.namePAI = pai.namePAI;
       }
       if (pai?.objectivePAI) {
        toCreate.objectivePAI = pai.objectivePAI;
       }
       if (pai?.articulationPAI) {
        toCreate.articulationPAI = pai.articulationPAI;
       }
    const childrens = pai.linePAI;
       if(childrens) {
                for(let children in childrens) {
                    await toCreate.related("articulationPAi").create({
                        description: childrens[children].line,
                        idPai: toCreate.id
                    })
                }
            }

    const childrensRisks = pai.risksPAI;
       if(childrensRisks) {
                for(let children in childrensRisks) {
                    await toCreate.related("riskAsociate").create({
                        description: childrensRisks[children].risk,
                        idPai: toCreate.id
                    })
                }
            }
            
  
      toCreate.useTransaction(trx);
      await toCreate.save();
      return toCreate.serialize() as ICreatePlanAction;
    }
  
    async updatePAI(
      pai: ICreatePlanAction,
      id: number,
      trx: TransactionClientContract
    ): Promise<ICreatePlanAction | null> {
      const toUpdate = await ActionPlan.find(id);
      if (!toUpdate) {
        return null;
      }
  
      const query = ActionPlan.query();
  
      if (pai?.id && toUpdate.$attributes.id != pai?.id) {
        const existingPai= await query.where("id", pai?.id);
        if (existingPai) throw new Error("Ya existe un proyecto con este id.");
        toUpdate.id = pai.id;
      }
  
      toUpdate.user = pai.user;
      if (pai?.yearPAI) {
        toUpdate.yearPAI = pai.yearPAI;
     }
     if (pai?.budgetPAI) {
        toUpdate.budgetPAI = pai.budgetPAI;
     }
     if (pai?.typePAI) {
        toUpdate.typePAI = pai.typePAI;
     }
     if (pai?.namePAI) {
      toUpdate.namePAI = pai.namePAI;
     }
     if (pai?.objectivePAI) {
        toUpdate.objectivePAI = pai.objectivePAI;
     }
     if (pai?.articulationPAI) {
        toUpdate.articulationPAI = pai.articulationPAI;
     }
  
      toUpdate.dateModify = DateTime.local().toJSDate();
     
      toUpdate.useTransaction(trx);
  
      await toUpdate.save();
      return toUpdate.serialize() as ICreatePlanAction;
    }
  }
  
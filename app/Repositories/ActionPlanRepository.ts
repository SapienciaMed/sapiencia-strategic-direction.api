import { ICreatePlanAction } from "App/Interfaces/CreatePlanActionInterfaces";
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
      if (existingPai && existingPai.length > 0 && (pai?.status !== 2 && pai?.status !== 3)) {
        throw new Error("Ya existe un plan de acción institucional con este id.");
      }
      // const updatedVersion: string = pai.status === 2 ? "1.0" : this.updatePaiVersion(existingPai[0]?.version);
      // toCreate.version = updatedVersion;
      // toCreate.dateModify = DateTime.local().toJSDate();
      // toCreate.id = pai.id;
    }
    const updatedVersion: string = pai.status === 2 ? "1.0" : "";
    toCreate.version = updatedVersion;


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
    if (pai?.status !== undefined) {
      toCreate.status = pai.status;
    }

    const childrens = pai.linePAI;
    if (childrens) {
      for (let children in childrens) {
        await toCreate.related("linePAI").create({
          line: childrens[children].line,
          idPai: toCreate.id
        })
      }
    }

    const childrensRisks = pai.risksPAI;
    if (childrensRisks) {
      for (let children in childrensRisks) {
        await toCreate.related("risksPAI").create({
          risk: childrensRisks[children].risk,
          idPai: toCreate.id
        })
      }
    }
    const childrensActions = pai.actionsPAi;
    if (childrensActions) {
      for (let children in childrensActions) {
        await toCreate.related("actionPAI").create({
          description: childrensActions[children].description,
          action: childrensActions[children].action,
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
      const existingPai = await query.where("id", pai?.id);
      if (existingPai) throw new Error("Ya existe un proyecto con este id.");
      toUpdate.id = pai.id;
    }

    if (pai?.status !== undefined) {
      toUpdate.status = pai.status;
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
    if (pai.status === 2) {
      const updatedVersion = Number(toUpdate.version.split(".")[0]);
      toUpdate.version = `${updatedVersion + 1}.0`;
    } else {
      const updatedVersion: string = this.updatePaiVersion(toUpdate.version);
      toUpdate.version = updatedVersion;
    }
    toUpdate.useTransaction(trx);

    await toUpdate.save();
    return toUpdate.serialize() as ICreatePlanAction;
  }

  private updatePaiVersion(version: string = "0.0"): string {
    const [major, minor] = version.split('.').map(Number);
    const newMinor = minor + 1;
    const newVersion = newMinor + major < 11 ? `${major}.${0}${newMinor}` : `${major}.${newMinor}`;
    return newVersion;
  }

  async getPAIById(id: number): Promise<ICreatePlanAction | null> {
    const res = await ActionPlan.find(id);
    await res?.load("revision");
    await res?.load("risksPAI");
    await res?.load("linePAI");
    return res && res.serialize() as ICreatePlanAction || null;
  }
}

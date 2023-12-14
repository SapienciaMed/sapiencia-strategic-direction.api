import { ICreatePlanAction } from "App/Interfaces/CreatePlanActionInterfaces";
import ActionPlan from "../Models/ActionPlan";

import ActionPlanStates from "../Models/ActionPlanStates"
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { DateTime } from "luxon";
import { IPlanActionRepository } from "App/Interfaces/repositories/IActionPlanRepository";
import IndicatorsPAI from "App/Models/PAIIndicators";
import { IBimester, ICoResponsible, IDisaggregate, IIndicatorsPAITemp, IProducts, IResponsible } from "App/Interfaces/IndicatorsPAIInterfaces";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import ActionPAI from "App/Models/ActionPAI";
import { IPagingData } from "App/Utils/ApiResponses";
import { IActionPlanFilters, IActionPlanFiltersPaginated } from "App/Interfaces/ActionPlanInterface";
import BimestersPAI from "App/Models/PAIBimesters";


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

    const createIndicator = async (
      parentAction: ActionPAI, 
      indicator: IIndicatorsPAITemp
    ) => {
      return await parentAction.related("indicators").create({
        projectIndicator: indicator.projectIndicator,
        indicatorType: indicator.indicatorType,
        indicatorDesc: indicator.indicatorDesc,
        totalPlannedGoal: indicator.totalPlannedGoal,
      });
    };

    const createBimesters = async (
      parentIndicator: IndicatorsPAI, 
      bimesters: IBimester[]
    ) => {
      for (const bimester of bimesters) {
        const createBimester = await parentIndicator.related("bimesters").create({
          bimester: bimester.bimester,
          value: bimester.value,
          showDisaggregate: bimester.showDisaggregate,
          sumOfPercentage: bimester.sumOfPercentage
        });

        const disaggregate = bimester.disaggregate;
        if(disaggregate) await createDisaggregate(createBimester,disaggregate);
      }
    };
    
    const createDisaggregate = async (
      parentBimester: BimestersPAI, 
      disaggregates: IDisaggregate[]
    ) => {
      for (const disaggregate of disaggregates) {
        await parentBimester.related("disaggregate").create({
          percentage: disaggregate.percentage,
          description: disaggregate.description
        });
      }
    };

    const createProducts = async (
      parentIndicator: IndicatorsPAI, 
      products: IProducts[]
    ) => {
      for (const product of products) {
        await parentIndicator.related("products").create({
          product: product.product,
        });
      }
    };
    
    const createResponsibles = async (
      parentIndicator: IndicatorsPAI, 
      responsibles: IResponsible[]
    ) => {
      for (const responsible of responsibles) {
        await parentIndicator.related("responsibles").create({
          responsible: responsible.responsible,
        });
      }
    };
    
    const createCoresponsibles = async (
      parentIndicator: IndicatorsPAI, 
      coresponsibles: ICoResponsible[]
    ) => {
      for (const coresponsible of coresponsibles) {
        await parentIndicator.related("coresponsibles").create({
          coresponsible: coresponsible.coresponsible,
        });
      }
    };

    const childrensActions = pai.actionsPAi;

    if (childrensActions) {
      for (const action of childrensActions) {
        const createdAction = await toCreate.related("actionsPAi").create({
          description: action.description,
          action: action.action,
          idPai: toCreate.id,
        });

        const indicators = action.indicators;

        if (indicators) {
          for (const indicator of indicators) {
            const createdIndicator = await createIndicator(createdAction, indicator);
            const products = indicator.products;
            const responsibles = indicator.responsibles;
            const coresponsibles = indicator.coresponsibles;
            const bimesters = indicator.bimesters;

            if(bimesters) await createBimesters(createdIndicator,bimesters);
            if (products) await createProducts(createdIndicator, products);
            if (responsibles) await createResponsibles(createdIndicator, responsibles);
            if (coresponsibles) await createCoresponsibles(createdIndicator, coresponsibles);
          }
        }
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
    await res?.load("actionsPAi", (actionsQuery) => {
      actionsQuery.preload("indicators", (indicatorsQuery) => {
        indicatorsQuery.preload("products");
        indicatorsQuery.preload("responsibles");
        indicatorsQuery.preload("coresponsibles");
        indicatorsQuery.preload("bimesters",(bimestersQuery)=>{
          bimestersQuery.preload("disaggregate")
        });
      });
    })
    return res && res.serialize() as ICreatePlanAction || null;
  }

  async getAllStatus(): Promise<MasterTable[]> {
    const res = await ActionPlanStates.query().orderBy('PAI_ORDEN', 'asc');
    return res.map((i) => i.serialize() as MasterTable);
  }

  async getActionPlanPaginated(filters: IActionPlanFiltersPaginated): Promise<IPagingData<ICreatePlanAction>> {
    const query = ActionPlan.query()
      .where(
        "PAI_VERSION",
        "=",
        ActionPlan.query()
          .max('PAI_VERSION')
          .from("PAI_PLAN_ACCION_INSTITUCIONAL as p2")
          .whereRaw('p2.PAI_CODIGO = PAI_PLAN_ACCION_INSTITUCIONAL.PAI_CODIGO')
          .groupBy("PAI_CODIGO")
      )
      .distinct()
      //.orderBy('PAI_ESTADO_PLAN', 'asc')
      .orderBy('PAI_FECHA_CREO', 'desc');

    if (filters.yearPAI) {
      query.where("yearPAI", filters.yearPAI);
    }

    if (filters.namePAI) {
      query.where("namePAI", filters.namePAI);
    }

    if (filters.status) {
      query.where("status", filters.status);
    }

    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as ICreatePlanAction[],
      meta,
    };
  }

  async getActionPlanByFilters(filters: IActionPlanFilters): Promise<ICreatePlanAction[]> {
    const query = ActionPlan.query();

    if (filters.codeList) {
      query.whereIn("bpin", filters.codeList);
    }

    if (filters.idList) {
      query.whereIn("id", filters.idList);
    }

    if (filters.status) {
      query.where("status", filters.status);
    }
    const res = await query;

    return res.map((i) => i.serialize() as ICreatePlanAction);
  }
}

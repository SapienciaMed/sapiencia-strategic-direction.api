import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import { IIndicator } from "App/Interfaces/ProjectInterfaces";
import IndicatorDNP from "App/Models/IndicatorDNP";
import IndicatorName from "App/Models/IndicatorName";
import IndicatorType from "App/Models/IndicatorType";
import IndicatorsAction from "App/Models/IndicatorsAction";
import IndicatorsComponent from "App/Models/IndicatorsComponent";
import IndicatorsIndicative from "App/Models/IndicatorsIndicative";
import Programation from "App/Models/Programation";
import StrategicLine from "App/Models/StrategicLine";
export interface IProjectIndicators {
  indicatorsIndicative: IndicatorsIndicative[];
  indicatorsAction: IndicatorsAction[];
}
export interface IIndicatorsRepository {
  getIndicatorDNP(): Promise<MasterTable[] | null>;
  getIndicatorName(): Promise<MasterTable[] | null>;
  getStrategicLine(): Promise<MasterTable[] | null>;
  getIndicatorType(): Promise<MasterTable[] | null>;
  getProgramation(): Promise<MasterTable[] | null>;
  getIndicatorsComponent(): Promise<MasterTable[] | null>;
  getProjectIndicators(idProject: number): Promise<IProjectIndicators | null>;
  createIndicators(indicators: IIndicator[], idProject: number, trx: TransactionClientContract): Promise<IIndicator[]>;
  updateIndicators(indicators: IIndicator[], idProject: number, trx: TransactionClientContract): Promise<IIndicator[]>;
}

export default class IndicatorsRepository implements IIndicatorsRepository {
  async getIndicatorDNP(): Promise<MasterTable[] | null> {
    const res = await IndicatorDNP.query().orderBy('id', 'asc');
    return res || null;
  }

  async getIndicatorName(): Promise<MasterTable[] | null> {
    const res = await IndicatorName.query().orderBy('id', 'asc');
    return res || null;
  }

  async getStrategicLine(): Promise<MasterTable[] | null> {
    const res = await StrategicLine.query().orderBy('id', 'asc');
    return res || null;
  }

  async getIndicatorType(): Promise<MasterTable[] | null> {
    const res = await IndicatorType.query().orderBy('id', 'asc');
    return res || null;
  }

  async getProgramation(): Promise<MasterTable[] | null> {
    const res = await Programation.query().orderBy('id', 'asc');
    return res || null;
  }

  async getIndicatorsComponent(): Promise<MasterTable[] | null> {
    const res = await IndicatorsComponent.query().orderBy('id', 'asc');
    return res || null;
  }

  async getProjectIndicators(idProject: number): Promise<IProjectIndicators | null> {
    const indicatorsIndicative = await IndicatorsIndicative.query().where("idProject", idProject);
    const indicatorsAction = await IndicatorsAction.query().where("idProject", idProject);
    return { indicatorsIndicative: indicatorsIndicative, indicatorsAction: indicatorsAction } || null;
  }

  async createIndicators(indicators: IIndicator[], idProject: number, trx: TransactionClientContract): Promise<IIndicator[]> {
    const indicatorsCreate: IIndicator[] = [];
    for (let indicatorIndex in indicators) {
      if (indicators[indicatorIndex].type !== 3) {
        const indicator = indicators[indicatorIndex];
        const toCreate = new IndicatorsIndicative();
        toCreate.idProject = idProject;
        toCreate.type = indicator.type;
        if(indicator.line) {
          toCreate.line = indicator.line;
        }
        if(indicator.component) {
          toCreate.component = indicator.component;
        }
        if(indicator.program) {
          toCreate.program = indicator.program;
        }
        if(indicator.indicator) {
          toCreate.indicator = indicator.indicator;
        }
        if(indicator.developmentPlan) {
          toCreate.developmentPlan = indicator.developmentPlan;
        }
        toCreate.productMGA = indicator.productMGA;
        toCreate.measurement = indicator.measurement;
        toCreate.year0 = indicator.year0;
        toCreate.year1 = indicator.year1;
        toCreate.year2 = indicator.year2;
        toCreate.year3 = indicator.year3;
        toCreate.year4 = indicator.year4;
        toCreate.useTransaction(trx);
        await toCreate.save();
        indicatorsCreate.push({ ...toCreate.serialize() as IIndicator, type: indicator.type });
      } else {
        const indicator = indicators[indicatorIndex];
        const toCreate = new IndicatorsAction();
        toCreate.idProject = idProject;
        toCreate.type = indicator.type;
        if(indicator.objective) {
          toCreate.objective = indicator.objective;
        }
        if(indicator.dpnIndicator) {
          toCreate.dpnIndicator = indicator.dpnIndicator;
        }
        if(indicator.dpn) {
          toCreate.dpn = indicator.dpn;
        }
        if(indicator.staticValueCode) {
          toCreate.staticValueCode = indicator.staticValueCode.toString();
        }
        if(indicator.staticValue) {
          toCreate.staticValue = indicator.staticValue.toString();
        }
        if(indicator.total) {
          toCreate.total = indicator.total;
        }
        toCreate.productMGA = indicator.productMGA;
        toCreate.measurement = indicator.measurement;
        toCreate.year0 = indicator.year0;
        toCreate.year1 = indicator.year1;
        toCreate.year2 = indicator.year2;
        toCreate.year3 = indicator.year3;
        toCreate.year4 = indicator.year4;
        toCreate.useTransaction(trx);
        await toCreate.save();
        indicatorsCreate.push({ ...toCreate.serialize() as IIndicator, type: indicator.type });
      }
    }
    return indicatorsCreate;
  }

  async updateIndicators(indicators: IIndicator[], idProject: number, trx: TransactionClientContract): Promise<IIndicator[]> {
    await IndicatorsIndicative.query().where("idProject", idProject).delete().useTransaction(trx);
    await IndicatorsAction.query().where("idProject", idProject).delete().useTransaction(trx);
    const indicatorsCreate: IIndicator[] = [];
    for (let indicatorIndex in indicators) {
      if (indicators[indicatorIndex].type !== 3) {
        const indicator = indicators[indicatorIndex];
        const toCreate = new IndicatorsIndicative();
        toCreate.idProject = idProject;
        toCreate.type = indicator.type;
        if(indicator.line) {
          toCreate.line = indicator.line;
        }
        if(indicator.component) {
          toCreate.component = indicator.component;
        }
        if(indicator.program) {
          toCreate.program = indicator.program;
        }
        if(indicator.indicator) {
          toCreate.indicator = indicator.indicator;
        }
        if(indicator.developmentPlan) {
          toCreate.developmentPlan = indicator.developmentPlan;
        }
        toCreate.productMGA = indicator.productMGA;
        toCreate.measurement = indicator.measurement;
        toCreate.year0 = indicator.year0;
        toCreate.year1 = indicator.year1;
        toCreate.year2 = indicator.year2;
        toCreate.year3 = indicator.year3;
        toCreate.year4 = indicator.year4;
        toCreate.useTransaction(trx);
        await toCreate.save();
        indicatorsCreate.push({ ...toCreate.serialize() as IIndicator, type: indicator.type });
      } else {
        const indicator = indicators[indicatorIndex];
        const toCreate = new IndicatorsAction();
        toCreate.idProject = idProject;
        toCreate.type = indicator.type;
        if(indicator.objective) {
          toCreate.objective = indicator.objective;
        }
        if(indicator.dpnIndicator) {
          toCreate.dpnIndicator = indicator.dpnIndicator;
        }
        if(indicator.dpn) {
          toCreate.dpn = indicator.dpn;
        }
        if(indicator.staticValueCode) {
          toCreate.staticValueCode = indicator.staticValueCode.toString();
        }
        if(indicator.staticValue) {
          toCreate.staticValue = indicator.staticValue.toString();
        }
        if(indicator.total) {
          toCreate.total = indicator.total;
        }
        toCreate.productMGA = indicator.productMGA;
        toCreate.measurement = indicator.measurement;
        toCreate.year0 = indicator.year0;
        toCreate.year1 = indicator.year1;
        toCreate.year2 = indicator.year2;
        toCreate.year3 = indicator.year3;
        toCreate.year4 = indicator.year4;
        toCreate.useTransaction(trx);
        await toCreate.save();
        indicatorsCreate.push({ ...toCreate.serialize() as IIndicator, type: indicator.type });
      }
    }
    return indicatorsCreate;
  }
}

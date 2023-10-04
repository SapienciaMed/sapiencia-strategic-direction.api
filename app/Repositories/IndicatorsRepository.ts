import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import IndicatorDNP from "App/Models/IndicatorDNP";
import IndicatorName from "App/Models/IndicatorName";
import IndicatorType from "App/Models/IndicatorType";
import IndicatorsComponent from "App/Models/IndicatorsComponent";
import Programation from "App/Models/Programation";
import StrategicLine from "App/Models/StrategicLine";

export interface IIndicatorsRepository {
  getIndicatorDNP(): Promise<MasterTable[] | null>;
  getIndicatorName(): Promise<MasterTable[] | null>;
  getStrategicLine(): Promise<MasterTable[] | null>;
  getIndicatorType(): Promise<MasterTable[] | null>;
  getProgramation(): Promise<MasterTable[] | null>;
  getIndicatorsComponent(): Promise<MasterTable[] | null>;
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
}

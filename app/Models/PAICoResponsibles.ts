import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import IndicatorsPAI from "./PAIIndicators";

export default class CoResponsiblesPAI extends BaseModel {
    public static table = "CRP_CORRESPONSABLES_PAI";

    @column({ isPrimary: true, columnName: "CRP_COD", serializeAs: "id"})
    public id: number;

    @column({ columnName: "CRP_CORRESPONSABLE", serializeAs: "coresponsible"})
    public product: string

    @column({ columnName: "CRP_CODIDP_PAI", serializeAs: "idIndicatorPAI" })
    public idIndicatorPAI: number;

    @belongsTo(() => IndicatorsPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public indicatorCoResponsible: BelongsTo<typeof IndicatorsPAI>;

}
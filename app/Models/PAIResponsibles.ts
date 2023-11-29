import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import IndicatorsPAI from "./PAIIndicators";

export default class ResponsiblesPAI extends BaseModel {
    public static table = "RPP_RESPONSABLES_PAI";

    @column({ isPrimary: true, columnName: "RPP_COD", serializeAs: "id"})
    public id: number;

    @column({ columnName: "RPP_RESPONSABLE", serializeAs: "responsible"})
    public responsible: string

    @column({ columnName: "RPP_CODIDP_PAI", serializeAs: "idIndicatorPAI" })
    public idIndicatorPAI: number;

    @belongsTo(() => IndicatorsPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public indicatorResponsible: BelongsTo<typeof IndicatorsPAI>;

}
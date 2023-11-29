import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import IndicatorsPAI from "./PAIIndicators";

export default class ProductsPAI extends BaseModel {
    public static table = "PRP_PRODUCTOS_PAI";

    @column({ isPrimary: true, columnName: "PRP_COD", serializeAs: "id"})
    public id: number;

    @column({ columnName: "PRP_PRODUCTO", serializeAs: "product"})
    public product: string

    @column({ columnName: "PRP_CODIDP_PAI", serializeAs: "idIndicatorPAI" })
    public idIndicatorPAI: number;

    @belongsTo(() => IndicatorsPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public indicatorProduct: BelongsTo<typeof IndicatorsPAI>;

}
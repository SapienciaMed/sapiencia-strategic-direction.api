import { BaseModel, BelongsTo, belongsTo, HasMany, hasMany, column } from "@ioc:Adonis/Lucid/Orm";
import IndicatorsPAI from "./PAIIndicators";
import DisaggregatePAI from "./PAIDisaggregate";
export default class BimestersPAI extends BaseModel {
    public static table = "BMP_BIMESTRES_PAI";

    @column({ isPrimary: true, columnName: "BMP_CODIGO", serializeAs: "id" })
    public id: number;
    
    @column({ columnName: "BMP_BIMESTRE", serializeAs: "bimester" })
    public bimester: string;

    @column({ columnName: "BMP_VALOR", serializeAs: "value" })
    public value: number;

    @column({ columnName: "BMP_DESAGREGAR", serializeAs: "showDisaggregate" })
    public showDisaggregate: number;

    @column({ columnName: "BMP_TOTAL_PORCENTAJE", serializeAs: "sumOfPercentage" })
    public sumOfPercentage: number;

    @column({ columnName: "BMP_CODIDP_PAI", serializeAs: "idIndicatorPAI" })
    public idIndicatorPAI: number;

    @hasMany(() => DisaggregatePAI, {
        localKey: 'id',
        foreignKey: 'idBimester',
    })
    public disaggregate: HasMany<typeof DisaggregatePAI>;

    @belongsTo(() => IndicatorsPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public indicatorBimester: BelongsTo<typeof IndicatorsPAI>;
    
}


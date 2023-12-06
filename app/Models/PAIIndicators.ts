import { BaseModel, BelongsTo, belongsTo, HasMany, hasMany, column } from "@ioc:Adonis/Lucid/Orm";
import ProductsPAI from "./PAIProducts";
import ResponsiblesPAI from "./PAIResponsibles";
import CoResponsiblesPAI from "./PAICoResponsibles";
import ActionPlan from "./ActionPlan";
export default class IndicatorsPAI extends BaseModel {
    public static table = "IDP_INDICADORES";

    @column({ isPrimary: true, columnName: "IDP_CODIGO", serializeAs: "id" })
    public id: number;
    
    @column({ columnName: "IDP_CODIDC_INDICADOR_PROYECTO", serializeAs: "projectIndicator" })
    public projectIndicator: number;

    @column({ columnName: "IDP_CODTDI_TIPO_INDICADOR", serializeAs: "indicatorType" })
    public indicatorType: number;

    @column({ columnName: "IDP_DESCRIPCION_INDICADOR", serializeAs: "indicatorDesc" })
    public indicatorDesc: string;

    @column({ columnName: "IDP_PRIMER_BIMESTRE", serializeAs: "firstBimester" })
    public firstBimester: number;

    @column({ columnName: "IDP_SEGUNDO_BIMESTRE", serializeAs: "secondBimester" })
    public secondBimester: number;

    @column({ columnName: "IDP_TERCER_BIMESTRE", serializeAs: "thirdBimester" })
    public thirdBimester: number;

    @column({ columnName: "IDP_CUARTO_BIMESTRE", serializeAs: "fourthBimester" })
    public fourthBimester: number;

    @column({ columnName: "IDP_QUINTO_BIMESTRE", serializeAs: "fifthBimester" })
    public fifthBimester: number;

    @column({ columnName: "IDP_SEXTO_BIMESTRE", serializeAs: "sixthBimester" })
    public sixthBimester: number;

    @column({ columnName: "IDP_META_TOTAL", serializeAs: "totalPlannedGoal" })
    public totalPlannedGoal: number;

    @column({ columnName: "IDP_CODPAI_PAI", serializeAs: "idPAI" })
    public idPAI: number;

    @hasMany(() => ProductsPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public ProductsPAI: HasMany<typeof ProductsPAI>;

    @hasMany(() => ResponsiblesPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public ResponsiblesPAI: HasMany<typeof ResponsiblesPAI>;

    @hasMany(() => CoResponsiblesPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public CoResponsiblesPAI: HasMany<typeof CoResponsiblesPAI>;

    @belongsTo(() => ActionPlan, {
        localKey: 'id',
        foreignKey: 'idPAI',
    })
    public indicator: BelongsTo<typeof ActionPlan>;
}
import { BaseModel, BelongsTo, belongsTo, HasMany, hasMany, column } from "@ioc:Adonis/Lucid/Orm";
import ProductsPAI from "./PAIProducts";
import ResponsiblesPAI from "./PAIResponsibles";
import CoResponsiblesPAI from "./PAICoResponsibles";
import BimestersPAI from "./PAIBimesters";
import ActionPAI from "./ActionPAI";
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

    @column({ columnName: "IDP_META_TOTAL", serializeAs: "totalPlannedGoal" })
    public totalPlannedGoal: number;

    @column({ columnName: "IDP_CODACC_PAI", serializeAs: "actionId" })
    public actionId: number;

    @hasMany(() => BimestersPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public bimesters: HasMany<typeof BimestersPAI>;

    @hasMany(() => ProductsPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public products: HasMany<typeof ProductsPAI>;

    @hasMany(() => ResponsiblesPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public responsibles: HasMany<typeof ResponsiblesPAI>;

    @hasMany(() => CoResponsiblesPAI, {
        localKey: 'id',
        foreignKey: 'idIndicatorPAI',
    })
    public coresponsibles: HasMany<typeof CoResponsiblesPAI>;
    

    @belongsTo(() => ActionPAI, {
        localKey: 'id',
        foreignKey: 'actionId',
    })
    public actionPAI: BelongsTo<typeof ActionPAI>;
}
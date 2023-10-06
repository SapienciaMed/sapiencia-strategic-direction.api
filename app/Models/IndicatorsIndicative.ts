import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";

export default class IndicatorsIndicative extends BaseModel {
    public static table = "IND_INDICADORES";

    @column({ isPrimary: true, columnName: "IND_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "IND_CODTDI_TIPO_INDICADOR", serializeAs: "type" })
    public type: number;

    @column({ columnName: "IND_CODLNE_LINEA_ESTRATEGICA", serializeAs: "line" })
    public line: number;

    @column({ columnName: "IND_CODCOM_COMPONENTE", serializeAs: "component" })
    public component: number;

    @column({ columnName: "IND_PROGRAMA", serializeAs: "program" })
    public program: number;

    @column({ columnName: "IND_NOMBRE_INDICADOR", serializeAs: "indicator" })
    public indicator: number;

    @column({ columnName: "IND_PLAN_DESARROLLO", serializeAs: "developmentPlan" })
    public developmentPlan: string;

    @column({ columnName: "IND_UNIDAD_MEDIDA", serializeAs: "measurement" })
    public measurement: number;

    @column({ columnName: "IND_PRODUCTO_MGA", serializeAs: "productMGA" })
    public productMGA: string;

    @column({ columnName: "IND_META_AÑO_0", serializeAs: "year0" })
    public year0: number;

    @column({ columnName: "IND_META_AÑO_1", serializeAs: "year1" })
    public year1: number;

    @column({ columnName: "IND_META_AÑO_2", serializeAs: "year2" })
    public year2: number;

    @column({ columnName: "IND_META_AÑO_3", serializeAs: "year3" })
    public year3: number;

    @column({ columnName: "IND_META_AÑO_4", serializeAs: "year4" })
    public year4: number;

    @column({ columnName: "IND_CODPRY_PROYECTO", serializeAs: "idProject" })
    public idProject: number;

    @belongsTo(() => Projects, {
        localKey: 'id',
        foreignKey: 'idProject',
    })
    public project: BelongsTo<typeof Projects>;
}
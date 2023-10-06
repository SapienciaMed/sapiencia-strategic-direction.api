import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";

export default class IndicatorsAction extends BaseModel {
    public static table = "IDC_INDICADORES";

    @column({ isPrimary: true, columnName: "IDC_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "IDC_CODTDI_TIPO_INDICADOR", serializeAs: "type" })
    public type: number;

    @column({ columnName: "IDC_CODOBE_OBJETIVO_ESPECIFICO", serializeAs: "objective" })
    public objective: string;

    @column({ columnName: "IDC_PRODUCTO_MGA", serializeAs: "productMGA" })
    public productMGA: string;

    @column({ columnName: "IDC_CODIGO_DPN", serializeAs: "dpnIndicator" })
    public dpnIndicator: number;

    @column({ columnName: "IDC_CODDPN_INDICADOR_DPN", serializeAs: "dpn" })
    public dpn: number;

    @column({ columnName: "IDC_CODIGO_VALOR_ESTATICO", serializeAs: "staticValueCode" })
    public staticValueCode: string;

    @column({ columnName: "IDC_VALOR_ESTATICO", serializeAs: "staticValue" })
    public staticValue: string;

    @column({ columnName: "IDC_UNIDAD_MEDIDA", serializeAs: "measurement" })
    public measurement: number;

    @column({ columnName: "IDC_META_AÑO_0", serializeAs: "year0" })
    public year0: number;

    @column({ columnName: "IDC_META_AÑO_1", serializeAs: "year1" })
    public year1: number;

    @column({ columnName: "IDC_META_AÑO_2", serializeAs: "year2" })
    public year2: number;

    @column({ columnName: "IDC_META_AÑO_3", serializeAs: "year3" })
    public year3: number;

    @column({ columnName: "IDC_META_AÑO_4", serializeAs: "year4" })
    public year4: number;

    @column({ columnName: "IDC_META_GLOBAL", serializeAs: "total" })
    public total: number;

    @column({ columnName: "IDC_CODPRY_PROYECTO", serializeAs: "idProject" })
    public idProject: number;

    @belongsTo(() => Projects, {
        localKey: 'id',
        foreignKey: 'idProject',
    })
    public project: BelongsTo<typeof Projects>;
}
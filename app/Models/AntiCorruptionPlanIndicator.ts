import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AntiCorruptionPlanComponent extends BaseModel {
    public static table = "IPA_INDICADOR_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "IPA_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "IPA_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ columnName: "IPA_UUID", serializeAs: "uuid" })
    public uuid: string;

    @column({ columnName: "ACPA_UUID", serializeAs: "acpa_uuid" })
    public acpa_uuid: string;

    @column({ columnName: "PAC_CODIGO", serializeAs: "pac_id" })
    public pac_id: number;

    @column({ columnName: "IPA_META_CUATRIMESTRE1", serializeAs: "quarterly_goal1" })
    public quarterly_goal1: number;

    @column({ columnName: "IPA_META_CUATRIMESTRE2", serializeAs: "quarterly_goal2" })
    public quarterly_goal2: number;

    @column({ columnName: "IPA_META_CUATRIMESTRE3", serializeAs: "quarterly_goal3" })
    public quarterly_goal3: number;

    @column({ columnName: "IPA_UNIDAD_MEDIDA1", serializeAs: "unit1" })
    public unit1: string;

    @column({ columnName: "IPA_UNIDAD_MEDIDA2", serializeAs: "unit2" })
    public unit2: string;

    @column({ columnName: "IPA_UNIDAD_MEDIDA3", serializeAs: "unit3" })
    public unit3: string;
}



import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
export default class AntiCorruptionPlan extends BaseModel {
    public static table = "PAC_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "PAC_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PAC_NOMBRE", serializeAs: "name" })
    public name: string;

    @column({ columnName: "PAC_FECHA", serializeAs: "date" })
    public date: string;

    @column({ isPrimary: true, columnName: "PAC_STATUS", serializeAs: "status" })
    public status: number;
}

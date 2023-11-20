import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class PAI extends BaseModel {
    public static table = "PAI_PLANEACION";

    @column({ isPrimary: true, columnName: "PAI_CODIGO", serializeAs: "id" })
    public id: number;
}
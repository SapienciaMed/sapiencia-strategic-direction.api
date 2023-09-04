import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Params extends BaseModel {
    public static table = "PRM_PARAMETROS";

    @column({ isPrimary: true, columnName: "PRM_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PRM_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ columnName: "PRM_VALOR", serializeAs: "value" })
    public value: string;

    @column({ columnName: "PRM_IDAPLICATIVO", serializeAs: "appId" })
    public appId: number;
}
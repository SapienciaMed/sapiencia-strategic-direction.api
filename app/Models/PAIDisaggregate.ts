import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import BimestersPAI from "./PAIBimesters";

export default class DisaggregatePAI extends BaseModel {
    public static table = "DSG_DESAGREGAR_PAI";

    @column({ isPrimary: true, columnName: "DSG_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "DSG_PORCENTAJE", serializeAs: "percentage" })
    public projectIndicator: number;

    @column({ columnName: "DSG_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ columnName: "DSG_CODBMP_PAI", serializeAs: "idBimester" })
    public idBimester: number;

    @belongsTo(() => BimestersPAI, {
        localKey: 'id',
        foreignKey: 'idBimester',
    })
    public bimestersPAI: BelongsTo<typeof BimestersPAI>;
}
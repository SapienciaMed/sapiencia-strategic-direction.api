import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import SpecificObjectives from "./SpecificObjectives";

export default class EstatesServices extends BaseModel {
    public static table = "BYS_BIENES_SERVICIOS";

    @column({ isPrimary: true, columnName: "BYS_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "BYS_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ columnName: "BYS_CODLOE_OBJETIVO_ESPECIFICO", serializeAs: "idObjective" })
    public idObjective: number;

    @belongsTo(() => SpecificObjectives, {
        localKey: 'id',
        foreignKey: 'idObjective',
    })
    public specificObjective: BelongsTo<typeof SpecificObjectives>;
}
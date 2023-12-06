import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import ActionPlan from "./ActionPlan";

export default class RevisionPAI extends BaseModel {
    public static table = "RPA_REVISION_PAI";

    @column({ isPrimary: true, columnName: "RPA_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "RPA_CODPAI_PAI_PLANEACION", serializeAs: "idPai" })
    public idPai: number;

    @column({ columnName: "RPA_JSON", serializeAs: "json" })
    public json: string;

    @column({
        columnName: "RFI_COMPLETADO",
        serializeAs: "completed",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public completed: boolean;

    @column({ columnName: "RFI_VERSION", serializeAs: "version" })
    public version: number;

    @column({ columnName: "RFI_USUARIO", serializeAs: "userCreate" })
    public userCreate: string;

    @column.dateTime({
        autoCreate: true,
        columnName: "RFI_FECHA_CREO",
        serializeAs: "dateCreate",
    })
    public dateCreate: DateTime;

    @belongsTo(() => ActionPlan, {
        localKey: 'id',
        foreignKey: 'idPai',
    })
    public pai: BelongsTo<typeof ActionPlan>;
}

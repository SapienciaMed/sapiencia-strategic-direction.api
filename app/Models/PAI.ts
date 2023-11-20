import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import ShedulesPAI from "./SchedulesPAI";

export default class PAI extends BaseModel {
    public static table = "PAI_PLANEACION";

    @column({ isPrimary: true, columnName: "PAI_CODIGO", serializeAs: "id" })
    public id: number;
}
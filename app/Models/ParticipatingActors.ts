import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ParticipatingActors extends BaseModel {
    public static table = "";

    @column({ isPrimary: true, columnName: "", serializeAs: "id" })
    public id: number;
}
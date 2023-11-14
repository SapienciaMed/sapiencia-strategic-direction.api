import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";
import EstatesServices from "./EstatesServices";
import { ICause } from "App/Interfaces/ProjectInterfaces";

export default class SpecificObjectives extends BaseModel {
    public static table = "LOE_OBJETIVO_ESPECIFICO";

    @column({ isPrimary: true, columnName: "LOE_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LOE_CODPRY_PRY_PROYECTO", serializeAs: "idProject" })
    public idProject: number;

    @column({ columnName: "LOE_OBJETIVO", serializeAs: "objetive" })
    public objetive: number | ICause;

    @column({ columnName: "LOE_ACCIONES_INTERVENCION", serializeAs: "interventionActions" })
    public interventionActions: string;

    @column({ columnName: "LOE_CUANTIFICACION", serializeAs: "quantification" })
    public quantification: number;

    @hasMany(() => EstatesServices, {
        localKey: 'id',
        foreignKey: 'idObjective',
    })
    public estatesService: HasMany<typeof EstatesServices>;

    @belongsTo(() => Projects, {
        localKey: 'id',
        foreignKey: 'idProject',
    })
    public project: BelongsTo<typeof Projects>;
}
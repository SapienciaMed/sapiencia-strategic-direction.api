import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Effects from "./Effects";
import Causes from "./Causes";
import Actors from "./Actors";
import SpecificObjectives from "./SpecificObjectives";
import EnvironmentalEffects from "./EnvironmentalEffects";
import Classifications from "./Classifications";
import Activities from "./Activities";
import Risks from "./Risks"
import ProfitsIncome from "./ProfitsIncome"
import SourceFunding from "./EntityFinancing"
import IndicatorsIndicative from "./IndicatorsIndicative";
import IndicatorsAction from "./IndicatorsAction";
import ProjectStates from "./ProjectStates";

export default class Projects extends BaseModel {
  public static table = "PRY_PROYECTOS";

  @column({ isPrimary: true, columnName: "PRY_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PRY_CODIGO_BPIN", serializeAs: "bpin" })
  public bpin: string;

  @column({ columnName: "PRY_NOMBRE_PROYECTO", serializeAs: "project" })
  public project: string;

  @column({ columnName: "PRY_PERIODO_INICIAL", serializeAs: "dateFrom" })
  public dateFrom: number;

  @column({ columnName: "PRY_PERIODO_FINAL", serializeAs: "dateTo" })
  public dateTo: number;

  @column({ columnName: "PRY_CODPRC_PROCESO", serializeAs: "process" })
  public process: number;

  @column({ columnName: "PRY_CODDEP_DEPENDENCIA", serializeAs: "dependency" })
  public dependency: number;

  @column({ columnName: "PRY_PACTO_PLAN_NACIONAL", serializeAs: "pnd_pacto" })
  public pnd_pacto: string;

  @column({ columnName: "PRY_LINEA_PLAN_NACIONAL", serializeAs: "pnd_linea" })
  public pnd_linea: string;

  @column({ columnName: "PRY_PROGRAMA_PLAN_NACIONAL", serializeAs: "pnd_programa" })
  public pnd_programa: string;

  @column({ columnName: "PRY_LINEA_PLAN_DEPARTAMENTAL", serializeAs: "pdd_linea" })
  public pdd_linea: string;

  @column({ columnName: "PRY_COMPONENTES_PLAN_DEPARTAMENTAL", serializeAs: "pdd_componentes" })
  public pdd_componentes: string;

  @column({ columnName: "PRY_PROGRAMA_PLAN_DEPARTAMENTAL", serializeAs: "pdd_programa" })
  public pdd_programa: string;

  @column({ columnName: "PRY_LINEA_PLAN_DISTRITAL", serializeAs: "pdi_linea" })
  public pdi_linea: string;

  @column({ columnName: "PRY_COMPONENTES_PLAN_DISTRITAL", serializeAs: "pdi_componentes" })
  public pdi_componentes: string;

  @column({ columnName: "PRY_PROGRAMA_PLAN_DISTRITAL", serializeAs: "pdi_programa" })
  public pdi_programa: string;

  @column({ columnName: "PYR_DETALLE_PROBLEMA", serializeAs: "problemDescription" })
  public problemDescription: string;

  @column({ columnName: "PRY_MAGNITUD", serializeAs: "magnitude" })
  public magnitude: string;

  @column({ columnName: "PRY_PROBLEMA_CENTRAL", serializeAs: "centerProblem" })
  public centerProblem: string;

  @column({ columnName: "PRY_INDICADORES", serializeAs: "indicators" })
  public indicators: string;

  @column({ columnName: "PRY_CODMED_MED_MEDIDAS", serializeAs: "measurement" })
  public measurement: number;

  @column({ columnName: "PRY_META", serializeAs: "goal" })
  public goal: number;

  @column({ columnName: "PRY_OBJETIVO", serializeAs: "object" })
  public object: string;

  @column({ columnName: "PRY_USUARIO", serializeAs: "user" })
  public user: string;

  @column({ columnName: "PRY_ESTADO_PROYECTO", serializeAs: "status" })
  public status: number;

  @column({ columnName: "PRY_CODPRM_PRM_PARAMETROS", serializeAs: "localitation" })
  public localitation: number;

  @column({ columnName: "PRY_NOMBRE_ALTERNATIVA", serializeAs: "alternative" })
  public alternative: string;

  @column({ columnName: "PRY_RESUMEN_TECNICO_ALTERNATIVA", serializeAs: "resumeAlternative" })
  public resumeAlternative: string;

  @column({ columnName: "PRY_DESCRIPCION_CAPACIDAD", serializeAs: "descriptionCapacity" })
  public descriptionCapacity: string;

  @column({ columnName: "PRY_CODUMC_UNIDAD_MEDIDA_CAPACIDAD", serializeAs: "unitCapacity" })
  public unitCapacity: number;

  @column({ columnName: "PRY_CAPACIDAD_GENERADA", serializeAs: "capacityGenerated" })
  public capacityGenerated: number;

  @column({ columnName: "PRY_DIAGNOSTICO_AMBIENTAL", serializeAs: "environmentDiagnosis" })
  public environmentDiagnosis: string;

  @column({ columnName: "PRY_NUMERO_PERSONA_OBJETIVO", serializeAs: "objectivePeople" })
  public objectivePeople: number;

  @column({ columnName: "PRY_FUENTE_INFORMACION", serializeAs: "informationSource" })
  public informationSource: string;

  @column({ columnName: "PRY_REGION", serializeAs: "region" })
  public region: number;

  @column({ columnName: "PRY_DEPARTAMENTO", serializeAs: "departament" })
  public departament: number;

  @column({ columnName: "PRY_MUNICIPIO", serializeAs: "district" })
  public district: number;

  @column({ columnName: "PRY_RESGUARDO", serializeAs: "shelter" })
  public shelter: string;

  @column({ columnName: "PRY_FORMULADOR", serializeAs: "formulation" })
  public formulation: string;

  @column({ columnName: "PRY_ROL", serializeAs: "rol" })
  public rol: string;

  @column({ columnName: "PRY_ORDEN", serializeAs: "order" })
  public order: string;

  @column({
    columnName: "PRY_TECNICAS",
    serializeAs: "tecniques",
    prepare: (val) => String(val) === "true" ? 1 : 0,
    serialize: (val) => Boolean(val)
  })
  public tecniques: boolean;

@column({
  columnName: "PRY_AMBIENTAL",
  serializeAs: "ambiental",
  prepare: (val) => String(val) === "true" ? 1 : 0,
  serialize: (val) => Boolean(val)
  })
  public ambiental: boolean;

@column({
  columnName: "PRY_SOCIOCULTURAL",
  serializeAs: "sociocultural",
  prepare: (val) => String(val) === "true" ? 1 : 0,
  serialize: (val) => Boolean(val)
  })
  public sociocultural: boolean;

  
  @column({ columnName: "PRY_OBSERVACIONES", serializeAs: "observations" })
  public observations: string;
  


  //RELACIONES

  @hasMany(() => Causes, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public causes: HasMany<typeof Causes>;
  
  @hasMany(() => Effects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public effects: HasMany<typeof Effects>;

  @hasMany(() => Actors, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public actors: HasMany<typeof Actors>;

  @hasMany(() => Classifications, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public classifications: HasMany<typeof Classifications>;

  @hasMany(() => SpecificObjectives, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public specificObjectives: HasMany<typeof SpecificObjectives>;

  @hasMany(() => EnvironmentalEffects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public environmentalEffects: HasMany<typeof EnvironmentalEffects>;

  @hasMany(() => Activities, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public activities: HasMany<typeof Activities>;

  @hasMany(() => Risks, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public risks: HasMany<typeof Risks>;

  @hasMany(() => ProfitsIncome, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public profitsIncome: HasMany<typeof ProfitsIncome>;

  @hasMany(() => SourceFunding, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public sourceFunding: HasMany<typeof SourceFunding>;

  @hasMany(() => IndicatorsAction, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public indicatorsAction: HasMany<typeof IndicatorsAction>;

  @hasMany(() => IndicatorsIndicative, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public indicatorsIndicative: HasMany<typeof IndicatorsIndicative>;

  @hasMany(() => ProjectStates, {
    localKey: 'id',
    foreignKey: 'status',
  })
  public projectStates: HasMany<typeof ProjectStates>;

}

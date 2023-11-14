import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Profits from "./ProfitsIncome";

export default class Risks extends BaseModel {
  public static table = "PER_PERIODO";

  @column({ isPrimary: true, columnName: "PER_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PER_PERIODO", serializeAs: "period" })
  public period: number;

  @column({ columnName: "PER_CANTIDAD", serializeAs: "quantity" })
  public quantity: number;

  @column({ columnName: "PER_VALOR_UNITARIO", serializeAs: "unitValue" })
  public unitValue: number;

  @column({ columnName: "PER_VALOR_FINANCIERO", serializeAs: "financialValue" })
  public financialValue: number;

  @column({ columnName: "PER_CODPER_BENEFICIO", serializeAs: "idProfit" })
  public idProfit: number;

  @belongsTo(() => Profits, {
    localKey: 'id',
    foreignKey: 'idProfit',
  })
  public profit: BelongsTo<typeof Profits>;
}


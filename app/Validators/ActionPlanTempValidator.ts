import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActionPlanValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
      id: schema.number.optional(),
      user: schema.string(),
      yearPAI: schema.number(),
      budgetPAI: schema.number(),
      typePAI: schema.number(),
      namePAI: schema.number(),
      objectivePAI: schema.string(),
      articulationPAI: schema.string(),
      status: schema.number(),
      linePAI: schema.array().members(
      schema.object().members({
        id: schema.number.optional(),
        line: schema.string(),
      })
    ),
    risksPAI: schema.array().members(
      schema.object().members({
        id: schema.number.optional(),
        risk: schema.string(),
      })
    ),
    actionsPAi: schema.array().members(
      schema.object().members({
        id: schema.number.optional(),
        description: schema.string(),
        indicators: schema.array.optional().members(
          schema.object().members({
            id: schema.number.optional(),
            actionId: schema.number.optional(),
            typePAI: schema.number.optional(),
            projectIndicator: schema.number.optional(),
            indicatorType: schema.number(),
            indicatorDesc: schema.string.optional(),
            bimesters: schema.array().members(
              schema.object().members({
                bimester: schema.string.optional(),
                value: schema.number(),
                disaggregate: schema.array.nullableAndOptional().members(
                  schema.object.nullableAndOptional().members({
                    id: schema.number.optional(),
                    percentage: schema.number(),
                    description: schema.string.optional(),
                  })
                ),
                showDisaggregate: schema.number.optional(),
                sumOfPercentage: schema.number.optional()
              })
            ),
            totalPlannedGoal: schema.number(),
            products: schema.array().members(
              schema.object().members({
                id: schema.number.optional(),
                idIndicatorPAI: schema.number.optional(),
                product: schema.string()
              })
            ),
            responsibles: schema.array().members(
              schema.object().members({
                id: schema.number.optional(),
                idIndicatorPAI: schema.number.optional(),
                responsible: schema.string()
              })
            ),
            coresponsibles: schema.array().members(
              schema.object().members({
                id: schema.number.optional(),
                idIndicatorPAI: schema.number.optional(),
                coresponsible: schema.string()
              })
            )
          })
        )
      })
    ),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {};
}

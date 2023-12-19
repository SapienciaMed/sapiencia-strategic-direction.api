import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActionPlanValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
      id: schema.number.optional(),
      user: schema.string.optional(),
      yearPAI: schema.number.optional(),
      budgetPAI: schema.number.optional(),
      typePAI: schema.number.optional(),
      namePAI: schema.number.optional(),
      objectivePAI: schema.string.optional(),
      articulationPAI: schema.string.optional(),
      status: schema.number.optional(),
      linePAI: schema.array.optional().members(
      schema.object().members({
        id: schema.number.optional(),
        line: schema.string.optional(),
      })
    ),
    risksPAI: schema.array.optional().members(
      schema.object().members({
        id: schema.number.optional(),
        risk: schema.string.optional(),
      })
    ),
    actionsPAi: schema.array.optional().members(
      schema.object().members({
        id: schema.number.optional(),
        description: schema.string(),
        indicators: schema.array.optional().members(
          schema.object().members({
            id: schema.number.optional(),
            actionId: schema.number.optional(),
            typePAI: schema.number.optional(),
            projectIndicator: schema.number.optional(),
            indicatorType: schema.number.optional(),
            indicatorDesc: schema.string.optional(),
            bimesters: schema.array().members(
              schema.object().members({
                bimester: schema.string.optional(),
                value: schema.number(),
                disaggregate: schema.array.optional().members(
                  schema.object.optional().members({
                    id: schema.number.optional(),
                    percentage: schema.number.optional(),
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

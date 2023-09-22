import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActivitiesValidator {
    constructor(protected ctx: HttpContextContract) { }

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
        activities: schema.array().members(
            schema.object().members({
                objetiveActivity: schema.object().members({
                    id: schema.number.optional(),
                    consecutive: schema.string(),
                    description: schema.string(),
                    childrens: schema.array.optional().members(
                        schema.object().members({
                            id: schema.number.optional(),
                            consecutive: schema.string(),
                            description: schema.string()
                        })
                    )
                }),
                stageActivity: schema.number(),
                productMGA: schema.string(),
                activityMGA: schema.string(),
                productDescriptionMGA: schema.string(),
                activityDescriptionMGA: schema.string(),
                budgetsMGA: schema.object().members({
                    year0: schema.object().members({
                        validity: schema.number(),
                        budget: schema.number()
                    }),
                    year1: schema.object().members({
                        validity: schema.number(),
                        budget: schema.number()
                    }),
                    year2: schema.object().members({
                        validity: schema.number(),
                        budget: schema.number()
                    }),
                    year3: schema.object().members({
                        validity: schema.number(),
                        budget: schema.number()
                    }),
                    year4: schema.object().members({
                        validity: schema.number(),
                        budget: schema.number()
                    }),
                }),
                validity: schema.number(),
                year: schema.number(),
                detailActivities: schema.array().members(
                    schema.object().members({
                        consecutive: schema.string(),
                        detailActivity: schema.string(),
                        component: schema.number(),
                        measurement: schema.number(),
                        amount: schema.number(),
                        unitCost: schema.number(),
                        pospre: schema.number.optional(),
                        validatorCPC: schema.string.optional(),
                        clasificatorCPC: schema.number.optional(),
                        sectionValidatorCPC: schema.string.optional(),
                    })
                )
            })
        )
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

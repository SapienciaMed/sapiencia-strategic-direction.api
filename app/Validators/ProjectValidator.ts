import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProjectValidator {
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
    id: schema.number.optional(),
    user: schema.string(),
    status: schema.number(),
    tempTab: schema.string.optional(),
    register: schema.object.optional().members({
      bpin: schema.string.optional(),
      project: schema.string.optional(),
      dateFrom: schema.string.optional(),
      dateTo: schema.string.optional(),
      process: schema.number.optional(),
      localitation: schema.number.optional(),
      dependency: schema.number.optional(),
      object: schema.string.optional(),
    }),
    identification: schema.object.optional().members({
      problemDescription: schema.object.optional().members({
        problemDescription: schema.string.optional(),
        magnitude: schema.string.optional(),
        centerProblem: schema.string.optional(),
        causes: schema.array.optional().members(
          schema.object().members({
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
          })
        ),
        effects: schema.array.optional().members(
          schema.object().members({
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
          })
        ),
      }),
      planDevelopment: schema.object.optional().members({
        pnd_pacto: schema.string.optional(),
        pnd_linea: schema.string.optional(),
        pnd_programa: schema.string.optional(),
        pdd_linea: schema.string.optional(),
        pdd_componentes: schema.string.optional(),
        pdd_programa: schema.string.optional(),
        pdi_linea: schema.string.optional(),
        pdi_componentes: schema.string.optional(),
        pdi_programa: schema.string.optional()
      }),
      objectives: schema.object.optional().members({
        generalObjective: schema.string.optional(),
        specificObjectives: schema.array.optional().members(
          schema.object().members({
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
          })
        ),
        purposes: schema.array.optional().members(
          schema.object().members({
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
          })
        ),
        indicators: schema.string.optional(),
        measurement: schema.number.optional(),
        goal: schema.number.optional(),
      }),
      actors: schema.object.optional().members({
        actors: schema.array.optional().members(
          schema.object().members({
            id: schema.number.optional(),
            actor: schema.string(),
            expectation: schema.string(),
            position: schema.number(),
            contribution: schema.string(),
          })
        )
      }),
      poblation: schema.object.optional().members({
        objectivePeople: schema.number.optional(),
        informationSource: schema.string.optional(),
        region: schema.number.optional(),
        departament: schema.number.optional(),
        district: schema.number.optional(),
        shelter: schema.string.optional(),
        demographic: schema.array.optional().members(
          schema.object().members({
            id: schema.number.optional(),
            clasification: schema.number(),
            detail: schema.number(),
            numPerson: schema.number.optional(),
            infoSource: schema.string.optional(),
          })
        )
      })
    }),
    preparation: schema.object.optional().members({
      technicalAnalysis: schema.object.optional().members({
        alternative: schema.string.optional(),
        resumeAlternative: schema.string.optional()
      }),
      needs: schema.object.optional().members({
        objetives: schema.array().members(
          schema.object().members({
            id: schema.number.optional(),
            objetive: schema.object().members({
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
            interventionActions: schema.string(),
            quantification: schema.number(),
            estatesService: schema.array().members(
              schema.object().members({
                id: schema.number.optional(),
                description: schema.string()
              })
            )
          })
        )
      }),
      capacity: schema.object.optional().members({
        alternativeCapacity: schema.string.optional(),
        descriptionCapacity: schema.string.optional(),
        unitCapacity: schema.number.optional(),
        capacityGenerated: schema.number.optional(),
      }),
      enviromentalAnalysis: schema.object.optional().members({
        environmentDiagnosis: schema.string.optional(),
        effects: schema.array.optional().members(
          schema.object().members({
            id: schema.number.optional(),
            type: schema.number.optional(),
            impact: schema.string.optional(),
            classification: schema.number.optional(),
            level: schema.number.optional(),
            measures: schema.string.optional(),
          })
        )
      }),
      activities: schema.object.optional().members({
        activities: schema.array.optional().members(
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
            ),
          })
        )
      }),
      risks: schema.object.optional().members({
        risks: schema.array.optional().members(
          schema.object().members({
            level: schema.number(),
            risk: schema.string(),
            typeRisk: schema.number(),
            descriptionRisk: schema.string(),
            probability: schema.number(),
            impact: schema.number(),
            effects: schema.string(),
            mitigation: schema.string(),
          })
        )
      }),
    }),
    programation: schema.object.optional().members({
      profitsIncome: schema.object.optional().members({
        profitsIncome: schema.array.optional().members(
          schema.object().members({
            type: schema.string(),
            description: schema.string(),
            unit: schema.number(),
            period: schema.array().members(
              schema.object().members({
                id: schema.number.optional(),
                period: schema.number(),
                quantity: schema.number(),
                unitValue: schema.number(),
                financialValue: schema.number(),
              })
            ),
          })
        )
      }),
      sourceFunding: schema.object.optional().members({
        sourceFunding: schema.array.optional().members(
          schema.object().members({
            stage: schema.number(),
            typeEntity: schema.number(),
            resource: schema.number(),
            entity: schema.string(),
            year0: schema.number(),
            year1: schema.number(),
            year2: schema.number(),
            year3: schema.number(),
            year4: schema.number(),
          })
        )
      }),
      indicators: schema.object.optional().members({
        indicators: schema.array.optional().members(
          schema.object().members({
            type: schema.number(),
            line: schema.number.optional(),
            component: schema.number.optional(),
            program: schema.number.optional(),
            indicator: schema.number.optional(),
            developmentPlan: schema.string.optional(),
            objective: schema.string.optional(),
            dpnIndicator: schema.number.optional(),
            dpn: schema.number.optional(),
            staticValueCode: schema.number.optional(),
            staticValue: schema.string.optional(),
            total: schema.number.optional(),
            accumulative: schema.number.optional(),
            productMGA: schema.string(),
            measurement: schema.number(),
            year0: schema.number(),
            year1: schema.number(),
            year2: schema.number(),
            year3: schema.number(),
            year4: schema.number(),
          })
        )
      }),
      logicFrame: schema.object.optional().members({
        logicFrame: schema.array.optional().members(
          schema.object().members({
            resume: schema.number(),
            description: schema.string(),
            indicator: schema.number(),
            meta:schema.number(),
            sourceVerification: schema.string.optional(),
            assumptions: schema.string(),
            indicatorType:
              schema.object().members({
                type: schema.number(),
                line: schema.number.optional(),
                component: schema.number.optional(),
                program: schema.number.optional(),
                indicator: schema.number.optional(),
                developmentPlan: schema.string.optional(),
                objective: schema.string.optional(),
                dpnIndicator: schema.number.optional(),
                dpn: schema.number.optional(),
                staticValueCode: schema.number.optional(),
                staticValue: schema.string.optional(),
                total: schema.number.optional(),
                accumulative: schema.number.optional(),
                productMGA: schema.string(),
                measurement: schema.number(),
                year0: schema.number(),
                year1: schema.number(),
                year2: schema.number(),
                year3: schema.number(),
                year4: schema.number(),
              })
          }),
        )
      }),
    }),
      transfers: schema.object.optional().members({
      formulation: schema.string.optional(),
      rol: schema.string.optional(),
      order: schema.string.optional(),
      tecniques: schema.boolean.optional(),
      ambiental: schema.boolean.optional(),
      sociocultural: schema.boolean.optional(),
      observations: schema.string.optional(),
    })
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

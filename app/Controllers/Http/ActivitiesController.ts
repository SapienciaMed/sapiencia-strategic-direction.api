import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import ActivitiesValidator from "App/Validators/ActivitiesValidator";
import xlsx, { ISettings } from "json-as-xlsx"

export default class ComponentsController {
    public async generateConsolidated({ request, response }: HttpContextContract) {
        try {
            const activitiesData = (await request.validate(ActivitiesValidator)).activities;
            const content: any[] = []
            activitiesData.forEach((item, index) => {
                const gruped = index > 0 ? JSON.stringify(activitiesData[index-1].objetiveActivity) === JSON.stringify(item.objetiveActivity) : false;
                item.detailActivities.forEach((detail,index) => {
                    if(index === 0) {
                        content.push({
                            objetiveActivity: {
                                consecutive: gruped ? null : item.objetiveActivity.consecutive,
                                description: gruped ? null : item.objetiveActivity.description
                            },
                            productMGA: item.productMGA,
                            productDescriptionMGA: item.productDescriptionMGA,
                            activityMGA: item.activityMGA,
                            activityDescriptionMGA: item.activityDescriptionMGA,
                            stageActivity: item.stageActivity,
                            budgetsMGA: item.budgetsMGA,
                            validity: item.validity,
                            year: item.year,
                            detailActivity: {
                                consecutive: detail.consecutive,
                                detailActivity: detail.detailActivity,
                                component: detail.component,
                                measurement: detail.measurement,
                                amount: detail.amount,
                                unitCost: detail.unitCost,
                                pospre: detail.pospre,
                                validatorCPC: detail.validatorCPC,
                                clasificatorCPC: detail.clasificatorCPC,
                                sectionValidatorCPC: detail.sectionValidatorCPC,
                            }
                        })
                    } else {
                        content.push({
                            objetiveActivity: {
                                consetutive: null,
                                description: null
                            },
                            productMGA: null,
                            productDescriptionMGA: null,
                            activityMGA: null,
                            activityDescriptionMGA: null,
                            stageActivity: "",
                            budgetsMGA: {},
                            validity: "",
                            year: "",
                            detailActivity: {
                                consecutive: detail.consecutive,
                                detailActivity: detail.detailActivity,
                                component: detail.component,
                                measurement: detail.measurement,
                                amount: detail.amount,
                                unitCost: detail.unitCost,
                                pospre: detail.pospre,
                                validatorCPC: detail.validatorCPC,
                                clasificatorCPC: detail.clasificatorCPC,
                                sectionValidatorCPC: detail.sectionValidatorCPC,
                            }
                        })
                    }
                })
            })
            let data = [
                {
                    sheet: "Hoja1",
                    columns: [
                        { label: "Objetivo específico", value: (row) => row.objetiveActivity.consecutive ? `${row.objetiveActivity.consecutive}. ${row.objetiveActivity.description}` : "" },
                        { label: "Producto MGA", value: (row) => row.productMGA ? `${row.productMGA}. ${row.productDescriptionMGA}` : "" },
                        { label: "Actividad MGA", value: (row) => row.productMGA ? `${row.activityMGA}. ${row.activityDescriptionMGA}` : "" },
                        { label: "Etapa", value: (row) => row.stageActivity },
                        { label: "Año 0", value: (row) => row.budgetsMGA.year0?.budget },
                        { label: "Año 1", value: (row) => row.budgetsMGA.year1?.budget },
                        { label: "Año 2", value: (row) => row.budgetsMGA.year2?.budget },
                        { label: "Año 3", value: (row) => row.budgetsMGA.year3?.budget },
                        { label: "Año 4", value: (row) => row.budgetsMGA.year4?.budget },
                        { label: "Presupuesto", value: (row) => row.productMGA ? row.budgetsMGA.year0?.budget+row.budgetsMGA.year1?.budget+row.budgetsMGA.year2?.budget+row.budgetsMGA.year3?.budget+row.budgetsMGA.year4?.budget : null },
                        { label: "Vigencia", value: (row) => row.validity },
                        { label: "Año", value: (row) => row.year },
                        { label: "Actividad detallada", value: (row) => `${row.detailActivity.consecutive}. ${row.detailActivity.detailActivity}` },
                        { label: "Componente", value: (row) => row.detailActivity.component },
                        { label: "Unidad de medida", value: (row) => row.detailActivity.measurement },
                        { label: "Cantidad", value: (row) => row.detailActivity.amount },
                        { label: "Costo unitario", value: (row) => row.detailActivity.unitCost },
                        { label: "Costo total", value: (row) => row.detailActivity.unitCost*row.detailActivity.amount },
                        { label: "Objeto de gasto POSPRE", value: (row) => row.detailActivity.pospre },
                        { label: "Validador CPC", value: (row) => row.detailActivity.validatorCPC },
                        { label: "Clasificador CPC", value: (row) => row.detailActivity.clasificatorCPC },
                        { label: "Validador sección CPC", value: (row) => row.detailActivity.sectionValidatorCPC },
                    ],
                    content: content,
                }
            ]

            const settings: ISettings = {
                writeOptions: {
                    type: "buffer",
                    bookType: "xlsx",
                },
            }

            const buffer = xlsx(data, settings);
            response.header('Content-Type', 'application/octet-stream')
            response.header('Content-Disposition', 'attachment; filename=MySheet.xlsx')

            response.send(buffer)
        } catch (err) {
            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }
    }
}

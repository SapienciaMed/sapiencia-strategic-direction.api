import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ComponentsProvider from "@ioc:core.ComponentsProvider";
import StageProvider from "@ioc:core.StageProvider";
import ActivityProvider from "@ioc:core.ActivityProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import ActivitiesValidator from "App/Validators/ActivitiesValidator";
import xlsx, { ISettings } from "json-as-xlsx"

export default class ActivityController {


    public async getDetailedActivitiesByFilters({ request, response }: HttpContextContract) {
        try {
          const data = request.all();
          return response.send(
            await ActivityProvider.getDetailedActivitiesByFilters(data)
          );
        } catch (err) {
    
          return response.badRequest(
            new ApiResponse(null, EResponseCodes.FAIL, String(err))
          );
        }
    }
    


    public async generateConsolidated({ request, response }: HttpContextContract) {
        try {
            const stages = await StageProvider.getStage();
            const components = await ComponentsProvider.getComponents();
            const activitiesData = (await request.validate(ActivitiesValidator)).activities;
            const content: any[] = []
            activitiesData.forEach((item, index) => {
                const stage = stages.data.find(stage => stage.id === item.stageActivity)
                const gruped = index > 0 ? JSON.stringify(activitiesData[index - 1].objetiveActivity) === JSON.stringify(item.objetiveActivity) : false;
                if(item.detailActivities.length > 0) {
                    item.detailActivities.forEach((detail, index) => {
                        const component = components.data.find(component => component.id === detail.component)
                        if (index === 0) {
                            content.push({
                                objetiveActivity: {
                                    consecutive: gruped ? null : item.objetiveActivity.consecutive,
                                    description: gruped ? null : item.objetiveActivity.description
                                },
                                productMGA: item.productMGA,
                                productDescriptionMGA: item.productDescriptionMGA,
                                activityMGA: item.activityMGA,
                                activityDescriptionMGA: item.activityDescriptionMGA,
                                stageActivity: stage ? stage.description : item.stageActivity,
                                budgetsMGA: item.budgetsMGA,
                                validity: item.validity,
                                year: item.year,
                                detailActivity: {
                                    consecutive: detail.consecutive,
                                    detailActivity: detail.detailActivity,
                                    component: component ? component.description : detail.component,
                                    measurement: detail.measurement,
                                    amount: detail.amount,
                                    unitCost: detail.unitCost,
                                    pospre: detail.pospre,
                                    validatorCPC: detail.validatorCPC,
                                    clasificatorCPC: detail.clasificatorCPC,
                                    sectionValidatorCPC: detail.sectionValidatorCPC,
                                }
                            });
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
                                    component: component ? component.description : detail.component,
                                    measurement: detail.measurement,
                                    amount: detail.amount,
                                    unitCost: detail.unitCost,
                                    pospre: detail.pospre,
                                    validatorCPC: detail.validatorCPC,
                                    clasificatorCPC: detail.clasificatorCPC,
                                    sectionValidatorCPC: detail.sectionValidatorCPC,
                                }
                            });
                        }
                    });
                } else {
                    content.push({
                        objetiveActivity: {
                            consecutive: gruped ? null : item.objetiveActivity.consecutive,
                            description: gruped ? null : item.objetiveActivity.description
                        },
                        productMGA: item.productMGA,
                        productDescriptionMGA: item.productDescriptionMGA,
                        activityMGA: item.activityMGA,
                        activityDescriptionMGA: item.activityDescriptionMGA,
                        stageActivity: stage ? stage.description : item.stageActivity,
                        budgetsMGA: item.budgetsMGA,
                        validity: item.validity,
                        year: item.year,
                        detailActivity: null
                    });
                }
            })
            let data = [
                {
                    sheet: "Hoja1",
                    columns: [
                        { label: "Objetivo específico", value: (row) => row.objetiveActivity.consecutive ? `${row.objetiveActivity.consecutive}. ${row.objetiveActivity.description}` : "" },
                        { label: "Producto MGA", value: (row) => row.productMGA ? `${row.productMGA}. ${row.productDescriptionMGA}` : "" },
                        { label: "Actividad MGA", value: (row) => row.productMGA ? `${row.activityMGA}. ${row.activityDescriptionMGA}` : "" },
                        { label: "Etapa", value: (row) => row.stageActivity },
                        { label: "Año 0", value: (row) => row.budgetsMGA.year0?.budget, format: "$#,##0.00" },
                        { label: "Año 1", value: (row) => row.budgetsMGA.year1?.budget, format: "$#,##0.00" },
                        { label: "Año 2", value: (row) => row.budgetsMGA.year2?.budget, format: "$#,##0.00" },
                        { label: "Año 3", value: (row) => row.budgetsMGA.year3?.budget, format: "$#,##0.00" },
                        { label: "Año 4", value: (row) => row.budgetsMGA.year4?.budget, format: "$#,##0.00" },
                        { label: "Presupuesto", value: (row) => row.productMGA ? row.budgetsMGA.year0?.budget + row.budgetsMGA.year1?.budget + row.budgetsMGA.year2?.budget + row.budgetsMGA.year3?.budget + row.budgetsMGA.year4?.budget : null, format: "$#,##0.00" },
                        { label: "Vigencia", value: (row) => row.validity },
                        { label: "Año", value: (row) => row.year },
                        { label: "Actividad detallada", value: (row) => row.detailActivity?.consecutive ? `${row.detailActivity.consecutive}. ${row.detailActivity.detailActivity}` : null },
                        { label: "Componente", value: (row) => row.detailActivity?.component },
                        { label: "Unidad de medida", value: (row) => row.detailActivity?.measurement },
                        { label: "Cantidad", value: (row) => row.detailActivity?.amount },
                        { label: "Costo unitario", value: (row) => row.detailActivity?.unitCost, format: "$#,##0.00" },
                        { label: "Costo total", value: (row) => row.detailActivity?.unitCost ? row.detailActivity.unitCost * row.detailActivity.amount : null, format: "$#,##0.00" },
                        { label: "Objeto de gasto POSPRE", value: (row) => row.detailActivity?.pospre },
                        { label: "Validador CPC", value: (row) => row.detailActivity?.validatorCPC },
                        { label: "Clasificador CPC", value: (row) => row.detailActivity?.clasificatorCPC },
                        { label: "Validador sección CPC", value: (row) => row.detailActivity?.sectionValidatorCPC },
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

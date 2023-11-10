import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import puppeteer from 'puppeteer';
import ProjectProvider from "@ioc:core.ProjectProvider";
import { readFileSync } from "fs";
import Application from "@ioc:Adonis/Core/Application";
import { format } from 'date-fns';
import { ApiResponse } from 'App/Utils/ApiResponses';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import IndicatorsProvider from "@ioc:core.IndicatorsProvider";
import EntitiesProvider from '@ioc:core.EntitiesProvider';
import CoreProvider from '@ioc:core.CoreProvider';
import ImpactRatingProvider from '@ioc:core.ImpactRatingProvider';
import ImpactLevelProvider from '@ioc:core.ImpactLevelProvider';
import ImpactTypeProvider from '@ioc:core.ImpactTypeProvider';
import StageProvider from '@ioc:core.StageProvider';
import ComponentsProvider from '@ioc:core.ComponentsProvider';
import { IActivitiesProject, IDemographicCharacteristics, IIndicatorAction, IIndicatorIndicative, ISourceFunding, IprofitsIncome } from 'App/Interfaces/ProjectInterfaces';


const { es } = require('date-fns/locale');



export default class GeneratePdfController {

  public async generatePdf({ params, response }: HttpContextContract) {
    const projectId = params.id;
    const basePath = "images/";

    const logoPath = Application.makePath(basePath, "logo.png");
    const footerPath = Application.makePath(basePath, "footer.png");

    
    const fechaActual = new Date();

    const fechaFormateada = format(fechaActual, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
    let DateProjectArchive = "";



    try {
     const project = await ProjectProvider.getProjectById(projectId);
     let DateProject = ""
     if (project.data.dateCreate !== null && project.data.dateCreate !== undefined) {
        const fechaIso = project.data.dateCreate.toString();
        const DateCreate = new Date(fechaIso);
        const dia = DateCreate.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega ceros a la izquierda si es necesario
        const mes = (DateCreate.getMonth() + 1).toString().padStart(2, '0'); // El mes es de 0 a 11, por eso se suma 1
        const anio = DateCreate.getFullYear();
        const DateC = `${dia}/${mes}/${anio}`;
        const DateA = `${dia}${mes}${anio}`;
        DateProject = DateC;
        DateProjectArchive = DateA;
    }
      const contentHTML = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Registro Proyecto de Inversión</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet" />
          <style>
            body {
                margin: 0;
                font-size: 17px;
                font-family: "Rubik", sans-serif;
            }

            .mt-small {
            margin-top: 1.5rem;
            }

            .container {
                margin: 0 auto;
                max-width: 600px;
                padding: 20px;
            }

            .container-direction {
                text-align: center;
                margin-bottom: 5px;
            }

            .container-direction p {
                font-size: 15px;
                font-weight: 700;
            }

            .container-direction-register {
                text-align: center;
                margin-bottom: 50px;
            }

            .container-direction-register p {
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 30px;
            }

            .section {
                margin-bottom: 20px;
            }

            .section-title {
                font-size: 18px;
                font-weight: 500;
            }

            .section-content {
                margin-top: 10px;
            }
      
            .footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                text-align: center;
                margin-bottom: 3rem;
            }
            
            .ReferralDocument__container__footer {
                display: flex;
                justify-content: center;
            }
            
            .ReferralDocument__container__footer > div {
                width: 260px;
            }
            .ReferralDocument__container__footer > div > img {
                width: 100%;
            }
            .ReferralDocument__container__logo {
                display: flex;
                justify-content: center;
                margin-bottom: 2.8rem;
            }
            .ReferralDocument__container__logo >  div > img {
                width: 100%;
            }
            .ReferralDocument__container__logo > div {
                width: 400px;
            }

            .section {
                margin-bottom: 20px;
                margin-top: 20px;
            }

            .section-title {
                font-size: 15px;
                font-weight: 700;
            }

            .section-content {
                margin-top: 15px;
                margin-bottom: 15px;
            }
            .date-div{
                margin: 0 97px;
                margin-bottom: 2.8rem;
            }
          </style>
      </head>
      
      <body>
          <div class="ReferralDocument__container__logo">
            <div>
                <img src="data:image/png;base64,${readFileSync(
                    logoPath).toString("base64")}" alt="" />
            </div>
          </div>

          <div class="date-div">
                <p>Medellín, ${fechaFormateada}</p>
          </div>
          <div class = "container-direction">
            <p>DIRECCIÓN GENERAL<br>
             DIRECCIONAMIENTO ESTRATÉGICO - PLANEACIÓN ESTRATÉGICA <br>
             AGENCIA DE EDUCACIÓN POSTSECUNDARIA DE MEDELLÍN - SAPIENCIA
            </p>
          </div>
          <div class="container">
              <div class="container-direction-register">
                  <p>REGISTRO PROYECTO DE INVERSIÓN</p>
              </div>
              <div class="section">
                  <div class="section-title">FECHA DE REGISTRO</div>
                  <div class="section-content">${DateProject}</div>
              </div>
              <div class="section">
                  <div class="section-title">CÓDIGO BPIN</div>
                  <div class="section-content">${project.data.bpin}</div>
              </div>
              <div class="section">
                  <div class="section-title">NOMBRE DEL PROYECTO</div>
                  <div class="section-content">${project.data.project}</div>
              </div>
              <div class="section">
                  <div class="section-title">ORDENADOR DEL GASTO</div>
                  <div class="section-content">${project.data.order}</div>
              </div>
              <div class="section">
                  <div class="section-title">DEPENDENCIA RESPONSABLE EJECUCIÓN</div>
                  <div class="section-content">${project.data.dependency}</div>
              </div>
              <div class="section">
                  <div class="section-title">VERSIÓN</div>
                  <div class="section-content">${project.data.version}</div>
              </div>
              <div class="section">
                  <div class="section-title">OBSERVACIONES</div>
                  <div class="section-content">${project.data.observations}</div>
              </div>
          </div>
          <div class="footer">
             <div class="ReferralDocument__container__footer mt-small">
                    <div>
                        <img src="data:image/png;base64,${readFileSync(
                            footerPath
                        ).toString("base64")}" alt="" />
                    </div>
                </div>
          </div>
      </body>
      
      </html>
      `;
    // CONFIGURACION PARA AMBIENTE DE PRODUCCION DEV   
       const browser = await puppeteer.launch({
          headless: "new",
          args: ["--no-sandbox"],
          executablePath: "/usr/bin/chromium",
       });

      //const browser = await puppeteer.launch();
      const page = await browser.newPage();
     
      await page.setViewport({ width: 595, height: 842 });
      await page.setContent(contentHTML, {
        waitUntil: "domcontentloaded",
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
    });
    await page.emulateMediaType("screen");
    
      await browser.close();

      response.header('Content-Type', 'application/pdf');
      const nombreArchivo = `Registro_proyecto_${project.data.bpin}_ ${DateProjectArchive}.pdf`;
      response.header('Content-Disposition', `inline; filename=${nombreArchivo}`);
      response.status(200).send(pdfBuffer);
    } catch (err) {
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
    }
  }

  public async CreatePdfConsolidate({ params, response }: HttpContextContract) { 

    const projectId = params.id;
    const basePath = "images/";

    const logoPath = Application.makePath(basePath, "logo.png");
    const footerPath = Application.makePath(basePath, "footer.png");

    let DateProjectArchive = "";

    try {
     const project = await ProjectProvider.getProjectById(projectId);
     const typeIndicators = await IndicatorsProvider.getIndicatorType();
     
     const processData = await EntitiesProvider.getEntities();
     const dependencyData = await EntitiesProvider.getEntitiesDependency();
     const positionActorsData = await EntitiesProvider.getEntitiesPosition();
     const impactRatingData = await ImpactRatingProvider.getImpactRating();
     const impactLevelData = await ImpactLevelProvider.getImpactLevel();
     const impactTypeData = await ImpactTypeProvider.getImpactType();
     const measurementData = await CoreProvider.getParametersByGrouper("UNIDAD_MEDIDA_OBJETIVOS");
     const regionData = await CoreProvider.getParametersByGrouper("REGION")
     const departamentData = await CoreProvider.getParametersByGrouper("DEPARTAMENTOS")
     const MunicipioData = await CoreProvider.getParametersByGrouper("MUNICIPIOS");
     const generesData = await CoreProvider.getParametersByGrouper("GENEROS")
     const oldData = await CoreProvider.getParametersByGrouper("RANGOS_DE_EDAD")
     const etniquesData = await CoreProvider.getParametersByGrouper("GRUPOS_ETNICOS")
     const  lge = await CoreProvider.getParametersByGrouper("LGE_LISTADOS_GENERICOS")
     const stages = await StageProvider.getStages();
     const components = await ComponentsProvider.getComponents();
     const indicatorDNP = await IndicatorsProvider.getIndicatorDNP();
     const indicatorsComponent = await IndicatorsProvider.getIndicatorsComponent();
     const indicatorsLine = await IndicatorsProvider.getStrategicLine();
     const indicatorProgramation = await IndicatorsProvider.getProgramation();
     const indicatorName = await IndicatorsProvider.getIndicatorName();
     const entity = await EntitiesProvider.getEntity();
     const  resource = await EntitiesProvider.getResource();
     const typeRisk = await EntitiesProvider.getEntitiesTypesRisks();
     const impactRisk = await EntitiesProvider.getEntitiesImpact()
     const probabilityRisk = await EntitiesProvider.getEntitiesProbability();

     const LevelData  = [
        {
            name: "Objetivo general",
            value: 1,
        },
        {
            name: "Producto",
            value: 2,
        },
        {
            name: "Actividad",
            value: 3,
        }
    ];

    const ResumeData = [
        {
            name: "Objetivo general",
            value: 1,
        },
        {
            name: "objetivo específico",
            value: 2,
        },
        {
            name: "Actividades",
            value: 3,
        }
    ];

     const objectivesData =  project.data.causes?.map(cause => {
        return {
            name: `${cause.consecutive}. ${cause.description}`,
            value: cause.consecutive
        }
    });

    const productsData=  project.data.activities?.map(data => {
        return {
            name: `${data.productMGA}. ${data.productDescriptionMGA}`,
            value: data.productMGA
        }
    }) ;

    const activities = project.data.activities?.map((cause) => {
        return {
            name: `${cause.activityMGA}. ${cause.activityDescriptionMGA}`,
            value: cause.activityMGA
        }
    });

    let totalCostDetail = 0;

    project.data.activities?.map(activitiesDetail => {
        activitiesDetail.detailActivities?.reduce((accumulator, detailActivities) => {
            return  totalCostDetail = accumulator + (detailActivities.amount * detailActivities.unitCost);
        }, 0)
    });



   const  dataAcumulativo= [{ name: "Si", value: 1 }, { name: "No", value: 0 }]




     const measurement = project.data.measurement;

     const unidadEncontrada = measurementData.find(item => parseInt(item.itemCode) === measurement)?.itemDescription;



   

      function formaterNumberToCurrency(number) {
        const formatter = new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 2,
        });
      
        return formatter.format(number);
      }
     

     let DateProject = ""
     if (project.data.dateCreate !== null && project.data.dateCreate !== undefined) {
        const fechaIso = project.data.dateCreate.toString();
        const DateCreate = new Date(fechaIso);
        const dia = DateCreate.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega ceros a la izquierda si es necesario
        const mes = (DateCreate.getMonth() + 1).toString().padStart(2, '0'); // El mes es de 0 a 11, por eso se suma 1
        const anio = DateCreate.getFullYear();
        const DateC = `${dia}/${mes}/${anio}`;
        const DateA = `${dia}${mes}${anio}`;
        DateProject = DateC;
        DateProjectArchive = DateA;
    }
      const contentHTML = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Registro Proyecto de Inversión</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet" />
          <style>
            body {
                margin: 0;
                font-family: "Rubik", sans-serif;
                padding: 0;
            }

            .mt-small {
                margin-top: 1.5rem;
            }

            .container {
                margin: 0 auto;
                max-width: 600px;
            }

            .container .section {
                margin-bottom: 15px;
                margin-top: 15px;
            }

            .container  .section-title {
                font-size: 17px;
                font-weight: 700;
            }

            .container  .section-content-name{
                font-size: 16px;
            }

            .container .section-name {
                display: flex;
                align-items: center;
               
            }

            .container  .section-title-name {
                font-size: 17px;
                font-weight: 700;
                margin-right: 10px;
                margin-bottom: 20px;
                margin-top: 15px;
            }

            .container  .section-content {
                margin-top: 12px;
                margin-bottom: 12px;
            }

            .container-direction {
                text-align: center;
                margin-bottom: 5px;
                margin-top: 8px;
            }

            .container-direction p {
                font-size: 17px;
                font-weight: 700;
            }


            .section-object{
                grid-template-columns: 0.6fr 3fr;
                grid-template-rows: 1fr;
                padding: 0.9rem 0px;
                row-gap: 1.7rem;
                column-gap: 1rem;
                display: grid;
            }

            .section-object-2{
                grid-template-columns: 2fr 5fr;
                grid-template-rows: 1fr;
                padding: 0.5rem 0px;
                row-gap: 1rem;
                column-gap: 1rem;
                display: grid;
            }



            .container-grid-registro{
                grid-template-columns: 1fr 1fr 1fr;
                grid-template-rows: 1fr;
                row-gap: 0.1rem;
                column-gap: 3rem;
                display: grid;
            }

            .container-grid-registro .section {
                margin-bottom: 0;
                font-size: 16px;
            }
            
            .container-grid-registro .section-title {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
            }
            
            .container-grid-registro .section-content {
                margin-top: 10px;
                font-size: 16px;
            }

            ## ESTILOS PARA LA TABLA DE CAUSAS 

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 25px; /* Espaciado superior */
                margin-bottom:25px;
            }
        
            th, td {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 10px 10px;
                margin-bottom:20px;
                margin-top:20px;
                
            }
        
            th {
                background-color: #f2f2f2; /* Color de fondo para las celdas de encabezado */
                margin-bottom:10px;
                margin-top:20px;
            }
        
            tr:nth-child(even) {
                background-color: #f2f2f2; /* Color de fondo para filas pares */
            }
        
            tr:nth-child(odd) {
                background-color: #ffffff; /* Color de fondo para filas impares */
            }

            ## estilos tabla actividades

            .tabla {
                display: grid;
                grid-template-rows: 1fr;
              }
              
              .item {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                row-gap: 30px;
                column-gap: 45px;
              }
              
              .prop {
                display: flex;
                flex-direction: column;
              }
              
              .title {
                font-weight: bold;
                margin-bottom : 10px; 
                margin-top: 10px;
              }

              .table-container {
                max-width: 100px;        
            }

          </style>
      </head>
      
      <body>
      
          <div class="container">
                <div class="section">
                  <div class="section-title">1. Registro</div>
                </div>
                <div class="section-name">
                    <div class="section-title-name">Nombre del proyecto:</div> 
                    <div class="section-content-name">${project.data.project}</div>
                </div>

                <div class ="container-grid-registro">
                    <div class="section">
                        <div class="section-title">Código BPIN</div>
                        <div class="section-content">${project.data.bpin}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Período inicial</div>
                        <div class="section-content">${project.data.dateFrom}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Período final</div>
                        <div class="section-content">${project.data.dateTo}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Proceso</div>
                        <div class="section-content">${processData.data.find(process => process.id == project.data.process)?.description}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Localización</div>
                        <div class="section-content">Postsecundaria - SAPIENCIA</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Dependencia</div>
                        <div class="section-content">${dependencyData.data.find(dependency => dependency.id == project.data.dependency)?.description}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Fecha de creación</div>
                        <div class="section-content">${DateProject}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Formulador</div>
                        <div class="section-content">${project.data.formulation}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Rol</div>
                        <div class="section-content">${project.data.rol}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Ordenador del gasto</div>
                        <div class="section-content">${project.data.order}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Versión</div>
                        <div class="section-content">${project.data.version}</div>
                    </div>
                </div>
                
              <div class="section-object">
                    <div class="section-title">Objeto</div>
                    <div>${project.data.object}</div>
                </div>

                <div class="section">
                  <div class="section-title">2. Identificación</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Plan de desarrollo</div> 
                </div>

                <div class="section-name">
                    <div class="section-title-name">Plan nacional de desarrollo</div> 
                </div>

                <div class="section-object">
                    <div class="section-title">Pacto</div>
                    <div>${project.data.pnd_pacto}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Línea</div>
                    <div>${project.data.pnd_linea}</div>
                </div>

                <div class="section-object">
                    <div class="section-title">Programa</div>
                    <div>${project.data.pnd_programa}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Plan de desarrollo departamental</div> 
                </div>

                <div class="section-object">
                    <div class="section-title">Línea</div>
                    <div>${project.data.pdd_linea}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Componente</div>
                    <div>${project.data.pdd_componentes}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Programa</div>
                    <div>${project.data.pdd_programa}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Plan de desarrollo distirtal</div> 
                </div>

                <div class="section-object">
                    <div class="section-title">Línea</div>
                    <div>${project.data.pdi_linea}</div>
                </div>

                <div class="section-object">
                    <div class="section-title">Componente</div>
                    <div>${project.data.pdi_componentes}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Programa</div>
                    <div>${project.data.pdi_programa}</div>
                </div>


                <div class="section-name">
                    <div class="section-title-name">Descripción del problema</div> 
                </div>
                <div class="section-object">
                    <div class="section-title">Descripción del problema</div>
                    <div>${project.data.problemDescription}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Magnitud del problema</div>
                    <div>${project.data.magnitude}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Problema central</div>
                    <div>${project.data.centerProblem}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Causas que generan el problema</div> 
                 </div>

                 <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.causes?.map(directa => 
                        {
                        return  `
                            <tr>
                                <td>Directo</td>
                                <td>${directa.consecutive} ${directa.description}</td>
                            </tr>
                            ${directa.childrens?.map(indirecta => `
                                <tr>
                                    <td>Indirecto</td>
                                    <td>${indirecta.consecutive} ${indirecta.description}</td>
                                </tr>
                            `).join('')}`
                        }).join('')
                    }
                    </tbody>
                </table>

                <div class="section-name">
                     <div class="section-title-name">Efectos del problema</div> 
                </div>

                

                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.effects?.map(directa => `
                            <tr>
                                <td>Directo</td>
                                <td> ${directa.consecutive} ${directa.description}</td>
                            </tr>
                            ${directa.childrens?.map(indirecta => `
                                <tr>
                                    <td>Indirecto</td>
                                    <td> ${indirecta.consecutive} ${indirecta.description}</td>
                                </tr>
                            `).join('')}`).join('')
                    }
                    </tbody>
                </table>

                </br>

                <div class="section-name">
                     <div class="section-title-name">Objetivos</div> 
                </div>
                
                <div class="section-object">
                    <div class="section-title">Objetivo general</div>
                    <div>${project.data.centerProblem}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Listado de objetivos específicos</div> 
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.causes?.map(directa => `
                        <tr>
                            <td>Directo</td>
                            <td>${directa.consecutive} ${directa.description}</td>
                        </tr>
                        ${directa.childrens?.map(indirecta => `
                            <tr>
                                <td>Indirecto</td>
                                <td>${indirecta.consecutive} ${indirecta.description}</td>
                            </tr>
                        `).join('')}`).join('')
                    }
                    </tbody>
                </table>

                <div class="section-name">
                    <div class="section-title-name">Listado de fines</div> 
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.effects?.map(directa => `
                            <tr>
                                <td>Directo</td>
                                <td> ${directa.consecutive} ${directa.description}</td>
                            </tr>
                            ${directa.childrens?.map(indirecta => `
                                <tr>
                                    <td>Indirecto</td>
                                    <td> ${indirecta.consecutive} ${indirecta.description}</td>
                                </tr>
                            `).join('')}`).join('')
                    }
                    </tbody>
                </table>

                </br>

                <div class="section-object-2">
                    <div class="section-title">Indicadores objetivo central </div>
                    <div>${project.data.indicators}</div>
                </div>

                <div class="section-object-2">
                    <div class="section-title">Unidad de medida</div>
                    ${
                        unidadEncontrada
                    }
                  
                </div>

                <div class="section-object-2">
                    <div class="section-title">Meta</div>
                    <div> ${formaterNumberToCurrency(project.data.goal)}</div>
                </div>

                <br> <br> <br> 


                <div class="section-name">
                    <div class="section-title-name">Actores participantes</div> 
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Actor</th>
                            <th>Interés/Expectativa</th>
                            <th>Posición</th>
                            <th>Contribución</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.actors?.map(actors => `
                            <tr>
                                <td>${actors.actor}</td>
                                <td>${actors.expectation}</td>
                                <td>${positionActorsData.data.find(position => position.id == actors.position)?.description}</td>
                                <td>${actors.contribution}</td>
                            </tr>
                        `).join('')
                    }
                    </tbody>
                </table>

                </br> </br>

                <div class="section-name">
                    <div class="section-title-name">Población</div> 
                </div>

                <div class="section-name">
                    <div class="section-title-name">Población objetivo de la intervención</div> 
                </div>

                <div class="section-object-2">
                    <div class="section-title">Número de personas objetivo</div>
                    <div>${project.data.objectivePeople}</div>
                </div>
                <div class="section-object-2">
                    <div class="section-title">Fuente de la información</div>
                    <div>${project.data.informationSource}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Localización</div> 
                </div>

                <div class="section-object-2">
                    <div class="section-title">Región</div>
                    <div>${regionData.find(item => parseInt(item.itemCode) === project.data.region)?.itemDescription}</div>
                </div>
                <div class="section-object-2">
                    <div class="section-title">Departamento</div>
                    <div>${departamentData.find(item => parseInt(item.itemCode) === project.data.departament)?.itemDescription != undefined ? departamentData.find(item => parseInt(item.itemCode) === project.data.departament)?.itemDescription : "" }</div>
                </div>

                <div class="section-object-2">
                    <div class="section-title">Distrito/Municipio</div>
                    <div>${MunicipioData.find(item => parseInt(item.itemCode) === project.data.district)?.itemDescription != undefined ? MunicipioData.find(item => parseInt(item.itemCode) === project.data.district)?.itemDescription : "" }</div>
                </div>
                <div class="section-object-2">
                    <div class="section-title">Resguardo</div>
                    <div>${project.data.shelter  != null ? project.data.shelter : ""}</div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Clasificación</th>
                            <th>Detalle</th>
                            <th>No. de personas</th>
                            <th>Fuente de Información</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.classifications?.map(Classifications => 
                        {
                            let entity = "";
                            if (Classifications.clasification === 1) {
                                entity = `
                                    <td>
                                        Género
                                    </td>
                                    <td>${generesData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                `;
                            } else if (Classifications.clasification === 2) {
                                entity = `
                                    <td>
                                        Rango de edad
                                    </td>
                                    <td>${oldData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                `;
                            } else if (Classifications.clasification === 3) {
                                entity = `
                                    <td>
                                        Grupo étnico
                                    </td>
                                    <td>${etniquesData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                `;
                            } else if (Classifications.clasification === 4) {
                                entity = `
                                    <td>
                                        Población vulnerable
                                    </td>
                                    <td>${lge.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                `;
                            } 
                            return`
                                <tr>
                                        ${entity}
                                    <td>${Classifications.numPerson != null ? Classifications.numPerson : ""}</td>
                                    <td>${Classifications.infoSource}</td>
                                </tr>
                            `
                        }).join('')
                    }
                    </tbody>
                </table>

                <div class="section">
                    <div class="section-title">3. Preparación</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Análisis Técnico</div> 
                </div>

                <div class="section-object">
                    <div class="section-title">Nombre alternativa</div>
                    <div>${project.data.alternative}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Resumen alternativa</div>
                    <div>${project.data.resumeAlternative}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Necesidades</div> 
                </div>

                <div class="section-object">
                    <div class="section-title">Nombre alternativa</div>
                    <div>${project.data.alternative}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Objetivo general</div>
                    <div>${project.data.centerProblem}</div>
                </div>



                <br> <br>  <br> <br> <br> <br>

                <div class="section-name">
                    <div class="section-title-name">Listado objetivos específicos</div> 
                </div>
                
                <table style = "  font-size: 15px; ">
                    <thead>
                        <tr>
                            <th>Objetivo</th>
                            <th>Acciones de intervención</th>
                            <th>Bienes/Servicios</th>
                            <th>Cuantificación</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.specificObjectives?.map(specificObjectives => `
                            <tr>
                                <td>${specificObjectives.objetive.consecutive} ${specificObjectives.objetive.description}</td>
                                <td>${specificObjectives.interventionActions}</td>
                                <td>
                                ${specificObjectives.estatesService.map(estatesService => `
                                    <div style = "margin-bottom : 20px; margin-top: 20px;" >
                                    ${estatesService.id}.${estatesService.description}
                                    </div>
                                `).join('')}
                                </td>
                                <td>${specificObjectives.quantification}</td>
                            </tr>
                        `).join('')
                    }
                    </tbody>
                </table>

                <br><br>

                <div class="section-name">
                    <div class="section-title-name">Capacidad</div> 
                 </div>

                <div class="section-object">
                    <div class="section-title">Nombre alternativa</div>
                    <div>${project.data.alternative}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Descripción Tecnica</div>
                    <div>${project.data.descriptionCapacity}</div>
                </div>

                <div class="section-object">
                    <div class="section-title">Unidad de medida</div>
                    <div>${ unidadEncontrada}</div>
                </div>
                <div class="section-object">
                    <div class="section-title">Capacidad generada</div>
                    <div>${project.data.capacityGenerated}</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Ánalisis ambiental</div> 
                 </div>

                <div class="section-object">
                    <div class="section-title">Diagnóstico ambiental</div>
                    <div>${project.data.environmentDiagnosis}</div>
                </div>

                </br> </br>
                
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de impacto</th>
                            <th>Impacto</th>
                            <th>Nivel de impacto</th>
                            <th>Clasificación</th>
                            <th>Medidas de mitigación</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.environmentalEffects?.map(environmentalEffects => `
                            <tr>
                                <td>${impactTypeData.data.find(type => type.id == environmentalEffects.type)?.description }</td>
                                <td>${environmentalEffects.impact != null ? environmentalEffects.impact : ""}</td>
                                <td>${impactLevelData.data.find(type => type.id == environmentalEffects.level)?.description }</td>
                                <td>${impactRatingData.data.find(type => type.id ==  environmentalEffects.classification)?.description}</td>
                                <td>${environmentalEffects.measures != null  ? environmentalEffects.measures :"" }</td>
                            </tr>
                        `).join('')
                    }
                    </tbody>
                </table>

            <div class="section-name">
                <div class="section-title-name">Actividades</div> 
            </div>

            ${
                project.data.activities?.map(activities =>
                `
                <div class="section-object-2">
                    <div class="section-title">Objetivo específico</div>
                    <div>${activities.objetiveActivity.description}</div>
                </div>

                <br>
                    <div class="tabla" style = "margin-bottom: 90px;">
                        <div class="item">
                            <div class="prop">
                                <span class="title">Producto MGA</span>
                                <span>${activities.productMGA}</span>
                            </div>
                            <div class="prop">
                                <span class="title">Etapa</span>
                                <span>${stages.data.find(stage => stage.id === activities.stageActivity)?.description }</span>
                            </div>
                            <div class="prop">
                                <span class="title">Actividad MGA</span>
                                <span>${activities.activityMGA} ${activities.activityDescriptionMGA}</span>
                            </div>
                            ${
                                activities.budgetsMGA?.map(budget => `
                                <div class="prop">
                                    <span class="title">Año ${budget.year}</span>
                                    <span> ${formaterNumberToCurrency(budget.budget)}</span>
                                </div>
                              
                                `).join('')
                            }

                            <div class="prop">
                            <span class="title">Presupuesto</span>
                                <span> ${
                                    formaterNumberToCurrency(activities.budgetsMGA[0].budget + activities.budgetsMGA[1].budget +  activities.budgetsMGA[2].budget + activities.budgetsMGA[3].budget + activities.budgetsMGA[4].budget)}</span>
                            </div>

                            <div class="prop">
                            <span class="title">Vigencia</span>
                                <span>${activities.validity}</span>
                            </div>

                            <div class="prop">
                            <span class="title">Año</span>
                                <span> ${activities.year}</span>
                            </div>

                            ${
                                activities.detailActivities?.map(detailActivities => {
                                    const currentCost = detailActivities.amount * detailActivities.unitCost;
                                    return `
                                    <div class="prop">
                                        <span class="title">No. y descripción actividad detallada</span>
                                        <span> ${detailActivities.consecutive} ${detailActivities.detailActivity}</span>
                                    </div>
                                    
                                    <div class="prop">
                                        <span class="title"> Unidad de medida</span>
                                        <span> ${measurementData.find(item => parseInt(item.itemCode) === detailActivities.measurement)?.itemDescription}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Componente </span>
                                        <span> ${components.data.find(stage => stage.id === detailActivities.component)?.description }</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Cantidad </span>
                                        <span> ${detailActivities.amount}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Costo unitario </span>
                                        <span> ${formaterNumberToCurrency(detailActivities.unitCost)}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Costo total </span>
                                        <span> ${formaterNumberToCurrency(currentCost)}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">POSPRE </span>
                                        
                                        <span> ${detailActivities.pospre ? detailActivities.pospre : ""}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Validador CPC </span>
                                        <span>  ${detailActivities.validatorCPC ? detailActivities.validatorCPC : ""}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Clasificador CPC </span>
                                        <span> ${detailActivities.clasificatorCPC ? detailActivities.clasificatorCPC : ""}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Validador sección CPC </span>
                                        <span> ${detailActivities.sectionValidatorCPC ? detailActivities.sectionValidatorCPC : ""}</span>
                                    </div>

                                    <div class="prop">
                                        <span class="title">Costo total actividades detalladas </span>
                                        <span>  ${detailActivities.unitCost ?  formaterNumberToCurrency(Number(totalCostDetail)) : ""}</span>
                                    </div>
                            
                                    `;
                                }).join('')
                            }
                        </div>
                    </div>
                `).join('')
            }

                <div class="section-name">
                    <div class="section-title-name">Riesgos</div> 
                </div>

                <div class="table-container">
                    <table style = "  font-size: 10px; ">
                        <thead>
                            <tr>
                                <th>Nivel</th>
                                <th>Riesgo relacionado</th>
                                <th>Tipo de riesgo</th>
                                <th>Descripción riesgo</th>
                                <th>Probabilidad</th>
                                <th>Impacto</th>
                                <th>Efectos</th>
                                <th>Medidas de mitigación</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${
                            project.data.risks?.map(risks => 
                            {
                                let entity = "";
                                
                                if (risks.level === 1) {
                                    entity = `
                                        <td>
                                            ${project.data.centerProblem}
                                         </td>
                                    `;
                                } else if (risks.level === 2) {
                                    const levelRisk = productsData?.find(item => item.value == risks.risk)?.name
        
                                    entity = `
                                    <td>
                                        ${levelRisk}
                                    </td>                          
                                    `;
                                } else if (risks.level === 3) {
                                    
                                    const levelActivities = activities?.find(item => item.value == risks.risk)?.name
        
                                    entity = `
                                        <td>
                                            ${levelActivities}
                                        </td>                          
                                    `;
                                }
                                return`
                                    <tr>
                                    <td>${LevelData.find(item => item.value === risks.level)?.name }</td>
                                        ${entity}
                                    <td>${typeRisk.data.find(position => position.id == risks.typeRisk)?.description }</td>
                                    <td>${risks.descriptionRisk}</td>
                                    <td>${probabilityRisk.data.find(position => position.id == risks.probability)?.description}</td>
                                    <td>${impactRisk.data.find(position => position.id ==  risks.impact)?.description}</td>
                                    <td>${risks.effects != null ? risks.effects : "" }</td>
                                    <td>${risks.mitigation != null ? risks.mitigation : ""}</td>
                                    </tr>
                                `
                            }).join('')
                        }
                        </tbody>
                    </table>
                </div>

                <br> <br> <br> <br>

                <div class="section">
                    <div class="section-title">4. Programación</div>
                </div>

                <div class="section-name">
                    <div class="section-title-name">Ingresos y beneficios </div> 
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                            <th>Unidad de medida</th>

                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.profitsIncome?.map(profitsIncome => `
                            <tr>
                                <td>${profitsIncome.type}</td>
                                <td>${profitsIncome.description}</td>
                                <td>${measurementData.find(item => parseInt(item.itemCode) === profitsIncome.unit)?.itemDescription}</td>
                            </tr>
                        `).join('')
                    }
                    </tbody>
                </table>

                <div class="section-name">
                    <div class="section-title-name">Clasificación</div> 
                </div>
                ${
                    project.data.profitsIncome?.map(profitsIncome => `
                        <table>
                            <thead>
                                <tr>
                                    <th>Período</th>
                                    <th>Cantidad</th>
                                    <th>Valor unitario</th>
                                    <th>Valor total financiero</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    profitsIncome.period?.map(periodData => `
                                        <tr>
                                            <td>${periodData.period}</td>
                                            <td>${periodData.quantity}</td>
                                            <td>${formaterNumberToCurrency(periodData.unitValue)}</td>
                                            <td>${formaterNumberToCurrency(periodData.financialValue)}</td>
                                        </tr>
                                    `).join('')
                                }
                            </tbody>
                        </table>
                    `).join('')
                }
                <br><br><br>

            <div class="section-name">
                <div class="section-title-name">Fuentes de financiación</div> 
            </div>

            ${
                project.data.sourceFunding?.map(sourceFunding => `
        
                    <div class="tabla" style = "margin-bottom: 70px;">
                        <div class="item">
                            <div class="prop">
                                <span class="title">Etapa</span>
                                <span>${ stages.data.find(stage => stage.id === sourceFunding.stage)?.description  }</span>
                            </div>
                            <div class="prop">
                                <span class="title">Tipo entidad</span>
                                <span>${ entity.data.find(stage => stage.id === sourceFunding.typeEntity)?.description  }</span>
                            </div>
                            <div class="prop">
                                <span class="title">Entidad</span>
                                <span>${sourceFunding.entity} </span>
                            </div>

                            <div class="prop">
                            <span class="title">Tipo de recurso</span>
                                <span> ${ resource.data.find(stage => stage.id === sourceFunding.resource)?.description  }</span>
                            </div>

                            <div class="prop">
                            <span class="title">Año 0 </span>
                                <span>${formaterNumberToCurrency(sourceFunding.year0)}</span>
                            </div>

                            <div class="prop">
                            <span class="title">Año 1 </span>
                                <span>${formaterNumberToCurrency(sourceFunding.year1)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Año 2 </span>
                                <span>${formaterNumberToCurrency(sourceFunding.year2)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Año 3 </span>
                                <span> ${formaterNumberToCurrency(sourceFunding.year3)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Año 4 </span>
                                <span> ${formaterNumberToCurrency(sourceFunding.year4)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')
            }

            
        <div class="section-name">
            <div class="section-title-name">Indicadores</div> 
        </div>

        ${
            project.data.indicatorsIndicative?.map(indicatorsIndicative => `
          
            <div class="section-object-2">
                <div class="section-title">Tipo de indicador:</div>
                <div>${typeIndicators.data.find(type => type.id == indicatorsIndicative.type)?.description}</div>
            </div>
    
                <div class="tabla" style = "margin-bottom: 70px;">
                    <div class="item">
                        <div class="prop">
                            <span class="title">Línea estratégica</span>
                            <span>${ indicatorsLine.data.find(process => process.id == indicatorsIndicative?.line)?.description  }</span>
                        </div>
                        <div class="prop">
                            <span class="title">Componente</span>
                            <span>${ indicatorsComponent.data.find(process => process.id ==  indicatorsIndicative?.component)?.description   }</span>
                        </div>
                        <div class="prop">
                            <span class="title">Programa</span>
                            <span>${ indicatorProgramation.data.find(process => process.id == indicatorsIndicative?.program)?.description } </span>
                        </div>

                        <div class="prop">
                            <span class="title">Nombre indicador</span>
                            <span>${ indicatorName.data.find(process => process.id ==  indicatorsIndicative?.indicator )?.description   } </span>
                        </div>

                        <div class="prop">
                        <span class="title">Unidad de medida</span>
                            <span> ${measurementData.find(item => parseInt(item.itemCode) === indicatorsIndicative.measurement)?.itemDescription }</span>
                        </div>

                        <div class="prop">
                        <span class="title">Plan de desarrollo </span>
                            <span>${indicatorsIndicative.developmentPlan ? indicatorsIndicative?.developmentPlan :""}</span>
                        </div>

                        <div class="prop">
                            <span class="title">Producto MGA</span>
                            <span>${productsData?.find(stage => stage.value === indicatorsIndicative.productMGA)?.name}</span>
                        </div>

                        <div class="prop">
                        <span class="title">Meta Año 0 </span>
                            <span> ${formaterNumberToCurrency(indicatorsIndicative.year0)}</span>
                        </div>

                        <div class="prop">
                        <span class="title">Meta Año 1 </span>
                            <span>${formaterNumberToCurrency(indicatorsIndicative.year1)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta Año 2 </span>
                            <span>${formaterNumberToCurrency(indicatorsIndicative.year2)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta Año 3 </span>
                            <span>${formaterNumberToCurrency(indicatorsIndicative.year3)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta Año 4 </span>
                            <span>${formaterNumberToCurrency(indicatorsIndicative.year4)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta global </span>
                            <span> ${ formaterNumberToCurrency(indicatorsIndicative.year0 + indicatorsIndicative.year1 + indicatorsIndicative.year2 + indicatorsIndicative.year3 + indicatorsIndicative.year4)}</span>
                        </div>
                    </div>
                </div>
            `).join('')
        }

        ${
            project.data.indicatorsAction?.map(indicatorsAction => `
          
            <div class="section-object-2">
                <div class="section-title">Tipo de indicador:</div>
                <div>${typeIndicators.data.find(type => type.id == indicatorsAction.type)?.description}</div>
            </div>
    
                <div class="tabla" style = "margin-bottom: 70px;">
                    <div class="item">
                        <div class="prop">
                            <span class="title">Objetivo específico directo</span>
                            <span> ${objectivesData?.find(stage => stage.value === indicatorsAction?.objective)?.name}</span>
                        </div>
                        <div class="prop">
                            <span class="title">Producto MGA</span>
                            <span>${productsData?.find(stage => stage.value === indicatorsAction.productMGA)?.name}</span>
                        </div>
                        <div class="prop">
                            <span class="title">Indicador DNP</span>
                            <span>${indicatorDNP.data.find(process => process.id == indicatorsAction?.dpnIndicator)?.description } </span>
                        </div>

                        <div class="prop">
                            <span class="title">Código DNP indicador</span>
                            <span>${indicatorsAction.dpn ? indicatorsAction?.dpn :""} </span>
                        </div>

                        <div class="prop">
                        <span class="title">Unidad de medida</span>
                            <span> ${measurementData.find(item => parseInt(item.itemCode) === indicatorsAction.measurement)?.itemDescription }</span>
                        </div>

                        <div class="prop">
                        <span class="title">Código valor estadístico
                        </span>
                            <span>${indicatorsAction.staticValueCode ? indicatorsAction?.staticValueCode :""}</span>
                        </div>

                        <div class="prop">
                        <span class="title">Nombre valor estadístico</span>
                            <span>${indicatorsAction.staticValue ? indicatorsAction?.staticValue :""}</span>
                        </div>

                        <div class="prop">
                        <span class="title">Meta Año 0 </span>
                            <span>${formaterNumberToCurrency(indicatorsAction.year0)}</span>
                        </div>

                        <div class="prop">
                        <span class="title">Meta Año 1 </span>
                            <span>${formaterNumberToCurrency(indicatorsAction.year1)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta Año 2 </span>
                            <span>${formaterNumberToCurrency(indicatorsAction.year2)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta Año 3 </span>
                            <span>${formaterNumberToCurrency(indicatorsAction.year3)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta Año 4 </span>
                            <span>${formaterNumberToCurrency(indicatorsAction.year4)}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Acumulativo cuatrienio </span>
                            <span> ${ indicatorsAction?.accumulative != undefined ?  dataAcumulativo.find(item => item.value === indicatorsAction?.accumulative )?.name : "Si"}</span>
                        </div>
                        <div class="prop">
                        <span class="title">Meta global </span>
                            <span> ${indicatorsAction.total ? formaterNumberToCurrency(indicatorsAction?.total) :""}</span>
                        </div>
                    </div>
                </div>
            `).join('')
        }

            <div class="section-name">
                <div class="section-title-name">Matriz de marco lógico</div> 
            </div>

            <table style = "  font-size: 10px; ">
                <thead>
                    <tr>
                        <th>Resumen narrativo</th>
                        <th>Descripción</th>
                        <th>Nombre indicador</th>
                        <th>Meta indicador</th>
                        <th>Fuente de verificación</th>
                        <th>Supuestos</th>

                    </tr>
                </thead>
                <tbody>

                ${
                    project.data.logicFrame?.map(logicFrame =>
                    {
                        let entity = "";
                        let entity2 = "";
                        if (logicFrame.resume === 1) {
                            entity = `
                                <td>
                                    ${project.data.centerProblem}
                                 </td>
                            `;
                        } else if (logicFrame.resume=== 2) {
                            const objetiveSpecific = objectivesData?.find(item => item.value == logicFrame.description)?.name

                            entity = `
                            <td>
                                ${objetiveSpecific}
                            </td>                          
                            `;
                        } else if (logicFrame.resume === 3) {
                            
                            const activitiesLogicFrame = activities?.find(item => item.value == logicFrame.description)?.name

                            entity = `
                                <td>
                                ${activitiesLogicFrame}
                                </td>                          
                            `;
                        }
                        if (logicFrame.type === 1) {
                            const logicFrameIndicatorI = project.data.indicatorsIndicative?.find(indicatorsIndicative => 
                                indicatorsIndicative.id == logicFrame?.indicator ) 
                            
                            const logicFrameIndicator = indicatorName.data.find(process => process.id ==  logicFrameIndicatorI?.indicator )?.description 
        
                            entity2 = `
                                <td>
                                    ${logicFrameIndicator}
                                 </td>
                            `;
                        } else if (logicFrame.type === 2) {
                            const logicFrameIndicatorI2 = project.data.indicatorsIndicative?.find(indicatorsIndicative => 
                                indicatorsIndicative.id == logicFrame?.indicator ) 
                            
                            const logicFrameIndicator2 = indicatorName.data.find(process => process.id ==  logicFrameIndicatorI2?.indicator )?.description 
            
                            entity2 = `
                            <td>
                                ${logicFrameIndicator2}
                            </td>                          
                            `;
                        } else if (logicFrame.type === 3) {
                            
                            entity2 = `
                                <td>
                                    ${logicFrame.indicator}
                                </td>                          
                            `;
                        }
                        return`
                            <tr>
                                <td>${ResumeData.find(item => item.value === logicFrame.resume)?.name  }</td>
                                    ${entity}
                                    ${entity2}
                                    <td>${logicFrame.meta}</td>
                                    <td>${logicFrame.sourceVerification ? logicFrame.sourceVerification:"" }</td>
                                    <td>${logicFrame.assumptions ? logicFrame.assumptions:"" }</td>
                            </tr>
                        `
                    }).join('')
                }
                </tbody>
            </table>

          </div>
          
      </body>
      
      </html>
      `;
    // CONFIGURACION PARA AMBIENTE DE PRODUCCION DEV   
         const browser = await puppeteer.launch({
           headless: "new",
           args: ["--no-sandbox"],
           executablePath: "/usr/bin/chromium",
         });

    // const browser = await puppeteer.launch();
      const page = await browser.newPage();
     
      await page.setViewport({ width: 595, height: 842 });
      await page.setContent(contentHTML, {
        waitUntil: "domcontentloaded",
      });

      const headerHTML = `
      <div style=\"text-align: right ;width: 80px; font-size: 8px; padding: 0 !important; margin: 0;\" >
            <span class="pageNumber"></span> de <span class="totalPages"></span>
        </div>
        <div style="text-align: center;  margin-bottom: 10px;">
            <img src="data:image/png;base64,${readFileSync(logoPath).toString("base64")}" alt="Logo" style="width: 40%" />
            <div style="text-align: center; margin-bottom: 5px; margin-top: 2px;">
                <p style="font-size: 15px; font-weight: 700;">FICHA TÉCNICA DEL PROYECTO</p>
            </div>
            
        </div>

        `;

    const footerHTML = `
    <div style="text-align: center; padding: 0 !important; margin: 0;">
        <img src="data:image/png;base64,${readFileSync(footerPath).toString("base64")}" alt="Footer" style=" width: 30%" />
    </div>
    
    `
    
    ;
      const pdfBuffer = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        headerTemplate: headerHTML,
        footerTemplate: footerHTML,
        margin: { top: 220, bottom: 90 }
    });
    await page.emulateMediaType("screen");
    
      await browser.close();

      response.header('Content-Type', 'application/pdf');
      const nombreArchivo = `Ficha_técnica_${project.data.bpin}_ ${DateProjectArchive}.pdf`;
      response.header('Content-Disposition', `inline; filename=${nombreArchivo}`);
      response.status(200).send(pdfBuffer);
    } catch (err) {
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
    }

}


public async CreatePdfHistoric({ params, response }: HttpContextContract) { 

    const projectId = params.id;
    let oldId = params.oldId;
    
    if(oldId == 0 ){
        const basePath = "images/";

        const logoPath = Application.makePath(basePath, "logo.png");
        const footerPath = Application.makePath(basePath, "footer.png");
    
        let DateProjectArchive = "";
    
        try {
         const project = await ProjectProvider.getProjectById(projectId);
         const typeIndicators = await IndicatorsProvider.getIndicatorType();
         const measurementData = await CoreProvider.getParametersByGrouper("UNIDAD_MEDIDA_OBJETIVOS");
         const generesData = await CoreProvider.getParametersByGrouper("GENEROS")
         const oldData = await CoreProvider.getParametersByGrouper("RANGOS_DE_EDAD")
         const etniquesData = await CoreProvider.getParametersByGrouper("GRUPOS_ETNICOS")
         const  lge = await CoreProvider.getParametersByGrouper("LGE_LISTADOS_GENERICOS")
         const stages = await StageProvider.getStages();
         const components = await ComponentsProvider.getComponents();
         const indicatorDNP = await IndicatorsProvider.getIndicatorDNP();
         const indicatorsComponent = await IndicatorsProvider.getIndicatorsComponent();
         const indicatorsLine = await IndicatorsProvider.getStrategicLine();
         const indicatorProgramation = await IndicatorsProvider.getProgramation();
         const indicatorName = await IndicatorsProvider.getIndicatorName();
         const entity = await EntitiesProvider.getEntity();
         const  resource = await EntitiesProvider.getResource();
    
         const objectivesData =  project.data.causes?.map(cause => {
            return {
                name: `${cause.consecutive}. ${cause.description}`,
                value: cause.consecutive
            }
        });
    
        const productsData=  project.data.activities?.map(data => {
            return {
                name: `${data.productMGA}. ${data.productDescriptionMGA}`,
                value: data.productMGA
            }
        }) ;
    
        let totalCostDetail = 0;
    
        project.data.activities?.map(activitiesDetail => {
             activitiesDetail.detailActivities?.reduce((accumulator, detailActivities) => {
                return totalCostDetail = accumulator + (detailActivities.amount * detailActivities.unitCost);
            }, 0)
        });
    
    
       const  dataAcumulativo= [{ name: "Si", value: 1 }, { name: "No", value: 0 }]
    
    
         const fechaActual = new Date();
    
         const fechaFormateada = format(fechaActual, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
       
    
          function formaterNumberToCurrency(number) {
            const formatter = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 2,
            });
          
            return formatter.format(number);
          }
         
    
         let DateProject = ""
         if (project.data.dateCreate !== null && project.data.dateCreate !== undefined) {
            const fechaIso = project.data.dateCreate.toString();
            const DateCreate = new Date(fechaIso);
            const dia = DateCreate.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega ceros a la izquierda si es necesario
            const mes = (DateCreate.getMonth() + 1).toString().padStart(2, '0'); // El mes es de 0 a 11, por eso se suma 1
            const anio = DateCreate.getFullYear();
            const DateC = `${dia}/${mes}/${anio}`;
            const DateA = `${dia}${mes}${anio}`;
            DateProject = DateC;
            DateProjectArchive = DateA;
        }
          const contentHTML = `
          <!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Registro Proyecto de Inversión</title>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet" />
              <style>
                body {
                    margin: 0;
                    font-family: "Rubik", sans-serif;
                    padding: 0;
                }
    
                .mt-small {
                    margin-top: 1.5rem;
                }
    
                .container {
                    margin: 0 auto;
                    max-width: 600px;
                }
    
                .container .section {
                    margin-bottom: 15px;
                    margin-top: 15px;
                }
    
                .container  .section-title {
                    font-size: 17px;
                    font-weight: 700;
                }
    
                .container  .section-content-name{
                    font-size: 16px;
                }
    
                .container .section-name {
                    display: flex;
                    align-items: center;
                   
                }
    
                .container  .section-title-name {
                    font-size: 17px;
                    font-weight: 700;
                    margin-right: 10px;
                    margin-bottom: 20px;
                    margin-top: 15px;
                }
    
                .container  .section-content {
                    margin-top: 12px;
                    margin-bottom: 12px;
                }
    
                .container-direction {
                    text-align: center;
                    margin-bottom: 5px;
                    margin-top: 8px;
                }
    
                .container-direction p {
                    font-size: 17px;
                    font-weight: 700;
                }
    
    
                .section-object{
                    grid-template-columns: 0.6fr 3fr;
                    grid-template-rows: 1fr;
                    padding: 0.9rem 0px;
                    row-gap: 1.7rem;
                    column-gap: 1rem;
                    display: grid;
                }
    
                .section-object-2{
                    grid-template-columns: 2fr 5fr;
                    grid-template-rows: 1fr;
                    padding: 0.5rem 0px;
                    row-gap: 1rem;
                    column-gap: 1rem;
                    display: grid;
                }
    
    
    
                .container-grid-registro{
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: 1fr;
                    row-gap: 0.1rem;
                    column-gap: 2rem;
                    display: grid;
                }
    
                .container-grid-registro .section {
                    margin-bottom: 0;
                    font-size: 16px;
                }
                
                .container-grid-registro .section-title {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 5px;
                }
                
                .container-grid-registro .section-content {
                    margin-top: 10px;
                    font-size: 16px;
                }
    
                ## ESTILOS PARA LA TABLA DE CAUSAS 
    
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px; /* Espaciado superior */
                    margin-bottom:25px;
                }
            
                th, td {
                    border: 1px solid #dddddd;
                    text-align: center;
                    padding: 10px;
                }
            
                th {
                    background-color: #f2f2f2; /* Color de fondo para las celdas de encabezado */
                }
            
                tr:nth-child(even) {
                    background-color: #f2f2f2; /* Color de fondo para filas pares */
                }
            
                tr:nth-child(odd) {
                    background-color: #ffffff; /* Color de fondo para filas impares */
                }
    
                ## estilos tabla actividades
    
                .tabla {
                    display: grid;
                    grid-template-rows: 1fr;
                  }
                  
                  .item {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    row-gap: 30px;
                    column-gap: 45px;
                  }
                  
                  .prop {
                    display: flex;
                    flex-direction: column;
                  }
                  
                  .title {
                    font-weight: bold;
                    margin-bottom : 10px; 
                    margin-top: 10px;
                  }
    
                  .table-container {
                    max-width: 100px;        
                }
    
                .date-div{
                    margin: 0 97px;
                    margin-bottom: 2.8rem;
                }
    
              </style>
          </head>
          
          <body>
    
            <div class="date-div">
                <p>Medellín, ${fechaFormateada}</p>
            </div>
    
              <div class="container">
                    <div class ="container-grid-registro">
                        <div class="section">
                            <div class="section-title">Fecha de creación:</div>
                            <div class="section-content">${DateProject}</div>
                        </div>
    
                        <div class="section">
                            <div class="section-title">Código BPIN:</div>
                            <div class="section-content">${project.data.bpin}</div>
                        </div>
                        <div class="section">
                            <div class="section-title">Nombre del proyecto:</div> 
                            <div class="section-content">${project.data.project}</div>
                        </div>
                    </div>

                    <br><br>
    
                    <div class="section">
                        <div class="section-title">1. REGISTRO</div>
                    </div>
    
                    <div class="section-object">
                        <div class="section-title">Período inicial</div>
                        <div class="section-content">${project.data.dateFrom}</div>
                    </div>
                    <div class="section-object">
                        <div class="section-title">Período final</div>
                        <div class="section-content">${project.data.dateTo}</div>
                    </div>

                    <br><br><br>
                   
                    <div class="section">
                        <div class="section-title">2. IDENTIFICACIÓN</div>
                    </div>
    
                    <table>
                    <thead>
                        <tr>
                            <th>Clasificación</th>
                            <th>Detalle</th>
                            <th>No. de personas</th>
                            <th>Fuente de Información</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        project.data.classifications?.map(Classifications => 
                        {
                            let entity = "";
                            if (Classifications.clasification === 1) {
                                entity = `
                                    <td>
                                        Género
                                    </td>
                                    <td>${generesData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                `;
                            } else if (Classifications.clasification === 2) {
                                entity = `
                                    <td>
                                        Rango de edad
                                    </td>
                                    <td>${oldData.find(item => parseInt(item.itemCode) === Classifications.clasification)?.itemDescription }</td>
                                `;
                            } else if (Classifications.clasification === 3) {
                                entity = `
                                    <td>
                                        Grupo étnico
                                    </td>
                                    <td>${etniquesData.find(item => parseInt(item.itemCode) === Classifications.clasification)?.itemDescription }</td>
                                `;
                            } else if (Classifications.clasification === 4) {
                                entity = `
                                    <td>
                                        Población vulnerable
                                    </td>
                                    <td>${lge.find(item => parseInt(item.itemCode) === Classifications.clasification)?.itemDescription }</td>
                                `;
                            } 
                            return`
                                <tr>
                                        ${entity}
                                    <td>${Classifications.numPerson != null ? Classifications.numPerson : ""}</td>
                                    <td>${Classifications.infoSource}</td>
                                </tr>
                            `
                        }).join('')
                    }
                    </tbody>
                </table>

                <br><br><br><br>
    
    
                <div class="section">
                        <div class="section-title">3. PREPARACIÓN</div>
                </div>
    
    
                <div class="section-name">
                    <div class="section-title-name">Actividades</div> 
                </div>
    
                ${
                    project.data.activities?.map(activities =>
                    `
                    <div class="section-object-2">
                        <div class="section-title">Objetivo específico</div>
                        <div>${activities.objetiveActivity.description}</div>
                    </div>
    
                    <br>
                        <div class="tabla" style = "margin-bottom: 90px;">
                            <div class="item">
                                <div class="prop">
                                    <span class="title">Producto MGA</span>
                                    <span>${activities.productMGA}</span>
                                </div>
                                <div class="prop">
                                    <span class="title">Etapa</span>
                                    <span>${stages.data.find(stage => stage.id === activities.stageActivity)?.description }</span>
                                </div>
                                <div class="prop">
                                    <span class="title">Actividad MGA</span>
                                    <span>${activities.activityMGA} ${activities.activityDescriptionMGA}</span>
                                </div>
                                ${
                                    activities.budgetsMGA?.map(budget => `
                                    <div class="prop">
                                        <span class="title">Año ${budget.year}</span>
                                        <span> ${formaterNumberToCurrency(budget.budget)}</span>
                                    </div>
                                  
                                    `).join('')
                                }
    
                                <div class="prop">
                                <span class="title">Presupuesto</span>
                                    <span> ${
                                        formaterNumberToCurrency(activities.budgetsMGA[0].budget + activities.budgetsMGA[1].budget +  activities.budgetsMGA[2].budget + activities.budgetsMGA[3].budget + activities.budgetsMGA[4].budget)}</span>
                                </div>
    
                                <div class="prop">
                                <span class="title">Vigencia</span>
                                    <span>${activities.validity}</span>
                                </div>
    
                                <div class="prop">
                                <span class="title">Año</span>
                                    <span> ${activities.year}</span>
                                </div>
    
                                ${
                                    activities.detailActivities?.map(detailActivities => {
                                        const currentCost = detailActivities.amount * detailActivities.unitCost;
                                        return `
                                        <div class="prop">
                                            <span class="title">No. y descripción actividad detallada</span>
                                            <span> ${detailActivities.consecutive} ${detailActivities.detailActivity}</span>
                                        </div>
                                        
                                        <div class="prop">
                                            <span class="title"> Unidad de medida</span>
                                            <span> ${measurementData.find(item => parseInt(item.itemCode) === detailActivities.measurement)?.itemDescription}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Componente </span>
                                            <span> ${components.data.find(stage => stage.id === detailActivities.component)?.description }</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Cantidad </span>
                                            <span> ${detailActivities.amount}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Costo unitario </span>
                                            <span> ${formaterNumberToCurrency(detailActivities.unitCost)}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Costo total </span>
                                            <span> ${formaterNumberToCurrency(currentCost)}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">POSPRE </span>
                                            
                                            <span> ${detailActivities.pospre ? detailActivities.pospre : ""}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Validador CPC </span>
                                            <span>  ${detailActivities.validatorCPC ? detailActivities.validatorCPC : ""}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Clasificador CPC </span>
                                            <span> ${detailActivities.clasificatorCPC ? detailActivities.clasificatorCPC : ""}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Validador sección CPC </span>
                                            <span> ${detailActivities.sectionValidatorCPC ? detailActivities.sectionValidatorCPC : ""}</span>
                                        </div>
    
                                        <div class="prop">
                                            <span class="title">Costo total actividades detalladas </span>
                                            <span>  ${detailActivities.unitCost ?  formaterNumberToCurrency(Number(totalCostDetail)) : ""}</span>
                                        </div>
                                
                                        `;
                                    }).join('')
                                }
                            </div>
                        </div>
                    `).join('')
                }
                
                    <div class="section">
                        <div class="section-title">4. PROGRAMACIÓN</div>
                    </div>

                    <div class="section-name">
                        <div class="section-title-name">Ingresos y beneficios </div> 
                    </div>
    
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Unidad de medida</th>
    
                            </tr>
                        </thead>
                        <tbody>
                        ${
                            project.data.profitsIncome?.map(profitsIncome => `
                                <tr>
                                    <td>${profitsIncome.type}</td>
                                    <td>${profitsIncome.description}</td>
                                    <td>${measurementData.find(item => parseInt(item.itemCode) === profitsIncome.unit)?.itemDescription}</td>
                                </tr>
                            `).join('')
                        }
                        </tbody>
                    </table>
    
                    <div class="section-name">
                        <div class="section-title-name">Clasificación</div> 
                    </div>
                    ${
                        project.data.profitsIncome?.map(profitsIncome => `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Período</th>
                                        <th>Cantidad</th>
                                        <th>Valor unitario</th>
                                        <th>Valor total financiero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${
                                        profitsIncome.period?.map(periodData => `
                                            <tr>
                                                <td>${periodData.period}</td>
                                                <td>${periodData.quantity}</td>
                                                <td>${formaterNumberToCurrency(periodData.unitValue)}</td>
                                                <td>${formaterNumberToCurrency(periodData.financialValue)}</td>
                                            </tr>
                                        `).join('')
                                    }
                                </tbody>
                            </table>
                        `).join('')
                    }
                    <br><br><br>
    
                <div class="section-name">
                    <div class="section-title-name">Fuentes de financiación</div> 
                </div>
    
                ${
                    project.data.sourceFunding?.map(sourceFunding => `
            
                        <div class="tabla" style = "margin-bottom: 70px;">
                            <div class="item">
                                <div class="prop">
                                    <span class="title">Etapa</span>
                                    <span>${ stages.data.find(stage => stage.id === sourceFunding.stage)?.description  }</span>
                                </div>
                                <div class="prop">
                                    <span class="title">Tipo entidad</span>
                                    <span>${ entity.data.find(stage => stage.id === sourceFunding.typeEntity)?.description  }</span>
                                </div>
                                <div class="prop">
                                    <span class="title">Entidad</span>
                                    <span>${sourceFunding.entity} </span>
                                </div>
    
                                <div class="prop">
                                <span class="title">Tipo de recurso</span>
                                    <span> ${ resource.data.find(stage => stage.id === sourceFunding.resource)?.description  }</span>
                                </div>
    
                                <div class="prop">
                                <span class="title">Año 0 </span>
                                    <span>${formaterNumberToCurrency(sourceFunding.year0)}</span>
                                </div>
    
                                <div class="prop">
                                <span class="title">Año 1 </span>
                                    <span>${formaterNumberToCurrency(sourceFunding.year1)}</span>
                                </div>
                                <div class="prop">
                                <span class="title">Año 2 </span>
                                    <span>${formaterNumberToCurrency(sourceFunding.year2)}</span>
                                </div>
                                <div class="prop">
                                <span class="title">Año 3 </span>
                                    <span> ${formaterNumberToCurrency(sourceFunding.year3)}</span>
                                </div>
                                <div class="prop">
                                <span class="title">Año 4 </span>
                                    <span> ${formaterNumberToCurrency(sourceFunding.year4)}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')
                }
    
                
            <div class="section-name">
                <div class="section-title-name">Indicadores</div> 
            </div>
    
            ${
                project.data.indicatorsIndicative?.map(indicatorsIndicative => `
              
                <div class="section-object-2">
                    <div class="section-title">Tipo de indicador:</div>
                    <div>${typeIndicators.data.find(type => type.id == indicatorsIndicative.type)?.description}</div>
                </div>
        
                    <div class="tabla" style = "margin-bottom: 70px;">
                        <div class="item">
                            <div class="prop">
                                <span class="title">Línea estratégica</span>
                                <span>${ indicatorsLine.data.find(process => process.id == indicatorsIndicative?.line)?.description  }</span>
                            </div>
                            <div class="prop">
                                <span class="title">Componente</span>
                                <span>${ indicatorsComponent.data.find(process => process.id ==  indicatorsIndicative?.component)?.description   }</span>
                            </div>
                            <div class="prop">
                                <span class="title">Programa</span>
                                <span>${ indicatorProgramation.data.find(process => process.id == indicatorsIndicative?.program)?.description } </span>
                            </div>
    
                            <div class="prop">
                                <span class="title">Nombre indicador</span>
                                <span>${ indicatorName.data.find(process => process.id ==  indicatorsIndicative?.indicator )?.description   } </span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Unidad de medida</span>
                                <span> ${measurementData.find(item => parseInt(item.itemCode) === indicatorsIndicative.measurement)?.itemDescription }</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Plan de desarrollo </span>
                                <span>${indicatorsIndicative.developmentPlan ? indicatorsIndicative?.developmentPlan :""}</span>
                            </div>
    
                            <div class="prop">
                                <span class="title">Producto MGA</span>
                                <span>${productsData?.find(stage => stage.value === indicatorsIndicative.productMGA)?.name}</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Meta Año 0 </span>
                                <span> ${formaterNumberToCurrency(indicatorsIndicative.year0)}</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Meta Año 1 </span>
                                <span>${formaterNumberToCurrency(indicatorsIndicative.year1)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta Año 2 </span>
                                <span>${formaterNumberToCurrency(indicatorsIndicative.year2)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta Año 3 </span>
                                <span>${formaterNumberToCurrency(indicatorsIndicative.year3)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta Año 4 </span>
                                <span>${formaterNumberToCurrency(indicatorsIndicative.year4)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta global </span>
                                <span> ${ formaterNumberToCurrency(indicatorsIndicative.year0 + indicatorsIndicative.year1 + indicatorsIndicative.year2 + indicatorsIndicative.year3 + indicatorsIndicative.year4)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')
            }
    
            ${
                project.data.indicatorsAction?.map(indicatorsAction => `
              
                <div class="section-object-2">
                    <div class="section-title">Tipo de indicador:</div>
                    <div>${typeIndicators.data.find(type => type.id == indicatorsAction.type)?.description}</div>
                </div>
        
                    <div class="tabla" style = "margin-bottom: 70px;">
                        <div class="item">
                            <div class="prop">
                                <span class="title">Objetivo específico directo</span>
                                <span> ${objectivesData?.find(stage => stage.value === indicatorsAction?.objective)?.name}</span>
                            </div>
                            <div class="prop">
                                <span class="title">Producto MGA</span>
                                <span>${productsData?.find(stage => stage.value === indicatorsAction.productMGA)?.name}</span>
                            </div>
                            <div class="prop">
                                <span class="title">Indicador DNP</span>
                                <span>${indicatorDNP.data.find(process => process.id == indicatorsAction?.dpnIndicator)?.description } </span>
                            </div>
    
                            <div class="prop">
                                <span class="title">Código DNP indicador</span>
                                <span>${indicatorsAction.dpn ? indicatorsAction?.dpn :""} </span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Unidad de medida</span>
                                <span> ${measurementData.find(item => parseInt(item.itemCode) === indicatorsAction.measurement)?.itemDescription }</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Código valor estadístico
                            </span>
                                <span>${indicatorsAction.staticValueCode ? indicatorsAction?.staticValueCode :""}</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Nombre valor estadístico</span>
                                <span>${indicatorsAction.staticValue ? indicatorsAction?.staticValue :""}</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Meta Año 0 </span>
                                <span>${formaterNumberToCurrency(indicatorsAction.year0)}</span>
                            </div>
    
                            <div class="prop">
                            <span class="title">Meta Año 1 </span>
                                <span>${formaterNumberToCurrency(indicatorsAction.year1)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta Año 2 </span>
                                <span>${formaterNumberToCurrency(indicatorsAction.year2)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta Año 3 </span>
                                <span>${formaterNumberToCurrency(indicatorsAction.year3)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta Año 4 </span>
                                <span>${formaterNumberToCurrency(indicatorsAction.year4)}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Acumulativo cuatrienio </span>
                                <span> ${ indicatorsAction?.accumulative != undefined ?  dataAcumulativo.find(item => item.value === indicatorsAction?.accumulative )?.name : "Si"}</span>
                            </div>
                            <div class="prop">
                            <span class="title">Meta global </span>
                                <span> ${indicatorsAction.total ? formaterNumberToCurrency(indicatorsAction?.total) :""}</span>
                            </div>
                        </div>
                    </div>
                `).join('')
            }
    
            <div class="section">
                <div class="section-title">5. FLUJO DEL PROYECTO</div>
            </div>
    
            <div class="section-object">
                <div class="section-title">Observaciones</div>
                <div >${project.data.observations}</div>
            </div>
        
    
              </div>
              
          </body>
          
          </html>
          `;
        // CONFIGURACION PARA AMBIENTE DE PRODUCCION DEV   
              const browser = await puppeteer.launch({
                headless: "new",
                args: ["--no-sandbox"],
                executablePath: "/usr/bin/chromium",
             });
    
         // const browser = await puppeteer.launch();
          const page = await browser.newPage();
         
          await page.setViewport({ width: 595, height: 842 });
          await page.setContent(contentHTML, {
            waitUntil: "domcontentloaded",
          });
    
          const headerHTML = `
          <div style=\"text-align: right ;width: 80px; font-size: 8px; padding: 0 !important; margin: 0;\" >
                <span class="pageNumber"></span> de <span class="totalPages"></span>
            </div>
            <div style="text-align: center;  margin-bottom: 10px;">
                <img src="data:image/png;base64,${readFileSync(logoPath).toString("base64")}" alt="Logo" style="width: 40%" />
                <div style="text-align: center; margin-bottom: 5px; margin-top: 2px;">
                    <p style="font-size: 15px; font-weight: 700;">INFORMACIÓN DE HISTÓRICOS</p>
                </div>
                
            </div>
    
            `;
    
        const footerHTML = `
        <div style="text-align: center; padding: 0 !important; margin: 0;">
            <img src="data:image/png;base64,${readFileSync(footerPath).toString("base64")}" alt="Footer" style=" width: 30%" />
        </div>
        
        `
        
        ;
          const pdfBuffer = await page.pdf({
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: headerHTML,
            footerTemplate: footerHTML,
            margin: { top: 220, bottom: 90 }
        });
        await page.emulateMediaType("screen");
        
          await browser.close();
    
          response.header('Content-Type', 'application/pdf');
          const nombreArchivo = `Ficha_técnica_${project.data.bpin}_ ${DateProjectArchive}.pdf`;
          response.header('Content-Disposition', `inline; filename=${nombreArchivo}`);
          response.status(200).send(pdfBuffer);
        } catch (err) {
            return response.badRequest(
              new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }

    }else {


        const projectOld = await ProjectProvider.getProjectById(oldId);
        const project = await ProjectProvider.getProjectById(projectId);

        interface Icambios{
            activities?:IActivitiesProject[] | null;
            dateFrom?: string | null ;
            dateTo?: string | null;
            profitsIncome?: IprofitsIncome[] | null ; 
            sourceFunding?: ISourceFunding[] | null ;
            indicatorsAction?: IIndicatorAction[] | null;
            indicatorsIndicative?: IIndicatorIndicative[] | null;
            classifications?: IDemographicCharacteristics[] | null;
            projectObservation?: string | null;
        }

        let cambios:Icambios = {};

        if(JSON.stringify(project.data.activities?.sort().map(value =>{
            return {...value,id:0,idProject:0}})
        ) != JSON.stringify(projectOld.data.activities?.sort().map(value =>{
            return {...value,id:0,idProject:0}
        })))
         {
            cambios = {...cambios,activities:project.data.activities}
         }

         if (project.data.dateFrom != projectOld.data.dateFrom){
            cambios = {...cambios,dateFrom:project.data.dateFrom}
         }

         if (project.data.dateTo != projectOld.data.dateTo){
            cambios = {...cambios,dateTo:project.data.dateTo}
         }

         if (project.data.observations != projectOld.data.observations){
            cambios = {...cambios,projectObservation:project.data.observations}
         }

         if(JSON.stringify(project.data.classifications?.sort().map(value =>{
            return {...value,id:0,idProject:0}})
        ) != JSON.stringify(projectOld.data.classifications?.sort().map(value =>{
            return {...value,id:0,idProject:0}
        })))
         {
            cambios = {...cambios,classifications:project.data.classifications}
         }
         

         if(JSON.stringify(project.data.profitsIncome?.sort((a, b) => (a.id || 0) - (b.id || 0)).map(value =>{
            return {...value,id:0,idProject:0,period:value.period.map(value2=>{return { ...value2,idProfit:0,id:0}})}})
        ) != JSON.stringify(projectOld.data.profitsIncome?.sort((a, b) => (a.id || 0) - (b.id || 0)).map(value =>{
            return {...value,id:0,idProject:0,period:value.period.map(value2=>{return { ...value2,idProfit:0,id:0}})}
        })))
         {
            cambios = {...cambios,profitsIncome:project.data.profitsIncome}
         }
         
         if(JSON.stringify(project.data.sourceFunding?.sort().map(value =>{
            return {...value,id:0,idProject:0}})
        ) != JSON.stringify(projectOld.data.sourceFunding?.sort().map(value =>{
            return {...value,id:0,idProject:0}
        })))
         {
            cambios = {...cambios,sourceFunding:project.data.sourceFunding}
         }

         if(JSON.stringify(project.data.indicatorsIndicative?.sort().map(value =>{
            return {...value,id:0,idProject:0}})
        ) != JSON.stringify(projectOld.data.indicatorsIndicative?.sort().map(value =>{
            return {...value,id:0,idProject:0}
        })))
         {
            cambios = {...cambios,indicatorsIndicative:project.data.indicatorsIndicative}
         }

         if(JSON.stringify(project.data.indicatorsAction?.sort().map(value =>{
            return {...value,id:0,idProject:0}})
        ) != JSON.stringify(projectOld.data.indicatorsAction?.sort().map(value =>{
            return {...value,id:0,idProject:0}
        })))
         {
            cambios = {...cambios,indicatorsAction:project.data.indicatorsAction}
         }


         
        const basePath = "images/";

        const logoPath = Application.makePath(basePath, "logo.png");
        const footerPath = Application.makePath(basePath, "footer.png");
    
        let DateProjectArchive = "";
    
        try {
      
         const typeIndicators = await IndicatorsProvider.getIndicatorType();
         const measurementData = await CoreProvider.getParametersByGrouper("UNIDAD_MEDIDA_OBJETIVOS");
         const generesData = await CoreProvider.getParametersByGrouper("GENEROS")
         const oldData = await CoreProvider.getParametersByGrouper("RANGOS_DE_EDAD")
         const etniquesData = await CoreProvider.getParametersByGrouper("GRUPOS_ETNICOS")
         const  lge = await CoreProvider.getParametersByGrouper("LGE_LISTADOS_GENERICOS")
         const stages = await StageProvider.getStages();
         const components = await ComponentsProvider.getComponents();
         const indicatorDNP = await IndicatorsProvider.getIndicatorDNP();
         const indicatorsComponent = await IndicatorsProvider.getIndicatorsComponent();
         const indicatorsLine = await IndicatorsProvider.getStrategicLine();
         const indicatorProgramation = await IndicatorsProvider.getProgramation();
         const indicatorName = await IndicatorsProvider.getIndicatorName();
         const entity = await EntitiesProvider.getEntity();
         const  resource = await EntitiesProvider.getResource();
    
         const objectivesData =  project.data.causes?.map(cause => {
            return {
                name: `${cause.consecutive}. ${cause.description}`,
                value: cause.consecutive
            }
        });


        const productsData=  project.data.activities?.map(data => {
            return {
                name: `${data.productMGA}. ${data.productDescriptionMGA}`,
                value: data.productMGA
            }
        }) ;
    
        let totalCostDetail = 0;
    
        project.data.activities?.map(activitiesDetail => {
            totalCostDetail = activitiesDetail.detailActivities?.reduce((accumulator, detailActivities) => {
                return accumulator + (detailActivities.amount * detailActivities.unitCost);
            }, 0)
        });
    
    
       const  dataAcumulativo= [{ name: "Si", value: 1 }, { name: "No", value: 0 }]
    
            
         const fechaActual = new Date();
    
         const fechaFormateada = format(fechaActual, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
       
    
          function formaterNumberToCurrency(number) {
            const formatter = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 2,
            });
          
            return formatter.format(number);
          }
         
    
         let DateProject = ""
         if (project.data.dateCreate !== null && project.data.dateCreate !== undefined) {
            const fechaIso = project.data.dateCreate.toString();
            const DateCreate = new Date(fechaIso);
            const dia = DateCreate.getDate().toString().padStart(2, '0'); // Obtiene el día y agrega ceros a la izquierda si es necesario
            const mes = (DateCreate.getMonth() + 1).toString().padStart(2, '0'); // El mes es de 0 a 11, por eso se suma 1
            const anio = DateCreate.getFullYear();
            const DateC = `${dia}/${mes}/${anio}`;
            const DateA = `${dia}${mes}${anio}`;
            DateProject = DateC;
            DateProjectArchive = DateA;
        }
          const contentHTML = `
          <!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Registro Proyecto de Inversión</title>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet" />
              <style>
                body {
                    margin: 0;
                    font-family: "Rubik", sans-serif;
                    padding: 0;
                }
    
                .mt-small {
                    margin-top: 1.5rem;
                }
    
                .container {
                    margin: 0 auto;
                    max-width: 600px;
                }
    
                .container .section {
                    margin-bottom: 15px;
                    margin-top: 15px;
                }
    
                .container  .section-title {
                    font-size: 17px;
                    font-weight: 700;
                }
    
                .container  .section-content-name{
                    font-size: 16px;
                }
    
                .container .section-name {
                    display: flex;
                    align-items: center;
                   
                }
    
                .container  .section-title-name {
                    font-size: 17px;
                    font-weight: 700;
                    margin-right: 10px;
                    margin-bottom: 20px;
                    margin-top: 15px;
                }
    
                .container  .section-content {
                    margin-top: 12px;
                    margin-bottom: 12px;
                }
    
                .container-direction {
                    text-align: center;
                    margin-bottom: 5px;
                    margin-top: 8px;
                }
    
                .container-direction p {
                    font-size: 17px;
                    font-weight: 700;
                }
    
    
                .section-object{
                    grid-template-columns: 0.6fr 3fr;
                    grid-template-rows: 1fr;
                    padding: 0.9rem 0px;
                    row-gap: 1.7rem;
                    column-gap: 1rem;
                    display: grid;
                }
    
                .section-object-2{
                    grid-template-columns: 2fr 5fr;
                    grid-template-rows: 1fr;
                    padding: 0.5rem 0px;
                    row-gap: 1rem;
                    column-gap: 1rem;
                    display: grid;
                }
    
    
    
                .container-grid-registro{
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: 1fr;
                    row-gap: 0.1rem;
                    column-gap: 2rem;
                    display: grid;
                }
    
                .container-grid-registro .section {
                    margin-bottom: 0;
                    font-size: 16px;
                }
                
                .container-grid-registro .section-title {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 5px;
                }
                
                .container-grid-registro .section-content {
                    margin-top: 10px;
                    font-size: 16px;
                }
    
                ## ESTILOS PARA LA TABLA DE CAUSAS 
    
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px; /* Espaciado superior */
                    margin-bottom:25px;
                }
            
                th, td {
                    border: 1px solid #dddddd;
                    text-align: center;
                    padding: 10px;
                }
            
                th {
                    background-color: #f2f2f2; /* Color de fondo para las celdas de encabezado */
                }
            
                tr:nth-child(even) {
                    background-color: #f2f2f2; /* Color de fondo para filas pares */
                }
            
                tr:nth-child(odd) {
                    background-color: #ffffff; /* Color de fondo para filas impares */
                }
    
                ## estilos tabla actividades
    
                .tabla {
                    display: grid;
                    grid-template-rows: 1fr;
                  }
                  
                  .item {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    row-gap: 30px;
                    column-gap: 45px;
                  }
                  
                  .prop {
                    display: flex;
                    flex-direction: column;
                  }
                  
                  .title {
                    font-weight: bold;
                    margin-bottom : 10px; 
                    margin-top: 10px;
                  }
    
                  .table-container {
                    max-width: 100px;        
                }
    
                .date-div{
                    margin: 0 97px;
                    margin-bottom: 2.8rem;
                }
    
              </style>
          </head>
          
          <body>
    
            <div class="date-div">
                <p>Medellín, ${fechaFormateada}</p>
            </div>
    
              <div class="container">
                    <div class ="container-grid-registro">
                        <div class="section">
                            <div class="section-title">Fecha de registro:</div>
                            <div class="section-content">${DateProject}</div>
                        </div>
    
                        <div class="section">
                            <div class="section-title">Código BPIN:</div>
                            <div class="section-content">${project.data.bpin}</div>
                        </div>
                        <div class="section">
                            <div class="section-title">Nombre del proyecto:</div> 
                            <div class="section-content">${project.data.project}</div>
                        </div>
                    </div>

                    <br><br>

                    ${cambios.dateFrom || cambios.dateTo ?  
                        `    <div class="section">
                                <div class="section-title">1. REGISTRO</div>
                            </div>
                        `:
                        ""
                    }
                 
                    ${ cambios.dateFrom ?
                        `  
                        <div class="section-object">
                            <div class="section-title">Período inicial</div>
                            <div class="section-content">${project.data.dateFrom}</div>
                        </div>
                        ` : ""
                    }

                    ${cambios.dateTo ? 
                        ` 
                        <div class="section-object">
                            <div class="section-title">Período final</div>
                            <div class="section-content">${project.data.dateTo}</div>
                        </div>
                            <br><br><br>
                        `  : ""
                    }
             
                
                    ${cambios.classifications ? 
                        ` 
                            <div class="section">
                                <div class="section-title">2. IDENTIFICACIÓN</div>
                            </div>

                            <table>
                            <thead>
                                <tr>
                                    <th>Clasificación</th>
                                    <th>Detalle</th>
                                    <th>No. de personas</th>
                                    <th>Fuente de Información</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${
                                project.data.classifications?.map(Classifications => 
                                {
                                    let entity = "";
                                    if (Classifications.clasification === 1) {
                                        entity = `
                                            <td>
                                                Género
                                            </td>
                                            <td>${generesData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                        `;
                                    } else if (Classifications.clasification === 2) {
                                        entity = `
                                            <td>
                                                Rango de edad
                                            </td>
                                            <td>${oldData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                        `;
                                    } else if (Classifications.clasification === 3) {
                                        entity = `
                                            <td>
                                                Grupo étnico
                                            </td>
                                            <td>${etniquesData.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                        `;
                                    } else if (Classifications.clasification === 4) {
                                        entity = `
                                            <td>
                                                Población vulnerable
                                            </td>
                                            <td>${lge.find(item => item.id === Classifications.detail)?.itemDescription }</td>
                                        `;
                                    } 
                                    return`
                                        <tr>
                                                ${entity}
                                            <td>${Classifications.numPerson != null ? Classifications.numPerson : ""}</td>
                                            <td>${Classifications.infoSource}</td>
                                        </tr>
                                    `
                                }).join('')
                            }
                            </tbody>
                        </table>
                        <br><br><br><br>
                        `  : ""
                    }

            
                ${cambios.activities ? 
                    ` 
                    <div class="section">
                            <div class="section-title">3. PREPARACIÓN</div>
                    </div>

                        <div class="section-name">
                            <div class="section-title-name">Actividades</div> 
                        </div>

                        ${
                            project.data.activities?.map(activities =>
                            `
                            <div class="section-object-2">
                                <div class="section-title">Objetivo específico</div>
                                <div>${activities.objetiveActivity.description}</div>
                            </div>

                            <br>
                                <div class="tabla" style = "margin-bottom: 90px;">
                                    <div class="item">
                                        <div class="prop">
                                            <span class="title">Producto MGA</span>
                                            <span>${activities.productMGA}</span>
                                        </div>
                                        <div class="prop">
                                            <span class="title">Etapa</span>
                                            <span>${stages.data.find(stage => stage.id === activities.stageActivity)?.description }</span>
                                        </div>
                                        <div class="prop">
                                            <span class="title">Actividad MGA</span>
                                            <span>${activities.activityMGA} ${activities.activityDescriptionMGA}</span>
                                        </div>
                                        ${
                                            activities.budgetsMGA?.map(budget => `
                                            <div class="prop">
                                                <span class="title">Año ${budget.year}</span>
                                                <span> ${formaterNumberToCurrency(budget.budget)}</span>
                                            </div>
                                        
                                            `).join('')
                                        }

                                        <div class="prop">
                                        <span class="title">Presupuesto</span>
                                            <span> ${
                                                formaterNumberToCurrency(activities.budgetsMGA[0].budget + activities.budgetsMGA[1].budget +  activities.budgetsMGA[2].budget + activities.budgetsMGA[3].budget + activities.budgetsMGA[4].budget)}</span>
                                        </div>

                                        <div class="prop">
                                        <span class="title">Vigencia</span>
                                            <span>${activities.validity}</span>
                                        </div>

                                        <div class="prop">
                                        <span class="title">Año</span>
                                            <span> ${activities.year}</span>
                                        </div>

                                        ${
                                            activities.detailActivities?.map(detailActivities => {
                                                const currentCost = detailActivities.amount * detailActivities.unitCost;
                                                return `
                                                <div class="prop">
                                                    <span class="title">No. y descripción actividad detallada</span>
                                                    <span> ${detailActivities.consecutive} ${detailActivities.detailActivity}</span>
                                                </div>
                                                
                                                <div class="prop">
                                                    <span class="title"> Unidad de medida</span>
                                                    <span> ${measurementData.find(item => parseInt(item.itemCode) === detailActivities.measurement)?.itemDescription}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Componente </span>
                                                    <span> ${components.data.find(stage => stage.id === detailActivities.component)?.description }</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Cantidad </span>
                                                    <span> ${detailActivities.amount}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Costo unitario </span>
                                                    <span> ${formaterNumberToCurrency(detailActivities.unitCost)}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Costo total </span>
                                                    <span> ${formaterNumberToCurrency(currentCost)}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">POSPRE </span>
                                                    
                                                    <span> ${detailActivities.pospre ? detailActivities.pospre : ""}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Validador CPC </span>
                                                    <span>  ${detailActivities.validatorCPC ? detailActivities.validatorCPC : ""}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Clasificador CPC </span>
                                                    <span> ${detailActivities.clasificatorCPC ? detailActivities.clasificatorCPC : ""}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Validador sección CPC </span>
                                                    <span> ${detailActivities.sectionValidatorCPC ? detailActivities.sectionValidatorCPC : ""}</span>
                                                </div>

                                                <div class="prop">
                                                    <span class="title">Costo total actividades detalladas </span>
                                                    <span>  ${detailActivities.unitCost ?  formaterNumberToCurrency(Number(totalCostDetail)) : ""}</span>
                                                </div>
                                        
                                                `;
                                            }).join('')
                                        }
                                    </div>
                                </div>
                            `).join('')
                        }
                        <br><br><br><br>
                    `  : ""
                }
    
                ${cambios.profitsIncome || cambios.sourceFunding || cambios.indicatorsIndicative || cambios.indicatorsAction ?
                      ` <div class="section">
                            <div class="section-title">4. PROGRAMACIÓN</div>
                        </div>  
                      ` 
                        :""
                }

                    ${cambios.profitsIncome ? 
                        ` 
                                <div class="section-name">
                                    <div class="section-title-name">Ingresos y beneficios </div> 
                                </div>
                
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Descripción</th>
                                            <th>Unidad de medida</th>
                
                                        </tr>
                                    </thead>
                                    <tbody>
                                    ${
                                        project.data.profitsIncome?.map(profitsIncome => `
                                            <tr>
                                                <td>${profitsIncome.type}</td>
                                                <td>${profitsIncome.description}</td>
                                                <td>${measurementData.find(item => parseInt(item.itemCode) === profitsIncome.unit)?.itemDescription}</td>
                                            </tr>
                                        `).join('')
                                    }
                                    </tbody>
                                </table>
                
                                <div class="section-name">
                                    <div class="section-title-name">Clasificación</div> 
                                </div>
                                ${
                                    project.data.profitsIncome?.map(profitsIncome => `
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Período</th>
                                                    <th>Cantidad</th>
                                                    <th>Valor unitario</th>
                                                    <th>Valor total financiero</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${
                                                    profitsIncome.period?.map(periodData => `
                                                        <tr>
                                                            <td>${periodData.period}</td>
                                                            <td>${periodData.quantity}</td>
                                                            <td>${formaterNumberToCurrency(periodData.unitValue)}</td>
                                                            <td>${formaterNumberToCurrency(periodData.financialValue)}</td>
                                                        </tr>
                                                    `).join('')
                                                }
                                            </tbody>
                                        </table>
                                    `).join('')
                                }
                                <br><br><br>
                                `  : ""
                    }
                    
                    
                    ${cambios.sourceFunding ? 
                        ` 
                        <div class="section-name">
                            <div class="section-title-name">Fuentes de financiación</div> 
                        </div>
            
                        ${
                            project.data.sourceFunding?.map(sourceFunding => `
                    
                                <div class="tabla" style = "margin-bottom: 70px;">
                                    <div class="item">
                                        <div class="prop">
                                            <span class="title">Etapa</span>
                                            <span>${ stages.data.find(stage => stage.id === sourceFunding.stage)?.description  }</span>
                                        </div>
                                        <div class="prop">
                                            <span class="title">Tipo entidad</span>
                                            <span>${ entity.data.find(stage => stage.id === sourceFunding.typeEntity)?.description  }</span>
                                        </div>
                                        <div class="prop">
                                            <span class="title">Entidad</span>
                                            <span>${sourceFunding.entity} </span>
                                        </div>
            
                                        <div class="prop">
                                        <span class="title">Tipo de recurso</span>
                                            <span> ${ resource.data.find(stage => stage.id === sourceFunding.resource)?.description  }</span>
                                        </div>
            
                                        <div class="prop">
                                        <span class="title">Año 0 </span>
                                            <span>${formaterNumberToCurrency(sourceFunding.year0)}</span>
                                        </div>
            
                                        <div class="prop">
                                        <span class="title">Año 1 </span>
                                            <span>${formaterNumberToCurrency(sourceFunding.year1)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Año 2 </span>
                                            <span>${formaterNumberToCurrency(sourceFunding.year2)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Año 3 </span>
                                            <span> ${formaterNumberToCurrency(sourceFunding.year3)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Año 4 </span>
                                            <span> ${formaterNumberToCurrency(sourceFunding.year4)}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')
                        }
                        `  : ""
                    }
              
    
                    ${cambios.indicatorsIndicative ? 
                        ` 
                            <div class="section-name">
                                <div class="section-title-name">Indicadores</div> 
                            </div>
                    
                            ${
                                project.data.indicatorsIndicative?.map(indicatorsIndicative => `
                            
                                <div class="section-object-2">
                                    <div class="section-title">Tipo de indicador:</div>
                                    <div>${typeIndicators.data.find(type => type.id == indicatorsIndicative.type)?.description}</div>
                                </div>
                        
                                    <div class="tabla" style = "margin-bottom: 70px;">
                                        <div class="item">
                                            <div class="prop">
                                                <span class="title">Línea estratégica</span>
                                                <span>${ indicatorsLine.data.find(process => process.id == indicatorsIndicative?.line)?.description  }</span>
                                            </div>
                                            <div class="prop">
                                                <span class="title">Componente</span>
                                                <span>${ indicatorsComponent.data.find(process => process.id ==  indicatorsIndicative?.component)?.description   }</span>
                                            </div>
                                            <div class="prop">
                                                <span class="title">Programa</span>
                                                <span>${ indicatorProgramation.data.find(process => process.id == indicatorsIndicative?.program)?.description } </span>
                                            </div>
                    
                                            <div class="prop">
                                                <span class="title">Nombre indicador</span>
                                                <span>${ indicatorName.data.find(process => process.id ==  indicatorsIndicative?.indicator )?.description   } </span>
                                            </div>
                    
                                            <div class="prop">
                                            <span class="title">Unidad de medida</span>
                                                <span> ${measurementData.find(item => parseInt(item.itemCode) === indicatorsIndicative.measurement)?.itemDescription }</span>
                                            </div>
                    
                                            <div class="prop">
                                            <span class="title">Plan de desarrollo </span>
                                                <span>${indicatorsIndicative.developmentPlan ? indicatorsIndicative?.developmentPlan :""}</span>
                                            </div>
                    
                                            <div class="prop">
                                                <span class="title">Producto MGA</span>
                                                <span>${productsData?.find(stage => stage.value === indicatorsIndicative.productMGA)?.name}</span>
                                            </div>
                    
                                            <div class="prop">
                                            <span class="title">Meta Año 0 </span>
                                                <span> ${formaterNumberToCurrency(indicatorsIndicative.year0)}</span>
                                            </div>
                    
                                            <div class="prop">
                                            <span class="title">Meta Año 1 </span>
                                                <span>${formaterNumberToCurrency(indicatorsIndicative.year1)}</span>
                                            </div>
                                            <div class="prop">
                                            <span class="title">Meta Año 2 </span>
                                                <span>${formaterNumberToCurrency(indicatorsIndicative.year2)}</span>
                                            </div>
                                            <div class="prop">
                                            <span class="title">Meta Año 3 </span>
                                                <span>${formaterNumberToCurrency(indicatorsIndicative.year3)}</span>
                                            </div>
                                            <div class="prop">
                                            <span class="title">Meta Año 4 </span>
                                                <span>${formaterNumberToCurrency(indicatorsIndicative.year4)}</span>
                                            </div>
                                            <div class="prop">
                                            <span class="title">Meta global </span>
                                                <span> ${ formaterNumberToCurrency(indicatorsIndicative.year0 + indicatorsIndicative.year1 + indicatorsIndicative.year2 + indicatorsIndicative.year3 + indicatorsIndicative.year4)}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')
                            }
                        `  : ""
                    }



                    ${cambios.indicatorsAction ? 
                        ` 
                        <div class="section-name">
                             <div class="section-title-name">Indicadores</div> 
                        </div>
                
                        ${
                            
                            project.data.indicatorsAction?.map(indicatorsAction => `
                            
                            <div class="section-object-2">
                                <div class="section-title">Tipo de indicador:</div>
                                <div>${typeIndicators.data.find(type => type.id == indicatorsAction.type)?.description}</div>
                            </div>
                    
                                <div class="tabla" style = "margin-bottom: 70px;">
                                    <div class="item">
                                        <div class="prop">
                                            <span class="title">Objetivo específico directo</span>
                                            <span> ${objectivesData?.find(stage => stage.value === indicatorsAction?.objective)?.name}</span>
                                        </div>
                                        <div class="prop">
                                            <span class="title">Producto MGA</span>
                                            <span>${productsData?.find(stage => stage.value === indicatorsAction.productMGA)?.name}</span>
                                        </div>
                                        <div class="prop">
                                            <span class="title">Indicador DNP</span>
                                            <span>${indicatorDNP.data.find(process => process.id == indicatorsAction?.dpnIndicator)?.description } </span>
                                        </div>
                
                                        <div class="prop">
                                            <span class="title">Código DNP indicador</span>
                                            <span>${indicatorsAction.dpn ? indicatorsAction?.dpn :""} </span>
                                        </div>
                
                                        <div class="prop">
                                        <span class="title">Unidad de medida</span>
                                            <span> ${measurementData.find(item => parseInt(item.itemCode) === indicatorsAction.measurement)?.itemDescription }</span>
                                        </div>
                
                                        <div class="prop">
                                        <span class="title">Código valor estadístico
                                        </span>
                                            <span>${indicatorsAction.staticValueCode ? indicatorsAction?.staticValueCode :""}</span>
                                        </div>
                
                                        <div class="prop">
                                        <span class="title">Nombre valor estadístico</span>
                                            <span>${indicatorsAction.staticValue ? indicatorsAction?.staticValue :""}</span>
                                        </div>
                
                                        <div class="prop">
                                        <span class="title">Meta Año 0 </span>
                                            <span>${formaterNumberToCurrency(indicatorsAction.year0)}</span>
                                        </div>
                
                                        <div class="prop">
                                        <span class="title">Meta Año 1 </span>
                                            <span>${formaterNumberToCurrency(indicatorsAction.year1)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Meta Año 2 </span>
                                            <span>${formaterNumberToCurrency(indicatorsAction.year2)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Meta Año 3 </span>
                                            <span>${formaterNumberToCurrency(indicatorsAction.year3)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Meta Año 4 </span>
                                            <span>${formaterNumberToCurrency(indicatorsAction.year4)}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Acumulativo cuatrienio </span>
                                            <span> ${ indicatorsAction?.accumulative != undefined ?  dataAcumulativo.find(item => item.value === indicatorsAction?.accumulative )?.name : "Si"}</span>
                                        </div>
                                        <div class="prop">
                                        <span class="title">Meta global </span>
                                            <span> ${indicatorsAction.total ? formaterNumberToCurrency(indicatorsAction?.total) :""}</span>
                                        </div>
                                    </div>
                                </div>
                                <br><br>
                            `).join('')
                        }
                        `  : ""
                    }
                  
                    ${cambios.projectObservation ? 
                         ` 
                            <br>
                            <div class="section">
                                <div class="section-title">5. FLUJO DEL PROYECTO</div>
                            </div>

                            <div class="section-object">
                                <div class="section-title">Observaciones</div>
                                <div >${project.data.observations}</div>
                            </div>

                        `  : ""
                    }

              </div>
              
          </body>
          
          </html>
          `;
        // CONFIGURACION PARA AMBIENTE DE PRODUCCION DEV   
              const browser = await puppeteer.launch({
               headless: "new",
               args: ["--no-sandbox"],
              executablePath: "/usr/bin/chromium",
             });
    
          //const browser = await puppeteer.launch();
          const page = await browser.newPage();
         
          await page.setViewport({ width: 595, height: 842 });
          await page.setContent(contentHTML, {
            waitUntil: "domcontentloaded",
          });
    
          const headerHTML = `
          <div style=\"text-align: right ;width: 80px; font-size: 8px; padding: 0 !important; margin: 0;\" >
                <span class="pageNumber"></span> de <span class="totalPages"></span>
            </div>
            <div style="text-align: center;  margin-bottom: 10px;">
                <img src="data:image/png;base64,${readFileSync(logoPath).toString("base64")}" alt="Logo" style="width: 40%" />
                <div style="text-align: center; margin-bottom: 5px; margin-top: 2px;">
                    <p style="font-size: 15px; font-weight: 700;">INFORMACIÓN DE HISTÓRICOS</p>
                </div>
                
            </div>
    
            `;
    
        const footerHTML = `
        <div style="text-align: center; padding: 0 !important; margin: 0;">
            <img src="data:image/png;base64,${readFileSync(footerPath).toString("base64")}" alt="Footer" style=" width: 30%" />
        </div>
        
        `
        
        ;
          const pdfBuffer = await page.pdf({
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: headerHTML,
            footerTemplate: footerHTML,
            margin: { top: 220, bottom: 90 }
        });
        await page.emulateMediaType("screen");
        
          await browser.close();
    
          response.header('Content-Type', 'application/pdf');
          const nombreArchivo = `Ficha_técnica_${project.data.bpin}_ ${DateProjectArchive}.pdf`;
          response.header('Content-Disposition', `inline; filename=${nombreArchivo}`);
          response.status(200).send(pdfBuffer);
        } catch (err) {
            return response.badRequest(
              new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }


    }


}

}

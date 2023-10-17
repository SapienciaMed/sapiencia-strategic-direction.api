import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import puppeteer from 'puppeteer';
import ProjectProvider from "@ioc:core.ProjectProvider";
import { readFileSync } from "fs";
import Application from "@ioc:Adonis/Core/Application";
import { format } from 'date-fns';
import { DateTime } from 'luxon';
const { es } = require('date-fns/locale');



export default class GeneratePdfController {

  public async generatePdf({ params, response }: HttpContextContract) {
    const projectId = params.id;
    const basePath = "images/";

    const logoPath = Application.makePath(basePath, "logo.png");
    const footerPath = Application.makePath(basePath, "footer.png");

    
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    
    const fechaFormateada = format(fechaActual, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });




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
        DateProject = DateC;
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

     
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: 595, height: 842 });
      await page.setContent(contentHTML);

      await page.screenshot({ path: 'screenshot.png' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
    });
      await browser.close();

      response.header('Content-Type', 'application/pdf');
      const nombreArchivo = `Registro_proyecto_${project.data.bpin}_ ${dia}${mes}${anio}.pdf`;
      response.header('Content-Disposition', `inline; filename=${nombreArchivo}`);
      response.status(200).send(pdfBuffer);
    } catch (error) {
      console.error('Error al generar el PDF', error);
      return response.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

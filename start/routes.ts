/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "Api dirección estrategica de SAPIENCIA";
});

Route.group(() => {
  Route.post("/get-paginated", "ProjectController.getProjectsPaginated");
  Route.post("/get-by-filters", "ProjectController.getProjectsByFilters");
  Route.get("/get-by-user/:user", "ProjectController.getProjectByUser");
  Route.get("/get-by-id/:id", "ProjectController.getProjectById");
  Route.post("/create", "ProjectController.createProject");
  Route.put("/update/:id", "ProjectController.updateProject");
  Route.get("/get-all", "ProjectController.getAllProjects");
  Route.post("/get-all-historical", "ProjectController.getAllHistorical");
  Route.post("/get-all-historical-paginated", "ProjectController.getAllHistoricalPaginated");
  Route.post("/get-project-paginated", "ProjectController.getProjectPaginated");
  Route.get("/status/get-all", "ProjectController.getAllStatus");
  Route.post("/upload/:id", "ProjectController.uploadProjectsDigitals");
  Route.get("/files/get-by-project/:id", "ProjectController.getProjectFiles");
  Route.post("/files/get-file", "ProjectController.getProjectFile");
  Route.post("/files/delete-file", "ProjectController.deleteProjectFile");
  Route.put("/finish-project/:id", "ProjectController.finishProject");
}).prefix("/api/v1/project");

Route.group(() => {
  Route.get("/generate-pdf/:id/generate-pdf-register-project", "GeneratePdfController.generatePdf");
  Route.get("/generate-pdf-consolidate/:id/generate-pdf-consolidate", "GeneratePdfController.CreatePdfConsolidate");
  Route.get("/generate-pdf-historic/:id/:oldId/generate-pdf-historic", "GeneratePdfController.CreatePdfHistoric");

}).prefix("/api/v1/pdf");


Route.group(() => {
  Route.get("/get-all", "EntitiesController.getEntities");
  Route.get("/get-all-dependency", "EntitiesController.getEntitiesDependency");
  Route.get("/get-all-position", "EntitiesController.getEntitiesPosition");
  Route.get("/get-all-typesRisks", "EntitiesController.getEntitiesTypesRisks")
  Route.get("/get-all-probability", "EntitiesController.getEntitiesProbability")
  Route.get("/get-all-impact", "EntitiesController.getEntitiesImpact")
  Route.get("/get-all-entity", "EntitiesController.getEntity")
  Route.get("/get-all-resource", "EntitiesController.getResource")
}).prefix("/api/v1/entities");

Route.group(() => {
  Route.get(
    "/get-by-id/:id",
    "MeasurementCapacityController.getMeasurementCapacityById"
  );
  Route.get("/", "MeasurementCapacityController.getMeasurementCapacity");
  Route.post(
    "/create",
    "MeasurementCapacityController.createMeasurementCapacity"
  );
  Route.put(
    "/update/:id",
    "MeasurementCapacityController.updateMeasurementCapacity"
  );
}).prefix("/api/v1/measurement-capacity");

Route.group(() => {
  Route.get("/get-by-id/:id", "ImpactLevelController.getImpactLevelById");
  Route.get("/", "ImpactLevelController.getImpactLevel");
  Route.post("/create", "ImpactLevelController.createImpactLevel");
  Route.put("/update/:id", "ImpactLevelController.updateImpactLevel");
}).prefix("/api/v1/impact-level");

Route.group(() => {
  Route.get("/get-by-id/:id", "ImpactTypeController.getImpactTypeById");
  Route.get("/", "ImpactTypeController.getImpactType");
  Route.post("/create", "ImpactTypeController.createImpactType");
  Route.put("/update/:id", "ImpactTypeController.updateImpactType");
}).prefix("/api/v1/impact-type");

Route.group(() => {
  Route.get("/get-by-id/:id", "ImpactRatingController.getImpactRatingById");
  Route.get("/", "ImpactRatingController.getImpactRating");
  Route.post("/create", "ImpactRatingController.createImpactRating");
  Route.put("/update/:id", "ImpactRatingController.updateImpactRating");
}).prefix("/api/v1/impact-rating");
// .middleware("auth");

Route.group(() => {
  Route.get("/get-all", "ComponentsController.getComponents");
}).prefix("/api/v1/components");

Route.group(() => {
  Route.get("/get-all", "StageController.getStages");
}).prefix("/api/v1/stages");

Route.group(() => {
  Route.post("/generate-consolidated", "ActivitiesController.generateConsolidated");
  Route.post("/get-by-filters", "ActivitiesController.getDetailedActivitiesByFilters")
  Route.post("/get-paginated", "ActivitiesController.getDetailedActivitiesPaginated")
  Route.post("/mga/get-by-filters", "ActivitiesController.getActivitiesByFilters")
}).prefix("/api/v1/activities");



Route.group(() => {
  Route.get("/dpn/get-all", "IndicatorsController.getIndicatorDNP");
  Route.get("/name/get-all", "IndicatorsController.getIndicatorName");
  Route.get("/type/get-all", "IndicatorsController.getIndicatorType");
  Route.get("/component/get-all", "IndicatorsController.getIndicatorsComponent");
  Route.get("/programation/get-all", "IndicatorsController.getProgramation");
  Route.get("/strategic-line/get-all", "IndicatorsController.getStrategicLine");
}).prefix("/api/v1/indicators");
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
  return "Api contabilidad de SAPIENCIA";
});

Route.group(() => {
  Route.get("/get-by-id/:id", "ProjectController.getProjectById");
  Route.post("/create", "ProjectController.createProject");
  Route.put("/update/:id", "ProjectController.updateProject");
}).prefix("/api/v1/project");

Route.group(() => {
  Route.get("/get-by-id/:id", "MeasurementCapacityController.getMeasurementCapacityById");
  Route.get("/", "MeasurementCapacityController.getMeasurementCapacity");
  Route.post("/create", "MeasurementCapacityController.createMeasurementCapacity");
  Route.put("/update/:id", "MeasurementCapacityController.updateMeasurementCapacity");
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

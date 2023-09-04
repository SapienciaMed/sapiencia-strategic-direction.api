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
// .middleware("auth");

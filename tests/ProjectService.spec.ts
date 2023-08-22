import test from "japa";

import ProjectService from "App/Services/ProjectService";
import { ProjectRepositoryFake } from "./FakeClass/ProjectRepositoryFake";
import { ApiResponse } from "App/Utils/ApiResponses";

const service = new ProjectService(new ProjectRepositoryFake());

test.group("RolService TEST for getProjectById", () => {
  test("class service must have a method getProjectById with a return", async (assert) => {
    const result = service.getProjectById(1);
    assert.isNotNull(result);
  });

  test("the method getProjectById must be a promise", async (assert) => {
    const result = service.getProjectById(1);
    assert.typeOf(result, "Promise");
  });

  test("the method getProjectById must return a ApiResponse", async (assert) => {
    const result = await service.getProjectById(1);
    assert.instanceOf(result, ApiResponse);
  });

  // test("the method getProjectById must return a OK code ", async (assert) => {
  //   const result = await service.getProjectById(1);
  //   assert.isTrue(result.operation.code === EResponseCodes.OK);
  // });

  // test("the method getProjectById must return a array", async (assert) => {
  //   const result = await service.getProjectById(1);

  //   assert.isArray(result.data);
  // });
});

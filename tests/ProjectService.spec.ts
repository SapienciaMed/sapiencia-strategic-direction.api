
import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import ProjectService from "App/Services/ProjectService";
import ProjectRepositoryFake from "./FakeClass/ProjectRepositoryFake";
import CausesRepositoryFake from "./FakeClass/CausesRepositoryFake";
import EffectsRepositoryFake from "./FakeClass/EffectsRepositoryFake";
import ActorsRepositoryFake from "./FakeClass/ActorsRepositoryFake";
import ClassificationsRepositoryFake from "./FakeClass/ClassificationsRepositoryFake";
import SpecificObjectivesRepositoryFake from "./FakeClass/SpecificObjectivesRepositoryFake";
import EnvironmentalEffectsRepositoryFake from "./FakeClass/EnvironmentalEffectsRepositoryFake";
import ActivitiesRepositoryFake from "./FakeClass/ActivitiesRepositoryFake";
import RisksRepositoryFake from "./FakeClass/RisksRepositoryFake";
import ProfitsIncomeRepositoryFake from "./FakeClass/ProfitsIncomeRepositoryFake";
import SourceFundingRepositoryFake from "./FakeClass/SourceFundingRepositoryFake";
import IndicatorsRepositoryFake from "./FakeClass/IndicatorsRepositoryFake";
import LogicFrameRepositoryFake from "./FakeClass/LogicFrameRepositoryFake";
import HistoricalProjectsRepositoryFake from "./FakeClass/HistoricalProjectsRepositoryFake";
import { IProjectFiltersHistorical } from "App/Interfaces/ProjectInterfaces";

const service = new ProjectService(
  new ProjectRepositoryFake(),
  new CausesRepositoryFake(),
  new EffectsRepositoryFake(),
  new ActorsRepositoryFake(),
  new ClassificationsRepositoryFake(),
  new SpecificObjectivesRepositoryFake(),
  new EnvironmentalEffectsRepositoryFake(),
  new ActivitiesRepositoryFake(),
  new RisksRepositoryFake(),
  new ProfitsIncomeRepositoryFake(),
  new SourceFundingRepositoryFake(),
  new IndicatorsRepositoryFake(),
  new LogicFrameRepositoryFake(),
  new HistoricalProjectsRepositoryFake(),
);

const filtersHistorical: IProjectFiltersHistorical = {
  bpin: "2909",
  project: "test",
  validity: "2023"
}

test.group("Project Service TEST for getAllHistorical", () => {
  test("class service must have a method getAllHistorical with a return", async (assert) => {
    const result = service.getAllHistorical(filtersHistorical);
    assert.isNotNull(result);
  });

  test("the method getAllHistorical must be a promise", async (assert) => {
    const result = service.getAllHistorical(filtersHistorical);
    assert.typeOf(result, "Promise");
  });

  test("the method getAllHistorical must return a ApiResponse", async (assert) => {
    const result = service.getAllHistorical(filtersHistorical);
    assert.instanceOf( ( await result ) , ApiResponse);
  });

  test("the method getAllHistorical must return a Success code ", async (assert) => {
    const result = service.getAllHistorical(filtersHistorical);
    assert.isTrue( ( await result ).operation.code === EResponseCodes.OK);
  });

  test("the method getAllHistorical must return a intance of Array ", async (assert) => {
    const result = service.getAllHistorical(filtersHistorical);
    assert.isArray( ( await result).data );
  });
});
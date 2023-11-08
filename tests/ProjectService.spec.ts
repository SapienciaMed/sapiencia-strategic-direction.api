
import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
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
import { IProject } from "App/Interfaces/ProjectInterfaces";

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
  new LogicFrameRepositoryFake()
);

const filters = {
  page: 1,
  perPage: 10,
  bpin: 2909
}

test.group("Project Service TEST for getAllHistorical", () => {
  test("class service must have a method getAllTypesCoverage with a return", async (assert) => {
    const result = service.getAllHistorical();
    assert.isNotNull(result);
  });

  test("the method getAllHistorical must be a promise", async (assert) => {
    const result = service.getAllHistorical();
    assert.typeOf(result, "Promise");
  });

  test("the method getAllHistorical must return a ApiResponse", async (assert) => {
    const result = service.getAllHistorical();
    assert.instanceOf( ( await result ) , ApiResponse);
  });

  test("the method getAllHistorical must return a Success code ", async (assert) => {
    const result = service.getAllHistorical();
    assert.isTrue( ( await result ).operation.code === EResponseCodes.OK);
  });

  test("the method getAllHistorical must return a intance of Array ", async (assert) => {
    const result = service.getAllHistorical();
    assert.isArray( ( await result).data );
  });
});


test.group("Coverage TEST for getAllHistoricalPaginated ", () => {
  test("the get paginated method should return a not null object", async (assert) => {
    const data = await service.getAllHistoricalPaginated(filters) as ApiResponse<IPagingData<IProject>>;
    let result = {
        array: data as ApiResponse<IPagingData<IProject>>
    }
    assert.isNotNull(result);
  });

  test("the get paginated method should return a PaginatedResponse Object", async (assert) => {
    const result = service.getAllHistoricalPaginated(filters);
    assert.instanceOf( ( await result ), ApiResponse);
  });

  test("the method getAllHistoricalPaginated must return success", async (assert) => {
    const result = await service.getAllHistoricalPaginated(filters);
    assert.isTrue( result.operation.code === EResponseCodes.OK);
  });

  test("the method getAllHistoricalPaginated must return an empty array", async (assert) => {
    const result = await service.getAllHistoricalPaginated(filters);
    assert.isEmpty(result.data);
  });

});
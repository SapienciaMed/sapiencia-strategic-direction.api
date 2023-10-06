import type { ApplicationContract } from "@ioc:Adonis/Core/Application";


export default class AppProvider {
  constructor(protected app: ApplicationContract) { }

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const ProjectService = await import("App/Services/ProjectService");
    const MeasurementCapacityService = await import("App/Services/MeasurementCapacityService");
    const ImpactLevelService = await import("App/Services/ImpactLevelService");
    const ImpactTypeService = await import("App/Services/ImpactTypeService");
    const ImpactRatingService = await import("App/Services/ImpactRatingService");
    const EntitiesService = await import("App/Services/EntitiesService");
    const ComponentsService = await import("App/Services/ComponentsService");
    const StageService = await import("App/Services/StageService");
    const ActivityService = await import("App/Services/ActivityService");
    const IndicatorsService = await import("App/Services/IndicatorsService");

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const ProjectRepository = await import(
      "App/Repositories/ProjectRepository"
    );

    const CausesRepository = await import(
      "App/Repositories/CausesRepository"
    );

    const EntitiesRepository = await import(
      "App/Repositories/EntitiesRepository"
    );

    const EffectsRepository = await import(
      "App/Repositories/EffectsRepository"
    );

    const ActorsRepository = await import(
      "App/Repositories/ActorsRepository"
    );
    
    const MeasurementCapacityRepository = await import(
      "App/Repositories/MeasurementCapacityRepository"
    );

    const ImpactLevelRepository = await import(
      "App/Repositories/ImpactLevelRepository"
    );

    const ImpactTypeRepository = await import(
      "App/Repositories/ImpactTypeRepository"
    );

    const ImpactRatingRepository = await import(
      "App/Repositories/ImpactRatingRepository"
    );

    const ClassificationsRepository = await import(
      "App/Repositories/ClassificationsRepository"
    );

    const SpecificObjectivesRepository = await import(
      "App/Repositories/SpecificObjectivesRepository"
    );

    const EnvironmentalEffectsRepository = await import(
      "App/Repositories/EnvironmentalEffectsRepository"
    );

    const ActivitiesRepository = await import(
      "App/Repositories/ActivitiesRepository"
    );

    const ComponentsRepository = await import(
      "App/Repositories/ComponentsRepository"
    );

    const StageRepository = await import(
      "App/Repositories/StageRepository"
    );

    const RisksRepository = await import(
      "App/Repositories/RisksRepository"
    );

    const ProfitsIncomeRepository = await import(
      "App/Repositories/ProfitsIncomeRepository"
    );

    const SourceFundingRepository = await import(
      "App/Repositories/sourceFundingRepository"
    );

    const IndicatorsRepository = await import(
      "App/Repositories/IndicatorsRepository"
    );
    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/

    this.app.container.singleton(
      "core.ActivityProvider",
      () => new ActivityService.default(
        new ActivitiesRepository.default(),
    
      )
    );

    
    this.app.container.singleton(
      "core.ProjectProvider",
      () => new ProjectService.default(
        new ProjectRepository.default(),
        new CausesRepository.default(),
        new EffectsRepository.default(),
        new ActorsRepository.default(),
        new ClassificationsRepository.default(),
        new SpecificObjectivesRepository.default(),
        new EnvironmentalEffectsRepository.default(),
        new ActivitiesRepository.default(),
        new RisksRepository.default(),
        new ProfitsIncomeRepository.default(),
        new SourceFundingRepository.default(),
        new IndicatorsRepository.default(),
      )
    );

    this.app.container.singleton(
      "core.MeasurementCapacityProvider",
      () => new MeasurementCapacityService.default(
        new MeasurementCapacityRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.ImpactLevelProvider",
      () => new ImpactLevelService.default(
        new ImpactLevelRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.ImpactTypeProvider",
      () => new ImpactTypeService.default(
        new ImpactTypeRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.ImpactRatingProvider",
      () => new ImpactRatingService.default(
        new ImpactRatingRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.EntitiesProvider",
      () => new EntitiesService.default(new EntitiesRepository.default())
    );

    this.app.container.singleton(
      "core.ComponentsProvider",
      () => new ComponentsService.default(
        new ComponentsRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.StageProvider",
      () => new StageService.default(
        new StageRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.IndicatorsProvider",
      () => new IndicatorsService.default(
        new IndicatorsRepository.default(),
      ),
    );
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}

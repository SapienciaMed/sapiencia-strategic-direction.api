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
    const AntiCorruptionPlanStatusService = await import("App/Services/AntiCorruptionPlanStatusService");
    const AntiCorruptionPlanComponentService = await import("App/Services/AntiCorruptionPlanComponentService");
    const AntiCorruptionPlanComponentActivityService = await import("App/Services/AntiCorruptionPlanComponentActivityService");
    const AntiCorruptionPlanIndicatorService = await import("App/Services/AntiCorruptionPlanIndicatorService");
    const AntiCorruptionPlanResponsibleService = await import("App/Services/AntiCorruptionPlanResponsibleService");
    const AntiCorruptionPlanService = await import("App/Services/AntiCorruptionPlanService");
    const ImpactRatingService = await import("App/Services/ImpactRatingService");
    const EntitiesService = await import("App/Services/EntitiesService");
    const ComponentsService = await import("App/Services/ComponentsService");
    const StageService = await import("App/Services/StageService");
    const ActivityService = await import("App/Services/ActivityService");
    const IndicatorsService = await import("App/Services/IndicatorsService");
    const StorageService = await import("App/Services/StorageService");
    const SchedulesPAIService = await import("App/Services/SchedulesPAIService");
    const IndicatorsPAIService = await import("App/Services/IndicatorsPAIService");
    const ActionPlanService = await import("App/Services/ActionPlanService");


    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/
    const CoreService = await import("App/Services/External/CoreService")

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const ProjectRepository = await import(
      "App/Repositories/ProjectRepository"
    );

    const ActionPlanRepository = await import(
      "App/Repositories/ActionPlanRepository"
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

    const AntiCorruptionPlanStatusRepository = await import(
      "App/Repositories/AntiCorruptionPlanStatusRepository"
    );

    const AntiCorruptionPlanComponentRepository = await import(
      "App/Repositories/AntiCorruptionPlanComponentRepository"
    );

  
    const AntiCorruptionPlanIndicatorRepository = await import(
      "App/Repositories/AntiCorruptionPlanIndicatorRepository"
    );

    const AntiCorruptionPlanComponentActivityRepository = await import(
      "App/Repositories/AntiCorruptionPlanComponentActivityRepository"
    );

    const AntiCorruptionPlanResponsibleRepository = await import(
      "App/Repositories/AntiCorruptionPlanResponsibleRepository"
    );

    const AntiCorruptionPlanRepository = await import(
      "App/Repositories/AntiCorruptionPlanRepository"
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
      "App/Repositories/SourceFundingRepository"
    );

    const IndicatorsRepository = await import(
      "App/Repositories/IndicatorsRepository"
    );

    const LogicFrameRepository = await import(
      "App/Repositories/LogicFrameRepository"
    );

    const HistoricalProjects = await import(
      "App/Repositories/HistoricalProjectsRepository"
    );

    const SchedulesPAIRepository = await import(
      "App/Repositories/SchedulesPAIRepository"
    );

    const IndicatorsPAIRepository = await import(
      "App/Repositories/IndicatorsPAIRepository"
    );

    const RevisionPAIRepository = await import(
      "App/Repositories/RevisionPAIRepository"
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
        new LogicFrameRepository.default(),
        new HistoricalProjects.default(),
      )
    );

    this.app.container.singleton(
      "core.ActionPlanProvider",
      () => new ActionPlanService.default(
        new ActionPlanRepository.default(),
        new RevisionPAIRepository.default(),
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
      "core.AntiCorruptionPlanStatusProvider",
      () => new AntiCorruptionPlanStatusService.default(
        new AntiCorruptionPlanStatusRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.AntiCorruptionPlanProvider",
      () => new AntiCorruptionPlanService.default(
        new AntiCorruptionPlanRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.AntiCorruptionPlanComponentProvider",
      () => new AntiCorruptionPlanComponentService.default(
        new AntiCorruptionPlanComponentRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.AntiCorruptionPlanComponentActivityProvider",
      () => new AntiCorruptionPlanComponentActivityService.default(
        new AntiCorruptionPlanComponentActivityRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.AntiCorruptionPlanIndicatorProvider",
      () => new AntiCorruptionPlanIndicatorService.default(
        new AntiCorruptionPlanIndicatorRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.AntiCorruptionPlanResponsibleProvider",
      () => new AntiCorruptionPlanResponsibleService.default(
        new AntiCorruptionPlanResponsibleRepository.default(),
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

    this.app.container.singleton(
      "core.IndicatorsPAIProvider",
      () => new IndicatorsPAIService.default(
        new IndicatorsPAIRepository.default(),
      ),
    );

    this.app.container.singleton(
      "core.SchedulesPAIProvider",
      () => new SchedulesPAIService.default(
        new SchedulesPAIRepository.default()
      )
    );

    this.app.container.singleton(
      "core.StorageProvider",
      () => new StorageService.default()
    );

    this.app.container.singleton(
      "core.CoreProvider",
      () => new CoreService.default()
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

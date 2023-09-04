import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) { }

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const ProjectService = await import("App/Services/ProjectService");

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

    const EffectsRepository = await import(
      "App/Repositories/EffectsRepository"
    );

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/

    this.app.container.singleton(
      "core.ProjectProvider",
      () => new ProjectService.default(
        new ProjectRepository.default(),
        new CausesRepository.default(),
        new EffectsRepository.default()
      )
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

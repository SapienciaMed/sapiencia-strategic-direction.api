declare module "@ioc:core.ProjectProvider" {
  import { IProjectService } from "App/Services/ProjectService";

  const ProjectProvider: IProjectService;
  export default ProjectProvider;
}

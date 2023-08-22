import { IProject } from "App/Interfaces/ProjectInterfaces";
import { IProjectRepository } from "App/Repositories/ProjectRepository";

export class ProjectRepositoryFake implements IProjectRepository {
  getProjectById(_id: number): Promise<IProject | null> {
    return new Promise((res) => {
      res(null);
    });
  }
}

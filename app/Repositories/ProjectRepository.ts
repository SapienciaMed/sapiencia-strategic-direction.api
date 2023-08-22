import { IProject } from "App/Interfaces/ProjectInterfaces";
import Project from "../Models/Project";

export interface IProjectRepository {
  getProjectById(id: number): Promise<IProject | null>;
}

export default class ProjectRepository implements IProjectRepository {
  constructor() {}

  async getProjectById(id: number): Promise<IProject | null> {
    const res = await Project.find(id);
    return res ? (res.serialize() as IProject) : null;
  }
}

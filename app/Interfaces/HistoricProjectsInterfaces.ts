import { DateTime } from "luxon";
import { IProject } from "./ProjectInterfaces";

export interface IHistoricalProject {
    id?: number;
    idProject: number;
    version: string;
    json: string;
    userCreate: string;
    dateCreate?: DateTime;
    project?: IProject;
}
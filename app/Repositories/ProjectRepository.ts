import {
  IProject,
  IProjectFilters,
  IProjectPaginated,
  IProjectTemp,
  IProjectFiltersPaginated,
  IFinishProjectForm,
  IHistoricalFiltersPaginated,
  IProjectFiltersHistorical
} from "App/Interfaces/ProjectInterfaces";
import Projects from "../Models/Projects";
import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import { IPagingData } from "App/Utils/ApiResponses";
import { MasterTable } from "App/Interfaces/MasterTableInterfaces";
import Status from "App/Models/Status";
import { DateTime } from "luxon";
import { IProjectRepository } from "App/Interfaces/repositories/IProjectRepository";

export default class ProjectRepository implements IProjectRepository {
  async getProjectsPaginated(
    filters: IProjectPaginated
  ): Promise<IPagingData<IProject>> {
    const query = Projects.query();

    if (filters.excludeIds) {
      query.whereNotIn("id", filters.excludeIds);
    }

    if (filters.nameOrCode) {
      query.andWhere((sub) => {
        sub.whereILike("bpin", `%${filters.nameOrCode}%`);
        sub.orWhereILike("project", `%${filters.nameOrCode}%`);
      });
    }
    const res = await query.paginate(filters.page, filters.perPage);
    const { data, meta } = res.serialize();

    return {
      array: data as IProject[],
      meta,
    };
  }

  async getProjectsByFilters(filters: IProjectFilters): Promise<IProject[]> {
    const query = Projects.query();

    if (filters.codeList) {
      query.whereIn("bpin", filters.codeList);
    }

    if (filters.idList) {
      query.whereIn("id", filters.idList);
    }

    if (filters.status) {
      query.where("status", filters.status);
    }
    const res = await query;

    return res.map((i) => i.serialize() as IProject);
  }

  async getProjectByUser(user: string): Promise<IProject | null> {
    const query = Projects.query().where("user", user).andWhere("status", 1);
    query.preload("causes", (query) => {
      query.preload("childrens");
    });
    query.preload("effects", (query) => {
      query.preload("childrens");
    });
    query.preload("actors");
    query.preload("classifications");
    query.preload("specificObjectives", (query) => {
      query.preload("estatesService");
    });
    query.preload("environmentalEffects");
    query.preload("activities", (query) => {
      query.preload("detailActivities");
      query.preload("budgetsMGA");
    });
    query.preload("risks");
    query.preload("profitsIncome", (query) => {
      query.preload("period");
    });
    query.preload("sourceFunding");
    query.preload("indicatorsAction");
    query.preload("indicatorsIndicative");
    query.preload("logicFrame");
    const resQuery = await query;
    resQuery.forEach(res => {
      if (res?.goal) {
        res.goal = Number(res.goal);
      }
      if (res?.specificObjectives) {
        res.specificObjectives.forEach((obj, index) => {
          const objetive = res.causes.find((cause) => cause.id === obj.objetive);
          if (objetive) {
            res.specificObjectives[index].objetive = objetive;
          }
        });
      }
      if (res?.activities) {
        res.activities.forEach((obj, index) => {
          const objetive = res.causes.find(
            (cause) => cause.id === obj.objetiveActivity
          );
          if (objetive) {
            res.activities[index].objetiveActivity = objetive;
          }
        });
      }
    })
    return resQuery[0] ? resQuery[0].serialize() as IProject : null;
  }

  async getProjectById(id: number): Promise<IProject | null> {
    const query = Projects.query().where("id", id);
    query.preload("causes", (query) => {
      query.preload("childrens");
    });
    query.preload("effects", (query) => {
      query.preload("childrens");
    });
    query.preload("actors");
    query.preload("classifications");
    query.preload("specificObjectives", (query) => {
      query.preload("estatesService");
    });
    query.preload("environmentalEffects");
    query.preload("activities", (query) => {
      query.preload("detailActivities");
      query.preload("budgetsMGA");
    });
    query.preload("risks");
    query.preload("profitsIncome", (query) => {
      query.preload("period");
    });
    query.preload("sourceFunding");
    query.preload("indicatorsAction");
    query.preload("indicatorsIndicative");
    query.preload("logicFrame");
    const resQuery = await query;
    resQuery.forEach(res => {
      if (res?.goal) {
        res.goal = Number(res.goal);
      }
      if (res?.specificObjectives) {
        res.specificObjectives.forEach((obj, index) => {
          const objetive = res.causes.find((cause) => cause.id === obj.objetive);
          if (objetive) {
            res.specificObjectives[index].objetive = objetive;
          }
        });
      }
      if (res?.activities) {
        res.activities.forEach((obj, index) => {
          const objetive = res.causes.find(
            (cause) => cause.id === obj.objetiveActivity
          );
          if (objetive) {
            res.activities[index].objetiveActivity = objetive;
          }
        });
      }
    })
    return resQuery[0] ? resQuery[0].serialize() as IProject : null;
  }

  async createProject(
    project: IProjectTemp,
    trx: TransactionClientContract
  ): Promise<IProject> {
    const toCreate = new Projects();
    toCreate.user = project.user;

    const query = Projects.query();

    if (project.register?.bpin) {
      const existingProject = await query.where("bpin", project.register?.bpin)
        .orderBy('PRY_VERSION', 'desc')
        .limit(1);
      if (existingProject && existingProject.length > 0 && (project?.status !== 2 && project?.status !== 3)) {
        throw new Error("Ya existe un proyecto con este BPIN.");
      }
      const updatedVersion: string = this.updateProjectVersion(existingProject[0]?.version);

      toCreate.dateModify = DateTime.local().toJSDate();
      toCreate.version = project.status === 2 ? "1.00" : updatedVersion;
      toCreate.bpin = project.register.bpin;
    }

    if (project?.status !== undefined) {
      toCreate.status = project.status;
    }

    if (project.register?.project) {
      toCreate.project = project.register.project;
    }
    if (project.register?.dateFrom) {
      toCreate.dateFrom = Number(project.register.dateFrom);
    }
    if (project.register?.dateTo) {
      toCreate.dateTo = Number(project.register.dateTo);
    }
    if (project.register?.process !== undefined) {
      toCreate.process = project.register.process;
    }
    if (project.register?.dependency !== undefined) {
      toCreate.dependency = project.register.dependency;
    }
    if (project.register?.localitation !== undefined) {
      toCreate.localitation = project.register.localitation;
    }
    if (project.register?.object) {
      toCreate.object = project.register.object;
    }
    if (project.identification?.problemDescription?.problemDescription) {
      toCreate.problemDescription =
        project.identification.problemDescription.problemDescription;
    }
    if (project.identification?.problemDescription?.magnitude) {
      toCreate.magnitude = project.identification.problemDescription.magnitude;
    }
    if (project.identification?.problemDescription?.centerProblem) {
      toCreate.centerProblem =
        project.identification.problemDescription.centerProblem;
    }
    if (project.identification?.planDevelopment?.pnd_pacto) {
      toCreate.pnd_pacto = project.identification.planDevelopment.pnd_pacto;
    }
    if (project.identification?.planDevelopment?.pnd_linea) {
      toCreate.pnd_linea = project.identification.planDevelopment.pnd_linea;
    }
    if (project.identification?.planDevelopment?.pnd_programa) {
      toCreate.pnd_programa =
        project.identification.planDevelopment.pnd_programa;
    }
    if (project.identification?.planDevelopment?.pdd_linea) {
      toCreate.pdd_linea = project.identification.planDevelopment.pdd_linea;
    }
    if (project.identification?.planDevelopment?.pdd_componentes) {
      toCreate.pdd_componentes =
        project.identification.planDevelopment.pdd_componentes;
    }
    if (project.identification?.planDevelopment?.pdd_programa) {
      toCreate.pdd_programa =
        project.identification.planDevelopment.pdd_programa;
    }
    if (project.identification?.planDevelopment?.pdi_linea) {
      toCreate.pdi_linea = project.identification.planDevelopment.pdi_linea;
    }
    if (project.identification?.planDevelopment?.pdi_componentes) {
      toCreate.pdi_componentes =
        project.identification.planDevelopment.pdi_componentes;
    }
    if (project.identification?.planDevelopment?.pdi_programa) {
      toCreate.pdi_programa =
        project.identification.planDevelopment.pdi_programa;
    }
    if (project.identification?.objectives?.indicators) {
      toCreate.indicators = project.identification.objectives.indicators;
    }
    if (project.identification?.objectives?.measurement !== undefined) {
      toCreate.measurement = project.identification.objectives.measurement;
    }
    if (project.identification?.objectives?.goal !== undefined) {
      toCreate.goal = project.identification.objectives.goal;
    }
    if (project.identification?.poblation?.objectivePeople !== undefined) {
      toCreate.objectivePeople =
        project.identification.poblation.objectivePeople;
    }
    if (project.identification?.poblation?.informationSource) {
      toCreate.informationSource =
        project.identification.poblation.informationSource;
    }
    if (project.identification?.poblation?.region !== undefined) {
      toCreate.region = project.identification.poblation.region;
    }
    if (project.identification?.poblation?.departament !== undefined) {
      toCreate.departament = project.identification.poblation.departament;
    }
    if (project.identification?.poblation?.district !== undefined) {
      toCreate.district = project.identification.poblation.district;
    }
    if (project.identification?.poblation?.shelter) {
      toCreate.shelter = project.identification.poblation.shelter;
    }
    if (project.preparation?.technicalAnalysis?.alternative) {
      toCreate.alternative = project.preparation.technicalAnalysis.alternative;
    }
    if (project.preparation?.technicalAnalysis?.resumeAlternative) {
      toCreate.resumeAlternative =
        project.preparation.technicalAnalysis.resumeAlternative;
    }
    if (project.preparation?.capacity?.descriptionCapacity) {
      toCreate.descriptionCapacity =
        project.preparation.capacity.descriptionCapacity;
    }
    if (project.preparation?.capacity?.unitCapacity !== undefined) {
      toCreate.unitCapacity = project.preparation.capacity.unitCapacity;
    }
    if (project.preparation?.capacity?.capacityGenerated !== undefined) {
      toCreate.capacityGenerated =
        project.preparation.capacity.capacityGenerated;
    }
    if (project.preparation?.enviromentalAnalysis?.environmentDiagnosis) {
      toCreate.environmentDiagnosis =
        project.preparation.enviromentalAnalysis.environmentDiagnosis;
    }
    if (project.transfers?.formulation) {
      toCreate.formulation = project.transfers.formulation;
    }
    if (project.transfers?.rol) {
      toCreate.rol = project.transfers.rol;
    }
    if (project.transfers?.order) {
      toCreate.order = project.transfers.order;
    }
    if (project.transfers?.tecniques !== undefined) {
      toCreate.tecniques = project.transfers?.tecniques;
    }
    if (project.transfers?.ambiental !== undefined) {
      toCreate.ambiental = project.transfers?.ambiental;
    }
    if (project.transfers?.sociocultural !== undefined) {
      toCreate.sociocultural = project.transfers?.sociocultural;
    }
    if (project.transfers?.observations) {
      toCreate.observations = project.transfers.observations;
    }

    toCreate.useTransaction(trx);
    await toCreate.save();
    return toCreate.serialize() as IProject;
  }

  async updateProject(
    project: IProjectTemp,
    id: number,
    trx: TransactionClientContract
  ): Promise<IProject | null> {
    const toUpdate = await Projects.find(id);
    if (!toUpdate) {
      return null;
    }

    const query = Projects.query();

    if (project.register?.bpin && toUpdate.$attributes.bpin != project.register?.bpin ) {
      const existingProject = await query.where("bpin", project.register?.bpin);
      if (existingProject) throw new Error("Ya existe un proyecto con este BPIN.");
      toUpdate.bpin = project.register.bpin;
    }

    toUpdate.user = project.user;
    if (project?.status !== undefined) {
      toUpdate.status = project.status;
    }

    if (project.tempTab !== undefined && project.tempTab !== null) {
      toUpdate.tempTab = project.tempTab;
    }

    if (project.register?.project) {
      toUpdate.project = project.register.project;
    }
    if (project.register?.dateFrom) {
      toUpdate.dateFrom = Number(project.register.dateFrom);
    }
    if (project.register?.dateTo) {
      toUpdate.dateTo = Number(project.register.dateTo);
    }
    if (project.register?.process !== undefined) {
      toUpdate.process = project.register.process;
    }
    if (project.register?.dependency !== undefined) {
      toUpdate.dependency = project.register.dependency;
    }
    if (project.register?.localitation !== undefined) {
      toUpdate.localitation = project.register.localitation;
    }
    if (project.register?.object) {
      toUpdate.object = project.register.object;
    }
    if (project.identification?.problemDescription?.problemDescription) {
      toUpdate.problemDescription =
        project.identification.problemDescription.problemDescription;
    }
    if (project.identification?.problemDescription?.magnitude) {
      toUpdate.magnitude = project.identification.problemDescription.magnitude;
    }
    if (project.identification?.problemDescription?.centerProblem) {
      toUpdate.centerProblem =
        project.identification.problemDescription.centerProblem;
    }
    if (project.identification?.planDevelopment?.pnd_pacto) {
      toUpdate.pnd_pacto = project.identification.planDevelopment.pnd_pacto;
    }
    if (project.identification?.planDevelopment?.pnd_linea) {
      toUpdate.pnd_linea = project.identification.planDevelopment.pnd_linea;
    }
    if (project.identification?.planDevelopment?.pnd_programa) {
      toUpdate.pnd_programa =
        project.identification.planDevelopment.pnd_programa;
    }
    if (project.identification?.planDevelopment?.pdd_linea) {
      toUpdate.pdd_linea = project.identification.planDevelopment.pdd_linea;
    }
    if (project.identification?.planDevelopment?.pdd_componentes) {
      toUpdate.pdd_componentes =
        project.identification.planDevelopment.pdd_componentes;
    }
    if (project.identification?.planDevelopment?.pdd_programa) {
      toUpdate.pdd_programa =
        project.identification.planDevelopment.pdd_programa;
    }
    if (project.identification?.planDevelopment?.pdi_linea) {
      toUpdate.pdi_linea = project.identification.planDevelopment.pdi_linea;
    }
    if (project.identification?.planDevelopment?.pdi_componentes) {
      toUpdate.pdi_componentes =
        project.identification.planDevelopment.pdi_componentes;
    }
    if (project.identification?.planDevelopment?.pdi_programa) {
      toUpdate.pdi_programa =
        project.identification.planDevelopment.pdi_programa;
    }
    if (project.identification?.objectives?.indicators) {
      toUpdate.indicators = project.identification.objectives.indicators;
    }
    if (project.identification?.objectives?.measurement !== undefined) {
      toUpdate.measurement = project.identification.objectives.measurement;
    }
    if (project.identification?.objectives?.goal !== undefined) {
      toUpdate.goal = project.identification.objectives.goal;
    }
    if (project.identification?.poblation?.objectivePeople !== undefined) {
      toUpdate.objectivePeople =
        project.identification.poblation.objectivePeople;
    }
    if (project.identification?.poblation?.informationSource) {
      toUpdate.informationSource =
        project.identification.poblation.informationSource;
    }
    if (project.identification?.poblation?.region !== undefined) {
      toUpdate.region = project.identification.poblation.region;
    }
    if (project.identification?.poblation?.departament !== undefined) {
      toUpdate.departament = project.identification.poblation.departament;
    }
    if (project.identification?.poblation?.district !== undefined) {
      toUpdate.district = project.identification.poblation.district;
    }
    if (project.identification?.poblation?.shelter) {
      toUpdate.shelter = project.identification.poblation.shelter;
    }
    if (project.preparation?.technicalAnalysis?.alternative) {
      toUpdate.alternative = project.preparation.technicalAnalysis.alternative;
    }
    if (project.preparation?.technicalAnalysis?.resumeAlternative) {
      toUpdate.resumeAlternative =
        project.preparation.technicalAnalysis.resumeAlternative;
    }
    if (project.preparation?.capacity?.descriptionCapacity) {
      toUpdate.descriptionCapacity =
        project.preparation.capacity.descriptionCapacity;
    }
    if (project.preparation?.capacity?.unitCapacity !== undefined) {
      toUpdate.unitCapacity = project.preparation.capacity.unitCapacity;
    }
    if (project.preparation?.capacity?.capacityGenerated !== undefined) {
      toUpdate.capacityGenerated =
        project.preparation.capacity.capacityGenerated;
    }
    if (project.preparation?.enviromentalAnalysis?.environmentDiagnosis) {
      toUpdate.environmentDiagnosis =
        project.preparation.enviromentalAnalysis.environmentDiagnosis;
    }
    if (project.transfers?.formulation) {
      toUpdate.formulation = project.transfers.formulation;
    }
    if (project.transfers?.rol) {
      toUpdate.rol = project.transfers.rol;
    }
    if (project.transfers?.order) {
      toUpdate.order = project.transfers.order;
    }
    if (project.transfers?.tecniques !== undefined) {
      toUpdate.tecniques = project.transfers?.tecniques;
    }
    if (project.transfers?.ambiental !== undefined) {
      toUpdate.ambiental = project.transfers?.ambiental;
    }
    if (project.transfers?.sociocultural !== undefined) {
      toUpdate.sociocultural = project.transfers?.sociocultural;
    }
    if (project.transfers?.observations) {
      toUpdate.observations = project.transfers.observations;
    }

    toUpdate.dateModify = DateTime.local().toJSDate();
    const updatedVersion: string = this.updateProjectVersion(toUpdate.version);
    toUpdate.version = updatedVersion;
    toUpdate.useTransaction(trx);

    await toUpdate.save();
    return toUpdate.serialize() as IProject;
  }


  async getAllHistorical(data: IProjectFiltersHistorical): Promise<IProject[]> {
    const query = Projects.query();
    if(data.bpin) {
      query.where('bpin', data.bpin);
    }
    if(data.project) {
      query.where('project', data.project);
    }
    if(data.validity) {
      query.whereRaw("YEAR(PRY_FECHA_CREO) = ?", [data.validity])
    }
    query.orderBy('PRY_VERSION', 'desc')
    const res = await query;
    return res as unknown as IProject[];
  }

  async getAllHistoricalPaginated(filters: IHistoricalFiltersPaginated): Promise<IPagingData<IProject>> {
    if (!filters.bpin || isNaN(filters.bpin)) {
      throw new Error("Se debe proporcionar un código BPIN válido.");
    }
    const query = Projects.query()
      .where("bpin", filters.bpin)
      .orderBy('PRY_ESTADO_PROYECTO', 'asc')
      .orderBy('PRY_FECHA_CREO', 'desc');
    if (filters.project) {
      query.where("project", filters.project);
    }
    if (filters.status) {
      query.where("status", filters.status);
    }
    const res = await query.paginate(filters.page, filters.perPage);
    const { data, meta } = res.serialize();
    return {
      array: data as IProject[],
      meta,
    };
  }


  async getAllProjects(): Promise<IProject[]> {
    const res = await Projects.query()
      .where(
        "PRY_VERSION",
        "=",
        Projects.query()
          .max('PRY_VERSION')
          .from("PRY_PROYECTOS as p2")
          .whereRaw('p2.PRY_CODIGO_BPIN = PRY_PROYECTOS.PRY_CODIGO_BPIN')
          .groupBy("PRY_CODIGO_BPIN")
      )
      .distinct();
    return res as unknown as IProject[];
  }

  async getProjectPaginated(filters: IProjectFiltersPaginated): Promise<IPagingData<IProject>> {
    const query = Projects.query()
      .where(
        "PRY_VERSION",
        "=",
        Projects.query()
          .max('PRY_VERSION')
          .from("PRY_PROYECTOS as p2")
          .whereRaw('p2.PRY_CODIGO_BPIN = PRY_PROYECTOS.PRY_CODIGO_BPIN')
          .groupBy("PRY_CODIGO_BPIN")
      )
      .distinct()
      .orderBy('PRY_ESTADO_PROYECTO', 'asc')
      .orderBy('PRY_FECHA_CREO', 'desc');
    if (filters.bpin) {
      query.where("bpin", filters.bpin);
    }

    if (filters.project) {
      query.where("project", filters.project);
    }

    if (filters.status) {
      query.where("status", filters.status);
    }

    const res = await query.paginate(filters.page, filters.perPage);

    const { data, meta } = res.serialize();

    return {
      array: data as IProject[],
      meta,
    };
  }

  async getAllStatus(): Promise<MasterTable[]> {
    const res = await Status.query().orderBy('PRS_ORDEN', 'asc');
    return res.map((i) => i.serialize() as MasterTable);
  }

  private updateProjectVersion(version: string = "0.0"): string {
    const [major, minor] = version.split('.').map(Number);
    const newMinor = minor + 1;
    return newMinor + major < 11 ? `${major}.${0}${newMinor}` : `${major}.${newMinor}`;
  }

  async finishProject(
    data: IFinishProjectForm,
    id: number,
    trx: TransactionClientContract
  ): Promise<IProject | null> {
    const toUpdate = await Projects.find(id);
    if (!toUpdate) {
      return null;
    }
    toUpdate.projectObservation = data.observations;
    toUpdate.status = 4;
    toUpdate.useTransaction(trx);

    await toUpdate.save();
    return toUpdate.serialize() as IProject;
  }
}

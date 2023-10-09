import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ProjectProvider from "@ioc:core.ProjectProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IProjectPaginated, IProjectFiltersPaginated} from "App/Interfaces/ProjectInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import ProjectValidator from "App/Validators/ProjectValidator";

export default class ProjectController {

public async getProjectsPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.all();
      return response.send(
        await ProjectProvider.getProjectsPaginated(data as IProjectPaginated)
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
}

  public async getProjectsByFilters({ request, response }: HttpContextContract) {
      try {
        const data = await request.all();
        return response.send(
          await ProjectProvider.getProjectsByFilters(data)
        );
      } catch (err) {

        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
  }

  public async getProjectByUser({ request, response }: HttpContextContract) {
    try {
      const { user } = request.params();
      return response.send(await ProjectProvider.getProjectByUser(user));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async createProject({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const data = await request.validate(ProjectValidator);
        return response.send(
          await ProjectProvider.createProject(data, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async updateProject({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { id } = request.params();
        const data = await request.validate(ProjectValidator);
        return response.send(
          await ProjectProvider.updateProject(data, id, trx)
        );
      } catch (err) {
        await trx.rollback();
        return response.badRequest(
          new ApiResponse(null, EResponseCodes.FAIL, String(err))
        );
      }
    });
  }

  public async getAllProjects({ response }: HttpContextContract) {
    try {
      return response.send(await ProjectProvider.getAllProjects());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getProjectPaginated({ request, response }: HttpContextContract) {
    try {
      const data = request.body() as IProjectFiltersPaginated;
      return response.send(await ProjectProvider.getProjectPaginated(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getAllStatus({ response }: HttpContextContract) {
    try {
      return response.send(await ProjectProvider.getAllStatus());
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

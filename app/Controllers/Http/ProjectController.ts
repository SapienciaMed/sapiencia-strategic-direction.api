import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { IProjectPaginated, IProjectFiltersPaginated} from "App/Interfaces/ProjectInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import Database from "@ioc:Adonis/Lucid/Database";
import ProjectProvider from "@ioc:core.ProjectProvider";
import StorageProvider from "@ioc:core.StorageProvider";
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

  public async uploadProjectsDigitals({ request, response }: HttpContextContract) {
    const files = request.files('files');
    const { id } = request.params();
    if(files) {
      const results = await Promise.all(
        files.map(async (file) => {
          if(file.tmpPath) {
            const fileUrl = await StorageProvider.uploadFiles(file, `proyectos-digitales/${id}/`);
            return fileUrl;
          } else {
            return false;
          }
        })
      );
      const filesFailed: MultipartFileContract[] = [];
      results.forEach((result, index) => {
        if(!result) filesFailed.push(files[index]);
      });
      if(filesFailed.length > 0) {
        const filesFailedStr = filesFailed.map(item => item.clientName);
        return response.badRequest(
          new ApiResponse(true, EResponseCodes.WARN, `No se pudieron guardar los siguientes archivos: ${filesFailedStr.join(",")}`)
        );
      } else {
        return response.send(
          new ApiResponse(true, EResponseCodes.OK, "¡Archivos guardados exitosamente!")
        );
      }
    } else {
      return response.badRequest(
        new ApiResponse(false, EResponseCodes.FAIL, "Sin archivos para cargar.")
      );
    }
  }

  public async getProjectFiles({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      return response.send(await StorageProvider.getFiles(`proyectos-digitales/${id}/`));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getProjectFile({ request, response }: HttpContextContract) {
    try {
      const params = request.body();
      if(!params.fileName) throw(new Error("Falta una ruta"));
      response.header('Content-Type', 'application/octet-stream');
      response.header('Content-Disposition', `attachment; filename="${params.fileName}"`);
      return response.send(await StorageProvider.downloadFile(params.fileName));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async deleteProjectFile({ request, response }: HttpContextContract) {
    try {
      const params = request.body();
      if(!params.fileName) throw(new Error("Falta una ruta"));
      return response.send(await StorageProvider.deleteFile(params.fileName));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(false, EResponseCodes.FAIL, String(err))
      );
    }
  }

  public async getProjectById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await ProjectProvider.getProjectById(id));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}

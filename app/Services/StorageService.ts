import { Storage } from "@google-cloud/storage";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IFiles } from "App/Interfaces/StorageInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
//const keyFilename = process.env.GCLOUD_KEYFILE;
const bucketName = process.env.GCLOUD_BUCKET ?? "";

export interface IStorageService {
    uploadFiles(filePath: MultipartFileContract, path?: string): Promise<boolean>;
    getFiles(path?: string): Promise<ApiResponse<IFiles[]>>;
    downloadFile(fileName: string): Promise<Buffer>;
    deleteFile(fileName: string): Promise<ApiResponse<boolean>>;
}

export default class StorageService implements IStorageService {
    storage: Storage;
    constructor() {
        //this.storage = new Storage({ keyFilename });
        this.storage = new Storage();
    }

    async uploadFiles(file: MultipartFileContract, path?: string): Promise<boolean> {
        try {
            const bucket = this.storage.bucket(bucketName);
            if (!file.tmpPath) return false;
            const [fileCloud] = await bucket.upload(file.tmpPath, {
                destination: `${path}${file.clientName}`,
            });
            return !!fileCloud;
        } catch (error) {
            return false;
        }
    }

    async getFiles(path?: string): Promise<ApiResponse<IFiles[]>> {
        const [files] = await this.storage.bucket(bucketName).getFiles({prefix: path});
        const response = files.map(file => {
            const fileName = file.metadata.name?.split("/");
            return {
                name: fileName ? fileName[fileName.length - 1] : "",
                path: file.metadata.name ?? "",
                size: Number(file.metadata.size ?? 0),
                date: file.metadata.timeCreated ?? ""
            }
        });
        return new ApiResponse(response, EResponseCodes.OK);
    }

    async downloadFile(fileName: string): Promise<Buffer> {
        const [archivo] = await this.storage.bucket(bucketName).file(fileName).download();
        return archivo;
    }

    async deleteFile(fileName: string): Promise<ApiResponse<boolean>> {
        await this.storage.bucket(bucketName).file(fileName).delete();
        return new ApiResponse(true, EResponseCodes.OK);
    }
}
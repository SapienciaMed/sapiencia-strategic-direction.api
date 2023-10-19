import { Storage } from "@google-cloud/storage";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
//const keyFilename = process.env.GCLOUD_KEYFILE;
const bucketName = process.env.GCLOUD_BUCKET ?? "";

export interface IStorageService {
    uploadProjectsDigitals(filePath: MultipartFileContract, path?: string): Promise<boolean>;
    getProjectFiles(path?: string): Promise<any>;
}

export default class StorageService implements IStorageService {
    storage: Storage;
    constructor() {
        //this.storage = new Storage({ keyFilename });
        this.storage = new Storage();
    }

    async uploadProjectsDigitals(file: MultipartFileContract, path?: string): Promise<boolean> {
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

    async getProjectFiles(path?: string): Promise<any> {
        const [files] = await this.storage.bucket(bucketName).getFiles({prefix: path});
        return files;
    }
}
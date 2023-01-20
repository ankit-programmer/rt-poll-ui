import { BasePlugin } from "@uppy/core";
import Uppy from "@uppy/core";
import { uuid } from 'uuidv4';

const u = new Uppy();
export default class FirebaseStorage extends BasePlugin {
    private storageRef: any;
    constructor(uppy: typeof u, opts: any) {
        super(uppy, opts);
        if (!opts?.storageRef) {
            throw new Error("Please provide the root storageRef to be used as option `storageRef`. See https://firebase.google.com/docs/storage/web/upload-files");
        }
        this.type = "uploader";
        this.id = "FirebaseCloudStorage";
        this.storageRef = opts?.storageRef;
        this.uploadFile = this.uploadFile.bind(this);
    }
    uploadFile(fileIds: string[]) {
        return Promise.all(
            fileIds.map(id => {
                return new Promise((resolve, reject) => {
                    const file = this.uppy.getFile(id);
                    const refId = uuid();
                    const fileRef = this.storageRef.child(refId);
                    const metaData = {
                        contentType: file?.type
                    }
                    this.uppy.emit('upload-started', file);
                    const uploadTask = fileRef.put(file.data, metaData);
                    uploadTask.on('state_changed',
                        (snapshot: any) => {
                            const progressInfo = {
                                uploader: this,
                                bytesUploaded: snapshot.bytesTransferred,
                                bytesTotal: snapshot.totalBytes
                            }
                            this.uppy.emit('upload-progress', file, progressInfo);
                        }
                        ,
                        (error: any) => {
                            this.uppy.emit('upload-error', file, error);
                            reject(error);
                        },
                        () => {
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl: any) => {
                                const file: any = this.uppy.getFile(id);
                                file.downloadUrl = downloadUrl;
                                console.log("Download URL", downloadUrl);
                                this.uppy.emit('upload-success', file, uploadTask.snapshot, downloadUrl);
                                resolve(downloadUrl);
                            })
                        })
                })
            })
        );
    }
    install(): void {
        this.uppy.addUploader(this.uploadFile as any);
    }
    uninstall(): void {
        this.uppy.removeUploader(this.uploadFile as any);
    }
}
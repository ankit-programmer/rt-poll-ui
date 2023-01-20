import React, { useEffect } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import ImageEditor from '@uppy/image-editor'
import styles from './ImageUpload.module.css';
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.css'
import { Button, IconButton, useMediaQuery } from '@mui/material';
import { storage } from '../../app/firebaseApp'
import UppyFirebasePlugin from '../../utility/UppyFirebasePlugin';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const uppy = new Uppy({
    restrictions: {
        maxFileSize: 5000000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png']
    }
});

uppy.use(ImageEditor, {
    quality: 0.8,
    cropperOptions: {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        autoCrop: true,
        aspectRatio: 1,
        responsive: true,
        croppedCanvasOptions: {
        },
    },
    actions: {
        revert: false,
        rotate: true,
        granularRotate: true,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: false,
        cropWidescreenVertical: false,
    },

});

uppy.use(UppyFirebasePlugin, {
    storageRef: storage.ref()
} as any);

export default function ImageUpload({ onClose }: any) {

    const isMobile = useMediaQuery('(max-width:480px)');
    return (<div className={styles.ImageUploadPopup}>
        <div style={{
            position: 'relative'
        }}>
            <Dashboard proudlyDisplayPoweredByUppy={false} showRemoveButtonAfterComplete autoOpenFileEditor doneButtonHandler={() => {
                onClose(uppy.getFiles() || []);
                uppy.removeFile(uppy.getFiles()[0]?.id);
            }} width={isMobile ? '100vw' : ""} uppy={uppy} plugins={['ImageEditor']} />
            <IconButton onClick={() => {
                onClose(uppy.getFiles() || []);
                uppy.removeFile(uppy.getFiles()[0]?.id);
            }} style={{
                position: 'absolute',
                right: '0',
                top: '0'
            }}>
                <CloseOutlinedIcon />
            </IconButton>

        </div>

    </div>)
}
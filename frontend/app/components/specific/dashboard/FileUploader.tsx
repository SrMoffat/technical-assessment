"use client"
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, GetProp } from 'antd';
import { Flex, message, Typography, Upload } from 'antd';

const ALLOWED_UPLOAD_MIME_TYPES = ['text/csv']

const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
    const type = file?.type
    const size = file?.size
    const passesType = ALLOWED_UPLOAD_MIME_TYPES?.includes(type)
    const passesSize = size / 1024 / 1024 < 2

    if (!passesType) {
        // To Do: Use ALLOWED_UPLOAD_MIME_TYPES for message
        message.error('You can only upload CSV files!');
    } else if (!passesSize) {
        message.error('File must smaller than 2MB!');
    }

    return passesType && passesSize
};

export default function FileUploader({ title, ctaText, ctaDescription, onChange, disable }: any) {
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        // action: '/api/upload',
        beforeUpload,
        onChange,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Flex className="w-full flex-col gap-2 mb-6">
            <Typography.Text>{title}</Typography.Text>
            <Dragger {...props} className="w-full" multiple={false} disabled={disable}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text"> {ctaText}</p>
                <p className="ant-upload-hint">
                    {ctaDescription}
                </p>
            </Dragger>
        </Flex>
    )
}
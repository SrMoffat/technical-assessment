"use client"
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Flex, message, Typography, Upload } from 'antd';

const { Dragger } = Upload;

export default function FileUploader({ title, ctaText, ctaDescription }: any) {
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Flex className="w-full flex-col gap-2">
            <Typography.Text>{title}</Typography.Text>
            <Dragger {...props} className="w-full">
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
"use client"
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Flex, message, Typography, Upload } from 'antd';

const { Dragger } = Upload;

export default function FileUploader({ title, ctaText, ctaDescription, onChange }: any) {
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        // action: '/api/upload',
        onChange,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Flex className="w-full flex-col gap-2 mb-6">
            <Typography.Text>{title}</Typography.Text>
            <Dragger {...props} className="w-full" multiple={false} >
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
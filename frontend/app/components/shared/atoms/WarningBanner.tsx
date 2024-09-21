
import React from 'react';
import { Button, Result } from 'antd';

export default function WarningBanner(props: any) {
    const {
        status,
        title,
        subTitle,
        extra
    } = props

    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={extra ? [
                <Button type="primary" key="console">
                    Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
            ] : []}
        />

    )
}

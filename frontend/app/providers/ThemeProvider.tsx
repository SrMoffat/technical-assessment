'use client'
import React, { PropsWithChildren } from 'react';
import { ConfigProvider, theme } from 'antd';

export const PRIMARY_HEX = '#4F54F8';

export default function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: PRIMARY_HEX,
            }
        }}>
            {children}
        </ConfigProvider>
    )
};

"use client"
import { CustomTransfer } from '@/app/components/shared/atoms';
import { FileUploader, NavigationTabs } from '@/app/components/specific/dashboard';
import { ProfileForm } from '@/app/components/specific/profile';
import { PAGES, useNavigationContext } from '@/app/providers/NavigationProvider';
import { Avatar, Button, Flex, Layout, Typography } from 'antd';

const { Content } = Layout;

function ProfileDetails() {
    return (
        <Flex className="flex-col gap-2">
            <Flex className="flex-col">
                <Typography.Text>Profile Avatar</Typography.Text>
                <Flex className="items-center gap-4">
                    <Avatar style={{ width: 60, height: 60 }}>
                        A
                    </Avatar>
                    <Button>Change Avatar</Button>
                </Flex>
            </Flex>
            <Flex className="w-full">
                <ProfileForm />
            </Flex>
        </Flex>
    )
}

function Dashboard() {
    return (
        <Flex className="flex-col">
            <NavigationTabs />
            <Flex className="justify-between mt-6 gap-6">
                <FileUploader title="Source Records" ctaText="Click or drag file to this area to upload" ctaDescription="Upload your source records file." />
                <FileUploader title="Target Records" ctaText="Click or drag file to this area to upload" ctaDescription="Upload your target records file." />
            </Flex>
            <Flex className="mt-6">
                <CustomTransfer
                    showSearch
                    showSelectAll={false}
                />
            </Flex>
        </Flex>
    )
}

export default function ReconcilePage() {
    const { current } = useNavigationContext()

    const isDashboard = current === PAGES.DASHBOARD
    const isProfile = current === PAGES.PROFILE

    return (
        <Content>
            {isDashboard && (
                <Dashboard />
            )}
            {isProfile && (
                <ProfileDetails />
            )}
        </Content>
    )
}

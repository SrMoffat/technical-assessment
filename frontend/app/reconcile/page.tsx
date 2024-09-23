"use client"
import Dashboard from '@/app/components/specific/dashboard/Dashboard';
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

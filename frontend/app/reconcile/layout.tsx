"use client"
import { NavBar, SideBar } from '@/app/components/shared/atoms';
import Breadcrumbs from '@/app/components/shared/atoms/Breadcrumbs';
import { useNavigationContext } from '@/app/providers/NavigationProvider';
import { Layout } from 'antd';

export default function ReconcilePageLayout(props: any) {
    const { children } = props

    const { current, breadcrumbs, setCurrent } = useNavigationContext()
    return (
        <Layout>
            <NavBar />
            <Layout className="h-screen mx-6 my-4">
                <SideBar current={current} setCurrent={setCurrent} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumbs items={breadcrumbs} />
                    {children}
                </Layout>
            </Layout>
        </Layout>

    )
}
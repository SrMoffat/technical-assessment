import { Breadcrumb } from 'antd';

export default function Breadcrumbs(props: any) {
    const { items } = props
    return (
        <Breadcrumb style={{ margin: '16px 0' }} items={items.map((entry: any, index: number) => ({
            key: entry,
            href: '/reconcile',
            title: entry,
        }))} />
    )
}
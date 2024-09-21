import { Breadcrumb } from 'antd';

export default function Breadcrumbs(props: any){
    const {items} = props

    const steps = ["Home", ...items]
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            {steps.map((entry) => (
                <Breadcrumb.Item key={entry}>{entry}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}
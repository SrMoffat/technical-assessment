import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio } from "antd";

export default function ProfileForm() {
    const onRequiredTypeChange = () => {
    };
    return (
        <Form
            layout="vertical"
            style={{ width: '50%' }}
            onValuesChange={onRequiredTypeChange}
        >
            <Form.Item label="First Name">
                <Input size="large" placeholder="First Name from State/DB" />
            </Form.Item>
            <Form.Item label="Last Name">
                <Input size="large" placeholder="Last Name from State/DB" />
            </Form.Item>
            <Form.Item label="Email">
                <Input size="large" placeholder="Email from State/DB" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Save Changes</Button>
            </Form.Item>
        </Form>
    )
}

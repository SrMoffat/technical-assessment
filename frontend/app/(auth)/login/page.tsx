"use client"
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    Typography
} from 'antd';
import { CustomLink } from '../../components/shared/atoms';


function LoginForm() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Handler user registration: ', values);
    };

    const loginFormFields = [
        {
            required: true,
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email.',
            errorMessage: 'Email is required!',
            icon: <MailOutlined />
        },
        {
            required: true,
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password.',
            errorMessage: 'Password is required!',
            icon: <LockOutlined />
        }
    ]



    return (
        <Form
            name="login"
            style={{
                marginTop: 50,
                width: '100%',
                justifySelf: 'center',
                alignSelf: 'center'
            }}
            onFinish={onFinish}
        >
            {loginFormFields.map((entry) => (
                <Form.Item
                    hasFeedback
                    name={entry?.name}
                    rules={[{ required: entry?.required, message: entry?.errorMessage }]}
                >
                    <Input size="large" type={entry?.type} prefix={entry?.icon} placeholder={entry?.placeholder} />
                </Form.Item>
            ))}
            <Form.Item>
                <Flex justify="space-between" align="center">
                    <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                        <Checkbox>Remember me?.</Checkbox>
                    </Form.Item>
                    <CustomLink href="/register">Don't have an account? Register.</CustomLink>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>

    )
}

function LoginPageContent() {
    return (
        <Flex className="h-[calc(100vh-24rem)] my-16 justify-center">
            <Card className="w-1/3">
                <Typography.Title level={4} className="text-center mb-12">Login</Typography.Title>
                <LoginForm />
            </Card>
        </Flex>
    )
}

export default function LoginPage() {
    return (
        <LoginPageContent />
    )
}


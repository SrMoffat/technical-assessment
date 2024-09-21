"use client"
import { CustomLink } from '@/app/components/shared/atoms';
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Flex,
    Form,
    Input
} from 'antd';

export default function LoginForm() {
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
            variant='filled'
            onFinish={onFinish}
        >
            {loginFormFields.map((entry) => (
                <Form.Item
                    key={entry?.name}
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

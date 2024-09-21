"use client"

import { CustomLink } from '@/app/components/shared/atoms';
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Flex,
    Form,
    Input
} from 'antd';

export default
    function RegisterForm() {
    const onFinish = (values: any) => {
        console.log('Handler user registration: ', values);
    };

    const regsiterFormFields = [
        {
            required: true,
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name.',
            errorMessage: 'First name is required!',
            icon: <UserOutlined />
        },
        {
            required: true,
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name.',
            errorMessage: 'Last name is required!',
            icon: <UserOutlined />
        },
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
            name="register"
            style={{
                marginTop: 50,
                width: '100%',
                justifySelf: 'center',
                alignSelf: 'center'
            }}
            onFinish={onFinish}
        >
            {regsiterFormFields.map((entry) => (
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
                    <Form.Item name="terms" valuePropName="checked" noStyle>
                        <Checkbox>Accept terms and conditions.</Checkbox>
                    </Form.Item>
                    <CustomLink href="/login">Have an account? Login.</CustomLink>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>

    )
}
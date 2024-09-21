"use client"
import { RegisterForm } from '@/app/components/specific/auth';
import {
    Card,
    Flex,
    Typography
} from 'antd';

const { Title } = Typography


function RegisterPageContent() {
    return (
        <Flex className=" my-16 justify-center">
            <Card>
                <Title level={4} className="text-center mb-12">Create Account</Title>
                <RegisterForm />
            </Card>
        </Flex>
    )
}

export default function RegisterPage() {
    return (
        <RegisterPageContent />
    )
}

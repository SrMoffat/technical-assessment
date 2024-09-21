"use client"
import { LoginForm } from '@/app/components/specific/auth';
import {
    Card,
    Flex,
    Typography
} from 'antd';

const {Title} = Typography

function LoginPageContent() {
    return (
        <Flex className="mt-16 mb-48 justify-center">
            <Card>
                <Title level={4} className="text-center mb-12">Login</Title>
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


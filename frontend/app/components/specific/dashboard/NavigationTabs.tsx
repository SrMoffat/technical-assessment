"use client"
import { Flex, Segmented } from 'antd';

export default function NavigationTabs(){
    return (
        <Flex className="w-full justify-center">
            <Segmented<string>
                defaultValue="New Reconcilliation"
                options={['New Reconcilliation', 'Past Reconcilliations']}
                onChange={(value) => {
                    console.log(value); // string
                }}
            />
        </Flex>
    )
}
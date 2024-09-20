import { CustomLink } from "@/app/components/shared/atoms";
import { Button, Flex } from 'antd';

export default function LandingPageHeroAction() {
    return (
        <Flex className="justify-center mt-12">
            <CustomLink href="/reconcile">
                <Button size="large" className="ml-4" type="primary">Start Reconciliation</Button>
            </CustomLink>
        </Flex>

    )
}

import {
    Page,
    BlockStack,
    reactExtension,
    TextBlock,
    Banner,
    useApi,
} from '@shopify/ui-extensions-react/customer-account';

export default reactExtension('customer-account.page.render', () => <PromotionBanner />);

function PromotionBanner() {
    const { i18n } = useApi();

    return (
        <Page>
            <Banner>
                <BlockStack inlineAlignment="center">
                    <TextBlock>{i18n.translate('earnPoints')} full page test aa</TextBlock>
                </BlockStack>
            </Banner>
        </Page>
    );
}

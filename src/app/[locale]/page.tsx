import React from 'react';
import { Heading, Flex, Text, Button, IconButton, Icon, Avatar, RevealFx } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { baseURL, routes, renderContent } from '@/app/resources';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
    {params: {locale}}: { params: { locale: string }}
) {
    const t = await getTranslations();
    const { home } = renderContent(t);
    const title = home.title;
    const description = home.description;
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://${baseURL}/${locale}`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default function Home(
    { params: {locale}}: { params: { locale: string }}
) {
    unstable_setRequestLocale(locale);
    const t = useTranslations();
    const { home, about, person, newsletter } = renderContent(t);
    return (
        <Flex
            maxWidth="m" fillWidth gap="xl"
            direction="column" alignItems="center">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: home.title,
                        description: home.description,
                        url: `https://${baseURL}`,
                        image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
                        publisher: {
                            '@type': 'Person',
                            name: person.name,
                            image: {
                                '@type': 'ImageObject',
                                url: `${baseURL}${person.avatar}`,
                            },
                        },
                    }),
                }}
            />
            <Flex
                fillWidth
                direction="column"
                paddingY="l" gap="m">
                    <Flex
                        direction="column"
                        fillWidth maxWidth="s" gap="m">
                        <RevealFx translateY="4">
                            <Flex gap="m" alignItems="center">
                                <Avatar
                                    src={person.avatar}
                                    size="xl"/>
                                <Heading
                                    wrap="balance"
                                    variant="display-strong-l">
                                    {home.headline}
                                </Heading>
                            </Flex>
                        </RevealFx>
                        <RevealFx translateY="8" delay={0.2}>
                            <Text
                                wrap="balance"
                                onBackground="neutral-weak"
                                variant="body-default-l">
                                {home.subline}
                            </Text>
                        </RevealFx>
                        <RevealFx translateY="12" delay={0.4}>
                            {about.calendar.display && (
                                <Flex
                                    style={{
                                        backdropFilter: 'blur(var(--static-space-1))',
                                        border: '1px solid var(--brand-alpha-medium)',
                                        width: 'fit-content'
                                    }}
                                    alpha="brand-weak" radius="full"
                                    fillWidth padding="4" gap="8"
                                    alignItems="center">
                                    <Flex paddingLeft="12">
                                        <Icon
                                            name="calendar"
                                            onBackground="brand-weak"/>
                                    </Flex>
                                    <Flex
                                        paddingX="8">
                                        Schedule a call
                                    </Flex>
                                    <IconButton
                                        href={about.calendar.link}
                                        data-border="rounded"
                                        variant="tertiary"
                                        icon="chevronRight"/>
                                </Flex>
                            )}
                        </RevealFx>
                    </Flex>
            </Flex>
            <RevealFx translateY="16" delay={0.6}>
                <Projects range={[1,1]} locale={locale}/>
            </RevealFx>
            {routes['/blog'] && (
                <Flex fillWidth paddingX="20">
                    <Posts range={[1,2]} columns="2" locale={locale}/>
                </Flex>
            )}
            <Projects range={[2]} locale={locale}/>
            { newsletter.display &&
                <Mailchimp newsletter={newsletter} />
            }
        </Flex>
    );
}
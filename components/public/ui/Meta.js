import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <meta name='description' content={description} />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Best E-Commerce',
    keywords: 'best e-commerce, shop online',
    description: 'The best e-commerce, here you can find any type of product that you can imagine and at a really good price, so dont think twice and enter!'
}

export default Meta;

import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';


export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Best E-commerce</title>
                <link href="/static/css/app.css" rel="stylesheet" />
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}
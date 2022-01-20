import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';


export default function Layout({ children }) {

    return (
        <>
            <Head>
                <title>Best E-commerce</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}
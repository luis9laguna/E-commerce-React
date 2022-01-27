import Header from './Header';
import Footer from './Footer';
import Meta from '../ui/Meta';


export default function Layout({ children }) {

    return (
        <>
            <Meta />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}
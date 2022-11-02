import Header from './Header';
import Footer from './Footer';
import Meta from '../ui/Meta';
import { useAuth } from 'context/auth/authContext';
import { SyncLoader } from 'react-spinners';
import { FaWhatsapp } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

const Layout = ({ children, categories }) => {
    //CONTEXT
    const { isLoading } = useAuth()

    const style = {
        width: '100%',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    if (isLoading) return (
        <div style={style}>
            <SyncLoader color={'#303030'} loading={isLoading} size={50} />
        </div>
    )

    return (
        <>
            <Meta />
            <Header categories={categories} />
            <ToastContainer />
            <main>
                {children}
            </main>
            <a href="https://www.whatsapp.com" className='whatsapp'>
                <FaWhatsapp style={{ margin: 'auto', fontSize: '1.5rem' }} />
            </a>
            <Footer />
        </>

    )
}

export default Layout
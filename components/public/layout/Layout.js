import Header from './Header';
import Footer from './Footer';
import Meta from '../ui/Meta';
import { useAuth } from 'context/auth/authContext';
import { SyncLoader } from 'react-spinners';
import { WhatsApp } from '@material-ui/icons';

const Layout = ({ children }) => {

    //CONTEXT
    const { isLoading } = useAuth()

    const style = {
        width: '100&',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    if (isLoading) return (
        <div style={style}>
            <SyncLoader color={'#303030'} loading={isLoading} size={100} />
        </div>
    )

    return (
        <>
            <Meta />
            <Header />
            <main>
                {children}
            </main>
            <a href="https://www.whatsapp.com" className='whatsapp'>
                <WhatsApp style={{ margin: 'auto' }} />
            </a>
            <Footer />
        </>

    )
}

export default Layout
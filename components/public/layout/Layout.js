import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Meta from '../ui/Meta';
import { useAuth } from 'context/auth/authContext';
import { useCart } from 'context/cart/cartContext';

const Layout = ({ children }) => {

    //CONTEXT
    const { userAuth } = useAuth()
    const { getCartLocal } = useCart()

    //GET USER IF THERE IS A VALID TOKEN
    useEffect(() => {
        userAuth()
        const items = localStorage.getItem('cart')
        if (items) {
            getCartLocal()
        }
    }, []);

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

export default Layout
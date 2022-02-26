import AuthState from 'context/auth/authState'
import CartState from 'context/cart/cartState'
import '@/styles/globals.css'


const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <CartState>
        <Component {...pageProps} />
      </CartState>
    </AuthState>
  )
}

export default MyApp

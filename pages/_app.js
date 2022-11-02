import AuthState from 'context/auth/authState'
import CartState from 'context/cart/cartState'
import CategoryState from 'context/category/categoryState'
import '@/styles/globals.css'


const MyApp = ({ Component, pageProps }) => {
  return (
    <CategoryState>
      <AuthState>
        <CartState>
          <Component {...pageProps} />
        </CartState>
      </AuthState>
    </CategoryState>
  )
}

export default MyApp

import { Add, Remove, DeleteOutline } from "@material-ui/icons";
import styles from '@/styles/pages/Cart.module.scss';
import { useCart } from "context/cart/cartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/public/layout/Layout";
import Meta from "@/components/public/ui/Meta";
import { totalCart, formatCurrency, formatImages } from "utils/utils";

const Cart = () => {

  const { totalQuantityCart, items, addItem, removeItem, subtractItem } = useCart()

  const router = useRouter()

  const addQuantity = id => {
    addItem({
      id,
      quantity: 1,
      cart: true
    })
  }

  const subtractQuantity = id => subtractItem(id)

  const deleteItem = id => removeItem(id)




  return (
    <Layout>
      <Meta title='Carrito' />
      <div className={styles.container}>
        <h1>TU BOLSA</h1>
        {items.length !== 0 ?
          <div className={styles.order}>
            <div className={styles.info}>
              <span>Carro (<b>{totalQuantityCart} Productos</b>)</span>
              {items.map((product, i) => (
                <div key={i} className={styles.product}>
                  <div className={styles.productDetail}>
                    <img src={formatImages(product.image)} />
                    <h2>{product.name}</h2>
                  </div>
                  <span className={styles.productPrice}>{formatCurrency(product.price)}</span>
                  <div className={styles.lastContainer}>
                    <button onClick={() => addQuantity(product.id)}><Add /></button>
                    <span>{product.quantity}</span>
                    <button onClick={() => subtractQuantity(product.id)}> <Remove /></button>
                    <span className={styles.delete} onClick={() => deleteItem(product.id)}>Eliminar producto</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.summary}>
              <h2>RESUMEN ORDEN</h2>
              <hr />
              <div>
                <span>Subtotal</span>
                <b>{totalCart(items)}</b>
              </div>
              <div>
                <span>Envio estimado</span>
                <b>{formatCurrency(3500)}</b>
              </div>
              <div>
                <span>Total</span>
                <b>{totalCart(items, true)}</b>
              </div>
              <button className={styles.button} onClick={() => router.push('/checkout')}>Continuar</button>
            </div>
          </div>
          :
          <h2 className={styles.nothing}>¡No tienes productos en tu carro aun, ve y mira algunos <Link href="/product/all" passHref><span>productos!</span></Link></h2>
        }
      </div>
    </Layout>
  )
}

export default Cart

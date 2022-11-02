import styles from '@/styles/layout/Footer.module.scss';
import Link from "next/link";
import { MdEmail } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaMap, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import StatusOrderForm from '../StatusOrderForm';
import DetailOrder from '../ui/orders/DetailOrder';

const Footer = () => {


    const [showStatus, setShowStatus] = useState(false)
    const [detailOrder, setDetailOrder] = useState(null)


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h1>SHOOP.</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div>
                    <a href="https://www.facebook.com">
                        <FaFacebook style={{ background: '#3b5999' }} />
                    </a>
                    <a href="https://www.twitter.com">
                        <FaTwitter style={{ background: '#55acee' }} />
                    </a>
                    <a href="https://www.whatsapp.com">
                        <FaWhatsapp style={{ background: '#4fce5d' }} />
                    </a>
                    <a href="https://www.instagram.com">
                        <FaInstagram style={{ background: '#e4405f' }} />
                    </a>
                </div>
            </div>
            <div className={styles.center}>
                <h2>Paginas utiles</h2>
                <ul>
                    <li><Link href='/'>Inicio</Link></li>
                    <li><Link href='/product/all'>Productos</Link></li>
                    <li><Link href='/wishList'> Lista de Deseados</Link></li>
                    <li><Link href='/cart'>Carro</Link></li>
                    <li><Link href='/login#register'>Registrar</Link></li>
                    <li><Link href='/login#login'>Ingresar</Link></li>
                    <li><button onClick={() => setShowStatus(true)}>Estado de Paquete</button></li>
                </ul>
            </div>
            <div className={styles.right}>
                <h2>Contacto</h2>
                <span>
                    <FaMap style={{ marginRight: '10px' }} /> 678, pathser, south bosttom 54615
                </span>
                <span>
                    <FaPhone style={{ marginRight: '10px' }} />  +1 234 56 78
                </span>
                <span>
                    <MdEmail style={{ marginRight: '10px' }} /> contact@shoop.info
                </span>
                <img className={styles.payment} src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </div>
            {showStatus && <StatusOrderForm onClose={() => setShowStatus(false)} setDetailOrder={setDetailOrder} />}
            {detailOrder && <DetailOrder onClose={() => setShowStatus(false)} detailOrder={detailOrder} />}

        </div>
    )
}

export default Footer
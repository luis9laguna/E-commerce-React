import { ArrowDropDown } from '@material-ui/icons';
import styles from '@/styles/layout/DownNav.module.css';
import Link from "next/link";
import SignLog from '@/components/public/ui/SignLog';

const DownNav = ({ statusOpen, showContactForm, showAboutUs }) => {

    return (
        <div className={`${styles.containerNavDown} ${statusOpen ? styles.show : ''}`} >
            <div className={styles.home}><Link href='/'>Home</Link></div >
            <div className={styles.category}>
                <div className={styles.cateArrow}> Categories<ArrowDropDown /></div>
                <div className={styles.dropDown}>
                    <ul>
                        <li><a href="#">Link 1 <div className={styles.arrow}></div></a></li>
                        <li><a href="#">Link 2</a></li>
                        <li><a href="#">Link 3</a></li>
                        <li><a href="#">Link 4</a></li>
                    </ul>
                </div>
            </div>
            <div><Link href='/allProducts'>All Products</Link></div>
            <div><a href='#' onClick={showAboutUs}>About us</a></div>
            <div><a href='#' onClick={showContactForm}>Contact us</a></div>
            {/* <SignLog /> */}
        </div >
    )
}

export default DownNav


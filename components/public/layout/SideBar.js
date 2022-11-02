import { useState } from 'react';
import Link from 'next/link';
import { MdHome, MdInfo, MdSearch, MdViewCarousel, MdViewModule } from 'react-icons/md';

import Modal from "@/components/public/ui/Modal"
import styles from '@/styles/layout/SideBar.module.scss';
import { useRouter } from 'next/router';

const SideBar = ({ sideOpen, setSideOpen, categories }) => {

    //STATES TO SHOW
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);

    //CONTEXT
    const router = useRouter();

    // HANDLE SEARCH FORM
    const searchForm = (e) => {
        e.preventDefault();
        const value = e.target.search.value;
        if (value.length < 3) return
        router.push({
            pathname: '/search',
            query: { q: value }
        })
    }

    return (
        <div className={`${styles.container} ${sideOpen ? styles.sideOpen : ''}`}>
            <div className={`${styles.sideBar} ${sideOpen ? styles.sideOpen : ''}`} >
                <form className={styles.searchContainer} onSubmit={searchForm}>
                    <input name="search" placeholder="Buscar" />
                    <button type='submit'><MdSearch /></button>
                </form>
                <div className={styles.home}><MdHome /><Link href='/'> Inicio</Link></div >
                <div className={`${styles.category} ${openCategories ? styles.open : ''}`} onClick={() => setOpenCategories(prev => !prev)}>
                    <a href='#'><MdViewModule />  Categorias</a>
                    <ul>

                    </ul>
                </div>
                <div><MdViewCarousel /><Link href='/product/all'>Productos</Link></div>
                <div><MdInfo /><a href='#' onClick={() => setShowAboutUs(prev => !prev)}>Acerca</a></div>
            </div >
            {
                showAboutUs &&
                <Modal onClose={() => setShowAboutUs(prev => !prev)}>
                    <div className={styles.aboutSide}>
                        <h1>OUR MISSION</h1>
                        <p >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna alinonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolonostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure doloqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </div>
                </Modal>
            }
            <div className={sideOpen ? styles.sideBG : ''} onClick={() => setSideOpen(prev => !prev)} />
        </div>
    )
}

export default SideBar
import { useAuth } from 'context/auth/authContext'
import styles from './HeaderAdmin.module.css'
import { ExitToAppSharp, Menu } from '@material-ui/icons'

const HeaderAdmin = ({ setOpenNav, openNav }) => {

    const { userName, logOut } = useAuth()

    return (
        <div className={styles.HeaderAdmin}>
            <div className={styles.menu} onClick={() => setOpenNav(!openNav)}><Menu /></div>
            <div>
                <span>Hola, {userName}</span>
                <button onClick={logOut}>
                    <ExitToAppSharp />
                </button>
            </div>
        </div>
    )
}

export default HeaderAdmin
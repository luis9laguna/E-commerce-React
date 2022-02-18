import { useAuth } from 'context/auth/authContext'
import { useBeforeunload } from 'react-beforeunload';
import styles from './HeaderAdmin.module.css'
import { ExitToAppSharp, Menu } from '@material-ui/icons'

const HeaderAdmin = ({ setOpenNav, openNav }) => {

    const { userName, logOut } = useAuth()

    useBeforeunload(() => {
        logOut()
    });

    return (
        <div className={styles.HeaderAdmin}>
            <div className={styles.menu} onClick={() => setOpenNav(!openNav)}><Menu /></div>
            <div>
                <span>Hi, {userName}</span>
                <button onClick={logOut}>
                    <ExitToAppSharp />
                </button>
            </div>
        </div>
    )
}

export default HeaderAdmin
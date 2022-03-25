import { useState } from 'react'
import useFetch from 'use-http'
import styles from './ContainerUsers.module.css'
import { ArrowBack, PersonOutlined, VerifiedUserOutlined } from '@material-ui/icons';
import TableUsers from './TableUsers';
import FormAdmin from './FormAdmin';
import Pagination from '@/components/public/ui/Pagination';
import Loading from '@/components/public/ui/Loading';
import ErrorMessage from '@/components/public/ui/ErrorMessage';

const ContainerUsers = () => {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    //USERS
    const [users, setUsers] = useState([]);
    const [userUpdate, setAdminUpdate] = useState(null);

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, response, loading, error } = useFetch(`${process.env.url}`, options)

    //ADMIN OR USER OR FORM
    const [inAdmin, setInAdmin] = useState(false);
    const [inUser, setInUser] = useState(false);
    const [inForm, setInForm] = useState(false);

    const getUsers = async (page) => {
        const allUsers = await get(`/user/all?page=${page}`)
        if (response.ok) {
            setUsers(allUsers.allUsers)
            setPage(allUsers.page)
            setPages(allUsers.pages)
            setInUser(true)
            setInAdmin(false)
        }
    }

    const getAdmins = async (page) => {
        const allAdmins = await get(`/admin?page=${page}`)
        if (response.ok) {
            setUsers(allAdmins.allUsers)
            setPage(allAdmins.page)
            setPages(allAdmins.pages)
            setInAdmin(true)
            setInUser(false)
        }
    }

    const goBack = () => {
        setInAdmin(false)
        setInUser(false)
        setInForm(false)
    }

    const createBack = () => {
        setAdminUpdate(null)
        setInForm(!inForm)
    }

    const handlePageClick = e => {
        const selectedPage = e.selected
        setPage(selectedPage + 1)

        if (inAdmin) getAdmins(selectedPage + 1)
        else if (inUser) getUsers(selectedPage + 1)
    }


    return (
        <div className={styles.container}>
            <h1>{inAdmin && 'Admins'}</h1>
            <h1>{inUser && 'Users'}</h1>
            {inAdmin || inUser ?
                <>
                    <div className={styles.containerButtonBC}>
                        {!inForm && <button onClick={goBack}><ArrowBack /> Back</button>}
                        {inAdmin &&
                            <button onClick={createBack}>
                                {inForm ? 'Back' : 'Create'}
                            </button>
                        }
                    </div>
                    {inForm ?
                        <FormAdmin getAdmins={getAdmins} userUpdate={userUpdate} setInForm={() => setInForm(!inForm)} />
                        :
                        <>
                            {loading && !error ? <Loading space={true} />
                                :
                                <TableUsers
                                    getAdmins={getAdmins}
                                    setAdminUpdate={setAdminUpdate}
                                    setInForm={() => setInForm(!inForm)}
                                    inAdmin={inAdmin}
                                    users={users} />
                            }
                            {users?.length === 0 || users === undefined ? <h2 style={{ textAlign: 'center' }}>Sorry but we couldn't find what you were looking for.</h2> : ''}
                            {error && <ErrorMessage />}
                            <Pagination pages={pages} page={page} handlePageClick={handlePageClick} />
                        </>
                    }
                </>
                :
                <div className={styles.containerButtonAU}>
                    {inForm}
                    <button onClick={() => getAdmins(1)}> <VerifiedUserOutlined /> Admins</button>
                    <button onClick={() => getUsers(1)}> <PersonOutlined /> Users</button>
                </div>
            }
        </div >
    )
}

export default ContainerUsers
import { useState } from 'react'
import Swal from 'sweetalert2';
import styles from './ContainerUsers.module.css'
import { ArrowBack, PersonOutlined, VerifiedUserOutlined } from '@material-ui/icons';
import { getAllAdmins, getAllUsers, deleteUserDB, deleteAdminDB, updateAdmin } from 'helpers/api-util';
import TableUsers from './TableUsers';
import FormAdmin from './FormAdmin';

const ContainerUsers = () => {

    //PAGINATION
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    //USERS
    const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState(null);

    //ADMIN OR USER OR FORM
    const [inAdmin, setInAdmin] = useState(false);
    const [inUser, setInUser] = useState(false);
    const [inForm, setInForm] = useState(false);

    const getUsers = (page) => {
        getAllUsers(page).then(resp => {
            if (resp.ok) {
                setUsers(resp.allUsers)
                setPage(resp.page)
                setPages(resp.pages)
                setInUser(true)
                setInAdmin(false)
            }
        })
    }

    const getAdmins = (page) => {
        getAllAdmins(page).then(resp => {
            if (resp.ok) {
                setUsers(resp.allUsers)
                setPage(resp.page)
                setPages(resp.pages)
                setInAdmin(true)
                setInUser(false)
            }
        })
    }

    const goBack = () => {
        setInAdmin(false)
        setInUser(false)
        setInForm(false)
    }

    const createBack = () => {
        setUserUpdate(null)
        setInForm(!inForm)
    }

    const deleteUser = (id, isUser) => {
        //MODAL CONFIRMATION
        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this Address!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then(async (result) => {
            if (result.isConfirmed) {

                let resp

                //DELETING USER OR ADMIN
                if (isUser) {
                    resp = await deleteUserDB(id)
                    //FETCH NEW DATA
                    if (resp.ok) getUsers()
                } else if (!isUser) {
                    resp = await deleteAdminDB(id)
                    //FETCH NEW DATA
                    if (resp.ok) getAdmins()
                }

                if (resp.ok) {
                    Swal.fire(
                        'Deleted!',
                        resp.message,
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: resp.message
                    })
                }
            }
        })


    }

    const editUser = id => {
        setUserUpdate(id)
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
            <h1>{inAdmin ? 'Admins' : ''}</h1>
            <h1>{inUser ? 'Users' : ''}</h1>
            {inAdmin || inUser ?
                <>
                    <div className={styles.containerButtonBC}>
                        {inForm ? '' : <button onClick={goBack}><ArrowBack /> Back</button>}
                        {inAdmin ?
                            <button onClick={createBack}>
                                {inForm ? 'Back' : 'Create'}
                            </button>
                            : ''}
                    </div>
                    {inForm ?
                        <FormAdmin getAdmins={getAdmins} userUpdate={userUpdate} setInForm={() => setInForm(!inForm)} /> :
                        <TableUsers
                            editUser={editUser}
                            deleteUser={deleteUser}
                            handlePageClick={handlePageClick}
                            page={page}
                            pages={pages}
                            inAdmin={inAdmin}
                            users={users} />
                    }
                </>
                :
                <div className={styles.containerButtonAU}>
                    {inForm}
                    <button onClick={getAdmins}> <VerifiedUserOutlined /> Admins</button>
                    <button onClick={getUsers}> <PersonOutlined /> Users</button>
                </div>
            }
        </div >
    )
}

export default ContainerUsers
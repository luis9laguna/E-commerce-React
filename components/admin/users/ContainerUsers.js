import { useCallback, useEffect, useState } from 'react'
import useFetch from 'use-http'
import Pagination from '@/components/public/ui/Pagination'
import { MdModeEditOutline, MdRemoveCircleOutline } from 'react-icons/md'
import styles from '../category/ContainerCategories.module.scss'
import FormAdmin from './FormAdmin'
import { SyncLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

const ContainerUsers = ({ admins }) => {

    const [data, setData] = useState({
        page: 1,
        pages: 0,
        users: []
    })

    const [formActive, setFormActive] = useState(false);
    const [adminUpdate, setAdminUpdate] = useState(null);

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { get, del, response, loading } = useFetch(`${process.env.url}`, options)

    const getAdmins = useCallback(async (pageP) => {
        await get(`/admin?page=${pageP}`)
        if (response.ok) {
            const { allUsers, page, pages } = response.data
            setData({ users: allUsers, page, pages })

        } else {
            toast.error('¡No se han podido obtener los administradores, intente mas tarde!')
        }
    }, [get, response])

    const getUsers = useCallback(async (pageP) => {
        await get(`/user/all?page=${pageP}`)
        if (response.ok) {
            const { allUsers, page, pages } = response.data
            setData({ users: allUsers, page, pages })
        } else {
            toast.error('¡No se han podido obtener los usuarios, intente mas tarde!')
        }
    }, [get, response])

    useEffect(() => {
        if (admins) getAdmins(1)
        else getUsers(1)
    }, [admins, getAdmins, getUsers])

    const getDate = (data) => {
        const date = new Date(data)
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)
    }

    const handlePageClick = e => {
        const selectedPage = e.selected
        setPage(selectedPage + 1)

        if (admins) getAdmins(selectedPage + 1)
        else getUsers(selectedPage + 1)
    }

    const deleteSelected = id => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Una vez eliminado, no seras capaz de recuperar este usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'

        }).then(async (result) => {
            if (result.isConfirmed) {
                await del(`/admin/${id}`)
                if (response.ok) {
                    Swal.fire(
                        '¡Eliminado!',
                        'Admin eliminado correctamente.',
                        'success'
                    )
                    //FETCH NEW DATA
                    getAdmins(1)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error, intente mas tarde.'
                    })
                }
            }
        })
    }

    const editSelected = item => {
        setAdminUpdate(item)
        setFormActive(true)
    }

    return (
        <>
            {loading ? <div className={styles.loader} > <SyncLoader color='#303030' size={50} /></div > :
                <div className={styles.container}>
                    <h1>{admins ? 'Administradores' : 'Usuarios'}</h1>
                    {admins && <div className={styles.containerOptions}>
                        <button onClick={() => setFormActive(true)}>Crear</button>
                    </div>}
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.tr}>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Creado</th>
                                    {admins && <th>Opciones</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{getDate(user.createdAt)}</td>
                                        {admins && <td className={styles.options}>
                                            <button onClick={() => editSelected(user)}> <MdModeEditOutline /></button>
                                            <button onClick={() => deleteSelected(user._id)}><MdRemoveCircleOutline /> </button>
                                        </td>}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {formActive && <FormAdmin setFormActive={setFormActive} adminUpdate={adminUpdate} getAdmins={getAdmins} setAdminUpdate={setAdminUpdate} />}
                    {data.pages > 1 && <Pagination page={data.page} pages={data.pages} handlePageClick={handlePageClick} />}

                </div>
            }
        </>
    )
}

export default ContainerUsers
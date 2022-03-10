import useFetch from 'use-http'
import Swal from 'sweetalert2';
import styles from '@/styles/ui/Tables.module.css'
import { EditOutlined, RemoveCircleOutlined } from '@material-ui/icons';
import Loading from '@/components/public/ui/Loading';
import ErrorMessage from '@/components/public/ui/ErrorMessage';

const TableUsers = (props) => {

    const {
        getAdmins,
        setInForm,
        setAdminUpdate,
        inAdmin,
        users } = props

    //USEFETCH
    const options = { headers: { 'Authorization': localStorage.getItem('token') } }
    const { del, response, loading, error } = useFetch(`${process.env.url}`, options)

    //DATE
    const getDate = (data) => {
        const date = new Date(data)
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)
    }

    const deleteAdmin = id => {
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
                const deleted = await del(`/admin/${id}`)
                if (response.ok) {
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    )
                    //FETCH NEW DATA
                    getAdmins()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.message
                    })
                }
            }
        })
    }

    const editAdmin = user => {
        setAdminUpdate(user)
        setInForm()
    }


    return (
        <div className={styles.tableContainer}>
            {error && <ErrorMessage />}
            {loading ? <Loading space={true} /> :
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>createdAt</th>
                            {inAdmin && <th>options</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{getDate(user.createdAt)}</td>
                                {inAdmin &&
                                    <td className={styles.options}>
                                        <button onClick={() => editAdmin(user)}> <EditOutlined /></button>
                                        <button onClick={() => deleteAdmin(user._id)}><RemoveCircleOutlined /> </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default TableUsers
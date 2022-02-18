import styles from './TableUsers.module.css'
import { EditOutlined, RemoveCircleOutlined } from '@material-ui/icons';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {

    const {
        editUser,
        deleteUser,
        handlePageClick,
        page,
        pages,
        inAdmin,
        users } = props

    //DATE
    const getDate = (data) => {
        const date = new Date(data)
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)
    }


    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>createdAt</th>
                            <th>options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (

                            <tr key={i}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{getDate(user.createdAt)}</td>
                                {inAdmin ?
                                    <td>
                                        <button onClick={() => editUser(user)}> <EditOutlined /></button>
                                        <button onClick={() => deleteUser(user._id)}><RemoveCircleOutlined /> </button>
                                    </td> :
                                    <td>
                                        <button onClick={() => deleteUser(user._id, true)}><RemoveCircleOutlined /></button>
                                    </td>
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <ReactPaginate
                containerClassName={'pagination'}
                activeClassName={'active'}
                disabledClassName={'disabled-page'}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pages}
                forcePage={page - 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default TableUsers
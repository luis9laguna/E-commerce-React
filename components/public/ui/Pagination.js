import ReactPaginate from 'react-paginate';
import styles from '@/styles/ui/Pagination.module.css'

const Pagination = ({ page, pages, handlePageClick }) => {
    return (
        <ReactPaginate
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            disabledClassName={styles.disabled - page}
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
    )
}

export default Pagination
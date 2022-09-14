import reactDom from "react-dom";
import styles from "@/styles/ui/Modal.module.scss"
import { MdClose } from "react-icons/md";

const ModalOverlay = ({ children, onClose }) => {
    return <div className={styles.modal}>
        <MdClose onClick={onClose} />
        {children}
    </div>
}


const Modal = ({ children, onClose }) => {

    return (
        <>
            {reactDom.createPortal(<div className={styles.backdrop} onClick={onClose} />, document.getElementById('overlays'))}
            {reactDom.createPortal(<ModalOverlay onClose={onClose}>{children}</ModalOverlay>, document.getElementById('overlays'))}
        </>
    )
};

export default Modal;

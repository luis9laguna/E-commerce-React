import reactDom from "react-dom";
import styles from "@/styles/ui/Modal.module.css"

const Backdrop = ({ onClose }) => {
    return <div className={styles.backdrop} onClick={onClose} />
}

const ModalOverlay = ({ children }) => {
    return <div className={styles.modal}>
        <div>{children}</div>
    </div>
}


const Modal = ({ children, onClose }) => {

    return (
        <>
            {reactDom.createPortal(<Backdrop onClose={onClose} />, document.getElementById('overlays'))}
            {reactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, document.getElementById('overlays'))}
        </>
    )
};

export default Modal;

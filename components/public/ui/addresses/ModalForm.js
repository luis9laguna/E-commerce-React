import Modal from '@/components/public/ui/Modal'
import FormAddress from './FormAddress'

const ModalForm = ({ addressUpdate, hideModal, setReFetchAddress, setActionAddress, setAddressId }) => {
    return (
        <Modal onClose={hideModal}>
            <FormAddress
                addressUpdate={addressUpdate}
                hideModal={hideModal}
                setReFetchAddress={setReFetchAddress}
                setActionAddress={setActionAddress}
                setAddressId={setAddressId} />
        </Modal>
    )
}

export default ModalForm
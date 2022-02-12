import { useState } from "react";
import Layout from "@/components/public/layout/Layout";
import AddressesInfo from "@/components/public/user/userOptions/Addresses/AddressesInfo";
import UserLayout from "@/components/public/user/UserLayout"
import Meta from "@/components/public/ui/Meta";
import FormAddress from "@/components/public/user/userOptions/Addresses/FormAddress";

export default function Addresses() {


  const [modalFormAddress, setModalFormAddress] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState('');
  const [reFetchAddress, setReFetchAddress] = useState(false)

  //HANDLER OF MODAL FORM ADDRESS
  const handlerShowFormAddress = () => setModalFormAddress(!modalFormAddress);

  return (
    <Layout>
      <Meta title='Addresses' />
      <UserLayout>
        <AddressesInfo
          showModal={handlerShowFormAddress}
          setAddressUpdate={setAddressUpdate}
          reFetchAddress={reFetchAddress}
          setReFetchAddress={setReFetchAddress}
        />
      </UserLayout>

      {modalFormAddress && <FormAddress
        hideModal={handlerShowFormAddress}
        addressUpdate={addressUpdate}
        setAddressUpdate={setAddressUpdate}
        setReFetchAddress={setReFetchAddress} />}

    </Layout>
  )
}

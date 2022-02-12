import { useState } from "react";
import Layout from "@/components/public/layout/Layout";
import UserLayout from "@/components/public/user/UserLayout";
import Orders from "@/components/public/user/userOptions/Orders";
import DetailOrder from "@/components/public/ui/DetailOrder";
import Meta from "@/components/public/ui/Meta";


export default function MyOrders() {

  const [detailOrder, setDetailOrder] = useState(null)
  const [modalDetailOrder, setModalDetailOrder] = useState(false);

  //HANDLER SHOW DETAIL ORDER
  const handlerShowDetailOrder = () => setModalDetailOrder(!modalDetailOrder);

  return (
    <Layout>
      <Meta title='My Orders' />
      <UserLayout>
        <Orders showModal={handlerShowDetailOrder} setDetailOrder={setDetailOrder} />
      </UserLayout>
      {modalDetailOrder && <DetailOrder hideModal={handlerShowDetailOrder} detailOrder={detailOrder} />}
    </Layout>
  )
}

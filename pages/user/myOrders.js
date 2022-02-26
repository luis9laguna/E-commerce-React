import { useState } from "react";
import Layout from "@/components/public/layout/Layout";
import UserLayout from "@/components/public/user/UserLayout";
import DetailOrder from "@/components/public/ui/orders/DetailOrder";
import Meta from "@/components/public/ui/Meta";
import ContainerOrders from "@/components/public/ui/orders/ContainerOrders";


const MyOrders = () => {

  const [detailOrder, setDetailOrder] = useState(null)
  const [modalDetailOrder, setModalDetailOrder] = useState(false);

  //HANDLER SHOW DETAIL ORDER
  const handlerShowDetailOrder = () => setModalDetailOrder(!modalDetailOrder);

  return (
    <Layout>
      <Meta title='My Orders' />
      <UserLayout>
        <ContainerOrders showModal={handlerShowDetailOrder} setDetailOrder={setDetailOrder} />
      </UserLayout>
      {modalDetailOrder && <DetailOrder hideModal={handlerShowDetailOrder} detailOrder={detailOrder} />}
    </Layout>
  )
}

export default MyOrders
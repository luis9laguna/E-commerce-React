import Sidebar from "@/components/admin/layout/Sidebar";
import ContainerOrders from "@/components/public/ui/orders/ContainerOrders";
import DetailOrder from "@/components/public/ui/orders/DetailOrder";
import { useState } from "react";


const orders = () => {

    const [detailOrder, setDetailOrder] = useState(null)
    const [modalDetailOrder, setModalDetailOrder] = useState(false);

    //HANDLER SHOW DETAIL ORDER
    const handlerShowDetailOrder = () => setModalDetailOrder(!modalDetailOrder);

    return (
        <Sidebar>
            <ContainerOrders showModal={handlerShowDetailOrder} setDetailOrder={setDetailOrder} />
            {modalDetailOrder && <DetailOrder hideModal={handlerShowDetailOrder} detailOrder={detailOrder} />}
        </Sidebar>
    )
}

export default orders
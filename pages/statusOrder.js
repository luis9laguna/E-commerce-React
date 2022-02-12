import { useState } from "react";
import Layout from "@/components/public/layout/Layout";
import StatusOrderForm from "@/components/public/StatusOrderForm";
import DetailOrder from "@/components/public/ui/DetailOrder";

export default function statusPackage() {

    const [detailOrder, setDetailOrder] = useState(null)

    const [modalDetailOrder, setModalDetailOrder] = useState(false);

    const showModalHandler = () => setModalDetailOrder(true);
    const hideModalHandler = () => setModalDetailOrder(false);

    return (
        <Layout>
            <Meta title='StatusOrder' />
            <StatusOrderForm showModal={showModalHandler} setDetailOrder={setDetailOrder} />
            {modalDetailOrder && <DetailOrder hideModal={hideModalHandler} detailOrder={detailOrder} />}
        </Layout>
    )
}

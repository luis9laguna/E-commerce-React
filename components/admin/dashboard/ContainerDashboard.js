import { useEffect, useState } from "react";
import useFetch from 'use-http'
import BottomDashboard from "./BottomDashboard"
import TopDashboard from "./TopDashboard"
import styles from './ContainerDashboard.module.css'
import Loading from "@/components/public/ui/Loading";
import ErrorMessage from "@/components/public/ui/ErrorMessage";


const ContainerDashboard = () => {

    const [information, setInformation] = useState('');

    //USEFETCH
    const options = { headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, response, loading, error } = useFetch(`${process.env.url}/order/total/information`, options)


    const getOrdersInformation = async () => {
        const information = await get()
        if (response.ok) setInformation(information.orders)
    }

    useEffect(() => { getOrdersInformation() }, []);

    return (
        <div className={styles.containerDashboard}>
            {error && <ErrorMessage />}
            {loading && !error ? <Loading space={true} /> : <TopDashboard information={information} />}
            <BottomDashboard />
        </div>
    )
}

export default ContainerDashboard
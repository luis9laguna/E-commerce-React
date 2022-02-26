import { useEffect, useState } from "react";
import useFetch from 'use-http'
import BottomDashboard from "./BottomDashboard"
import TopDashboard from "./TopDashboard"
import styles from './ContainerDashboard.module.css'


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
            <TopDashboard information={information} />
            <BottomDashboard />
        </div>
    )
}

export default ContainerDashboard
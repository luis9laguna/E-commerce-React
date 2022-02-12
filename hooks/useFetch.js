import { useState } from "react";
import clientAxios from "config/axios";

const useFetch = (url, useToken) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)

        if (useToken) {
            const token = localStorage.getItem('token')
            if (token) tokenAuth(token)
            else return false
        }

        clientAxios.get(url).then(resp => {
            setData(resp.data)
        })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [url]);

    return { data, loading, error }
};

export default useFetch;

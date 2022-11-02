import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import categoryContext from "./categoryContext";


const CategoryState = ({ children }) => {

    const [categories, setCategories] = useState([])

    useEffect(() => { getCategories() }, []);

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.url}/category`)
            const result = await response.json();
            setCategories(result.categories)
        } catch (error) {
            setCategories([])
        }
    }

    return (
        <categoryContext.Provider
            value={{ categories }}
        >
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryState
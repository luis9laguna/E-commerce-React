import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import Swal from 'sweetalert2'
import useInput from 'hooks/useInput'
import styles from '@/styles/ui/Form.module.css'
import Upload from '@/components/public/ui/upload'
import Loading from '@/components/public/ui/Loading'
import ErrorMessage from '@/components/public/ui/ErrorMessage'

export default function FormProduct({ inventoryUpdate, selectCategories, getProducts, setInForm }) {

    //IMAGES STATE
    const [images, setImages] = useState([])

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //FILL FORM EDIT
    useEffect(() => {
        if (inventoryUpdate !== null) {
            const { name, images, category, description, price, cost, stock } = inventoryUpdate
            nameFillEdit(name)
            categoryFillEdit(category._id)
            descriptionFillEdit(description)
            priceFillEdit(price)
            costFillEdit(cost)
            stockFillEdit(stock)
            setImages(images)
        }
    }, [inventoryUpdate]);

    //NAME
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        fillEdit: nameFillEdit,
        reset: resetNameInput
    } = useInput(value => value.trim().length >= 3)

    //CATEGORY
    const {
        value: enteredCategory,
        isValid: enteredCategoryIsValid,
        hasError: categoryInputHasError,
        valueChangeHandler: categoryChangedHandler,
        inputBlurHandler: categoryBlurHandler,
        fillEdit: categoryFillEdit,
        reset: resetCategoryInput
    } = useInput(value => value !== '')


    //DESCRIPTION
    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        fillEdit: descriptionFillEdit,
        reset: resetDescriptionInput
    } = useInput(value => value.trim().length >= 5)

    //PRICE
    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceInputHasError,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
        fillEdit: priceFillEdit,
        reset: resetPriceInput
    } = useInput(value => value > 0);

    //COST
    const {
        value: enteredCost,
        isValid: enteredCostIsValid,
        hasError: costInputHasError,
        valueChangeHandler: costChangedHandler,
        inputBlurHandler: costBlurHandler,
        fillEdit: costFillEdit,
        reset: resetCostInput
    } = useInput(value => value < parseInt(enteredPrice));



    //STOCK
    const {
        value: enteredStock,
        isValid: enteredStockIsValid,
        hasError: stockInputHasError,
        valueChangeHandler: stockChangedHandler,
        inputBlurHandler: stockBlurHandler,
        fillEdit: stockFillEdit,
        reset: resetStockInput
    } = useInput(value => value > 0);


    //FORMVALID?
    let formIsValid = false;
    if (
        enteredNameIsValid &&
        enteredCategoryIsValid &&
        enteredDescriptionIsValid &&
        enteredPriceIsValid &&
        enteredCostIsValid &&
        enteredStockIsValid
    ) formIsValid = true;


    //FORMHANDLER
    const formSubmissionHandler = async e => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const form = {
            name: enteredName,
            images,
            category: e.target.category.value,
            description: enteredDescription,
            price: enteredPrice,
            cost: enteredCost,
            stock: enteredCost
        }

        //SEND
        if (inventoryUpdate === null) await post('/product', form)
        else await put(`/product/${inventoryUpdate._id}`, form)

        //MODAL
        if (response.ok) {
            Swal.fire(
                '¡Excelente!',
                'El producto ha sido creada/editada exitosamente.',
                'success'
            )
            getProducts(1)
            setInForm()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, intente mas tarde'
            })
        }


        //RESET VALUES
        resetNameInput()
        resetDescriptionInput()
        resetPriceInput()
        resetCostInput()
        resetStockInput()
        setImages([])
    }

    return (
        <>
            <h1 className={styles.title}>{inventoryUpdate === null ? 'CREAR' : 'EDITAR'}</h1>
            <form className={styles.form} onSubmit={formSubmissionHandler} style={{ minWidth: '280px', width: '50%' }}>
                <input
                    placeholder="Nombre*"
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
                />
                {nameInputHasError && <p className={styles.invalidText}>El nombre debe tener al menos 3 caracteres.</p>}

                <Upload images={images} setImages={setImages} limit={5} />

                <select id="category" value={enteredCategory} onChange={categoryChangedHandler} onBlur={categoryBlurHandler}>
                    <option disabled="disabled" value="">Seleccionar Categoria</option>
                    {selectCategories.map((category, i) => (
                        <option key={i} value={category._id}>{category.name}</option>
                    ))}
                </select>
                {categoryInputHasError && <p className={styles.invalidText}>Necesitas escoger una categoria.</p>}
                <textarea
                    placeholder="Descripción*"
                    type="text"
                    id="description"
                    value={enteredDescription}
                    onChange={descriptionChangedHandler}
                    onBlur={descriptionBlurHandler}
                />
                {descriptionInputHasError && <p className={styles.invalidText}>La descripción debe tener al menos 5 caracteres</p>}
                <input
                    placeholder="Precio*"
                    type="number"
                    id="price"
                    value={enteredPrice}
                    onChange={priceChangedHandler}
                    onBlur={priceBlurHandler}
                />
                {priceInputHasError && <p className={styles.invalidText}>Debe ser un precio válido.</p>}
                <input
                    placeholder="Costo*"
                    type="number"
                    id="cost"
                    value={enteredCost}
                    onChange={costChangedHandler}
                    onBlur={costBlurHandler}
                />
                {costInputHasError && <p className={styles.invalidText}>Debe ser un costo válido.</p>}
                <input
                    placeholder="Stock*"
                    type="number"
                    id="stock"
                    value={enteredStock}
                    onChange={stockChangedHandler}
                    onBlur={stockBlurHandler}
                />
                {stockInputHasError && <p className={styles.invalidText}>El stock debe ser mayor a 0.</p>}

                <button disabled={!formIsValid}>
                    {loading ? <Loading light={true} /> : (inventoryUpdate === null ? 'CREAR' : 'EDITAR')}
                </button>
                {error && <ErrorMessage />}
            </form>
        </>
    )
}


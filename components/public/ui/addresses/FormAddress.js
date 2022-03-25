import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import useFetch from 'use-http'
import useInput from 'hooks/useInput';
import styles from '@/styles/ui/Form.module.css'
import Loading from '@/components/public/ui/Loading';
import ErrorMessage from '@/components/public/ui/ErrorMessage';

const FormAddress = ({ hideModal, addressUpdate, setReFetchAddress, setActionAddress, notLogged, setAddressId }) => {

    const [editAddress, setEditAddress] = useState('');
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [comunas, setComunas] = useState([]);

    //USEFETCH
    const storage = typeof localStorage !== 'undefined';
    let token
    if (storage) token = localStorage.getItem('token')
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': token } }
    const { get, post, put, response, loading, error } = useFetch(`${process.env.url}`, options)

    //GET ADDRESS
    const getAddressByID = async id => {
        const address = await get(`/address/${id}`)
        if (response.ok) setEditAddress(address.address)
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message
            })
        }
    }

    useEffect(async () => {
        //GET DATA FROM THE DB TO THE FORM THAT IS GOING TO BE EDITED
        if (addressUpdate) getAddressByID(addressUpdate)
        const resp = await fetch('https://apis.digital.gob.cl/dpa/regiones')
        const regionsResp = await resp.json()
        setRegions(regionsResp)
    }, [])

    //PUT THE DATA OBTAIN FROM THE DB IN THE FORM
    useEffect(() => {
        if (editAddress) {
            const { name, phone, id, state, city, province, street, numstreet, apartment, addressname } = editAddress
            nameFillEdit(name)
            phoneFillEdit(phone)
            idFillEdit(id)
            stateFillEdit(state)
            cityFillEdit(city)
            provinceFillEdit(province)
            streetFillEdit(street)
            numstreetFillEdit(numstreet)
            apartmentFillEdit(apartment || '')
            addressNameFillEdit(addressname)
        }
    }, [editAddress])


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

    //PHONE
    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        hasError: phoneInputHasError,
        valueChangeHandler: phoneChangedHandler,
        inputBlurHandler: phoneBlurHandler,
        fillEdit: phoneFillEdit,
        reset: resetPhoneInput
    } = useInput(value => value !== '')


    const regexID = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/

    //ID
    const {
        value: enteredId,
        isValid: enteredIdIsValid,
        hasError: idInputHasError,
        valueChangeHandler: idChangedHandler,
        inputBlurHandler: idBlurHandler,
        fillEdit: idFillEdit,
        reset: resetIdInput
    } = useInput(value => regexID.test(value))

    //STATE
    const {
        value: enteredState,
        isValid: enteredStateIsValid,
        hasError: stateInputHasError,
        valueChangeHandler: stateChangedHandler,
        inputBlurHandler: stateBlurHandler,
        fillEdit: stateFillEdit,
        reset: resetStateInput
    } = useInput(value => value.trim().length >= 2)

    //CITY
    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangedHandler,
        inputBlurHandler: cityBlurHandler,
        fillEdit: cityFillEdit,
        reset: resetCityInput
    } = useInput(value => value.trim().length >= 4)

    //PROVINCE
    const {
        value: enteredProvince,
        isValid: enteredProvinceIsValid,
        hasError: provinceInputHasError,
        valueChangeHandler: provinceChangedHandler,
        inputBlurHandler: provinceBlurHandler,
        fillEdit: provinceFillEdit,
        reset: resetProvinceInput
    } = useInput(value => value.trim().length >= 4)

    //STREET
    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: streetInputHasError,
        valueChangeHandler: streetChangedHandler,
        inputBlurHandler: streetBlurHandler,
        fillEdit: streetFillEdit,
        reset: resetStreetInput
    } = useInput(value => value.trim().length >= 3)

    //NUMSTREET
    const {
        value: enteredNumStreet,
        isValid: enteredNumStreetIsValid,
        hasError: numStreetInputHasError,
        valueChangeHandler: numStreetChangedHandler,
        inputBlurHandler: numStreetBlurHandler,
        fillEdit: numstreetFillEdit,
        reset: resetNumStreetInput
    } = useInput(value => value !== '')

    //APARTMENT
    const {
        value: enteredApartment,
        isValid: enteredApartmentIsValid,
        hasError: apartmentInputHasError,
        valueChangeHandler: apartmentChangedHandler,
        inputBlurHandler: apartmentBlurHandler,
        fillEdit: apartmentFillEdit,
        reset: resetApartmentInput
    } = useInput(value => value.length >= 0)

    //ADDRESS NAME
    const {
        value: enteredAddressName,
        isValid: enteredAddressNameIsValid,
        hasError: addressNameInputHasError,
        valueChangeHandler: addressNameChangedHandler,
        inputBlurHandler: addressNameBlurHandler,
        fillEdit: addressNameFillEdit,
        reset: resetAddressNameInput
    } = useInput(value => value.trim().length >= 3)


    //FORMVALID?
    let formIsValid = false;
    if (
        enteredNameIsValid &&
        enteredPhoneIsValid &&
        enteredIdIsValid &&
        enteredStateIsValid &&
        enteredCityIsValid &&
        enteredProvinceIsValid &&
        enteredStreetIsValid &&
        enteredNumStreetIsValid &&
        enteredApartmentIsValid &&
        enteredAddressNameIsValid
    ) {
        formIsValid = true;
    }

    //FORMHANDLER
    const formSubmissionHandler = async (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUE ADDRESS
        const address = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            id: e.target.id.value,
            state: e.target.state.value,
            city: e.target.city.value,
            province: e.target.province.value,
            street: e.target.street.value,
            numstreet: e.target.numstreet.value,
            apartment: e.target.apartment.value || '',
            addressname: e.target.addressname.value
        }

        console.log(address)

        //SEND
        if (!editAddress) {
            const createdAddress = await post(`/address`, { address })
            if (response.ok) {
                //MODAL
                Swal.fire(
                    'Good job!', 'Your Address has been created succesfully!', 'success'
                )
                //REFETCH ADDRESS
                if (setReFetchAddress) setReFetchAddress(true)
                if (notLogged) Cookies.set('awl', createdAddress.address._id, { expires: 1 })

                //HIDE ADDRESS AND FORMS AND UPDATE INFO
                if (setActionAddress) setActionAddress(false)
                if (setAddressId) setAddressId(createdAddress.address._id)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message,
                })
            }
        } else {
            const updatedAddress = await put(`/address/${addressUpdate}`, { address })
            if (response.ok) {
                //MODAL
                Swal.fire(
                    'Good job!', 'Your Address has been updated succesfully!', 'success'
                )
                //REFETCH ADDRESS
                setReFetchAddress(true)

                //HIDE ADDRESS AND FORMS AND UPDATE INFO
                if (setActionAddress) setActionAddress(false)
                if (setAddressId) setAddressId(updatedAddress.address._id)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resp.message,
                })
            }
        }

        //HIDE
        if (hideModal) hideModal()

        //RESET VALUES
        resetNameInput()
        resetPhoneInput()
        resetIdInput()
        resetStateInput()
        resetCityInput()
        resetProvinceInput()
        resetStreetInput()
        resetNumStreetInput()
        resetApartmentInput()
        resetAddressNameInput()
    }

    useEffect(async () => {
        const region = regions.filter(region => enteredState === region.nombre)
        if (region.length !== 0) {
            const resp = await fetch(`https://apis.digital.gob.cl/dpa/regiones/${region[0].codigo}/provincias`)
            const provincesResp = await resp.json()
            setProvinces(provincesResp)
        }
    }, [enteredState]);

    useEffect(async () => {
        const province = provinces.filter(province => enteredCity === province.nombre)
        if (province.length !== 0) {
            const resp = await fetch(`https://apis.digital.gob.cl/dpa/provincias/${province[0].codigo}/comunas`)
            const communesResp = await resp.json()
            setComunas(communesResp)
        }
    }, [enteredCity]);

    return (
        <form className={styles.form} onSubmit={formSubmissionHandler}>
            <h1 style={{ margin: '0rem' }} className={styles.title}>{editAddress ? 'Edit Address' : 'Create a new Address'}</h1>
            <input
                placeholder="Name*"
                type="text"
                id="name"
                value={enteredName}
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
            />
            {nameInputHasError && <p className={styles.invalidText}>Name need to has at least 3 characters</p>}
            <input
                placeholder="Phone*"
                type="number"
                id="phone"
                value={enteredPhone}
                onChange={phoneChangedHandler}
                onBlur={phoneBlurHandler}
            />
            {phoneInputHasError && <p className={styles.invalidText}>Phone is needed</p>}
            <input
                placeholder="ID*"
                type="text"
                id="id"
                value={enteredId}
                onChange={idChangedHandler}
                onBlur={idBlurHandler}
            />
            {idInputHasError && <p className={styles.invalidText}>It has to be a valid ID</p>}

            <select id="state" value={enteredState} onChange={stateChangedHandler} onBlur={stateBlurHandler} style={{ margin: '1rem 0' }}>
                <option disabled="disabled" value="">Select Region</option>
                {regions.map((region, i) => (
                    <option key={i} value={
                        region.nombre
                    }>{region.nombre}</option>
                ))}
            </select>
            {stateInputHasError && <p className={styles.invalidText}>You need to choose a State</p>}

            {enteredState !== '' &&
                <>
                    <select id="city" value={enteredCity} onChange={cityChangedHandler} onBlur={cityBlurHandler} style={{ margin: '0px' }}>
                        <option disabled="disabled" value="">Select City</option>
                        {provinces.map((province, i) => (
                            <option key={i} value={
                                province.nombre
                            }>{province.nombre}</option>
                        ))}
                    </select>
                    {cityInputHasError && <p className={styles.invalidText}>You need to choose a City</p>}
                </>
            }

            {enteredCity !== '' &&
                <>
                    <select id="province" value={enteredProvince} onChange={provinceChangedHandler} onBlur={provinceBlurHandler} style={{ margin: '1rem 0' }}>
                        <option disabled="disabled" value="">Select Province</option>
                        {comunas.map((comuna, i) => (
                            <option key={i} value={
                                comuna.nombre
                            }>{comuna.nombre}</option>
                        ))}
                    </select>
                    {provinceInputHasError && <p className={styles.invalidText}>You need to choose a Province</p>}
                </>
            }
            <input
                placeholder="Street*"
                type="text"
                id="street"
                value={enteredStreet}
                onChange={streetChangedHandler}
                onBlur={streetBlurHandler}
            />
            {streetInputHasError && <p className={styles.invalidText}>Street need to has at least 3 characters</p>}
            <input
                placeholder="NumStreet*"
                type="number"
                id="numstreet"
                value={enteredNumStreet}
                onChange={numStreetChangedHandler}
                onBlur={numStreetBlurHandler}
            />
            {numStreetInputHasError && <p className={styles.invalidText}>NumStreet is needed</p>}
            <input
                placeholder="Apartment"
                type="number"
                id="apartment"
                value={enteredApartment}
                onChange={apartmentChangedHandler}
                onBlur={apartmentBlurHandler}
            />
            <>
                <input
                    placeholder="Address Name*"
                    type="text"
                    id="addressname"
                    value={enteredAddressName}
                    onChange={addressNameChangedHandler}
                    onBlur={addressNameBlurHandler}
                />
                {addressNameInputHasError && <p className={styles.invalidText}>Street need to has at least 3 characters</p>}
            </>
            <button disabled={!formIsValid}>
                {loading ? <Loading light={true} /> : (editAddress ? 'Edit' : 'Create')}
            </button>
            {error && <ErrorMessage />}
        </form>
    )
};

export default FormAddress;
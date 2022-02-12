import { getAddressByID, postNewAddress, updateAddress } from 'helpers/api-util';
import Swal from 'sweetalert2';
import Modal from '@/components/public/ui/Modal'
import useInput from 'hooks/useInput';
import styles from '@/styles/ui/Form.module.css'
import { useEffect, useState } from 'react';

const FormAddress = ({ hideModal, addressUpdate, setReFetchAddress }) => {

    const [editAddress, setEditAddress] = useState('');

    //GET DATA FROM THE DB TO THE FORM THAT IS GOING TO BE EDITED
    useEffect(async () => {
        if (addressUpdate !== '') {
            await getAddressByID(addressUpdate).then(resp => {
                if (resp.ok) {
                    setEditAddress(resp.address)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: resp.message
                    })
                }
            })
        }
    }, [])

    //PUT THE DATA OBTAIN FROM THE DB IN THE FORM
    useEffect(() => {
        if (editAddress !== '') {
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


    //REGEX
    const regexId = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/

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

    //ID
    const {
        value: enteredId,
        isValid: enteredIdIsValid,
        hasError: idInputHasError,
        valueChangeHandler: idChangedHandler,
        inputBlurHandler: idBlurHandler,
        fillEdit: idFillEdit,
        reset: resetIdInput
    } = useInput(value => regexId.test(value))

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
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        //CHECK
        if (!formIsValid) return;

        //VALUES
        const name = e.target.name.value
        const phone = e.target.phone.value
        const id = e.target.id.value
        const state = e.target.state.value
        const city = e.target.city.value
        const province = e.target.province.value
        const street = e.target.street.value
        const numstreet = e.target.numstreet.value
        const apartment = e.target.apartment.value || ''
        const addressname = e.target.addressname.value

        const address = {
            name,
            phone,
            id,
            state,
            city,
            province,
            street,
            numstreet,
            apartment,
            addressname
        }

        //SEND
        if (editAddress === '') {
            postNewAddress({
                address
            }).then(resp => {
                if (resp.ok) {
                    //MODAL
                    Swal.fire(
                        'Good job!', 'Your Address has been created succesfully!', 'success'
                    )
                    setReFetchAddress(true)

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: resp.message,
                    })
                }
            })
        } else {
            updateAddress(addressUpdate, {
                address
            }).then(resp => {
                if (resp.ok) {
                    //MODAL
                    Swal.fire(
                        'Good job!', 'Your Address has been created succesfully!', 'success'
                    )
                    setReFetchAddress(true)

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: resp.message,
                    })
                }
            })
        }


        hideModal()

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

    return (
        <Modal onClose={hideModal}>
            <h1 className={styles.title}>{editAddress !== '' ? 'Edit Address' : 'Create a new Address'}</h1>
            <form className={styles.form} onSubmit={formSubmissionHandler}>
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
                <input
                    placeholder="State*"
                    type="text"
                    id="state"
                    value={enteredState}
                    onChange={stateChangedHandler}
                    onBlur={stateBlurHandler}
                />
                {stateInputHasError && <p className={styles.invalidText}>State need to has at least 2 characters</p>}
                <input
                    placeholder="City*"
                    type="text"
                    id="city"
                    value={enteredCity}
                    onChange={cityChangedHandler}
                    onBlur={cityBlurHandler}
                />
                {cityInputHasError && <p className={styles.invalidText}>City need to has at least 4 characters</p>}
                <input
                    placeholder="Province*"
                    type="text"
                    id="province"
                    value={enteredProvince}
                    onChange={provinceChangedHandler}
                    onBlur={provinceBlurHandler}
                />
                {provinceInputHasError && <p className={styles.invalidText}>Province need to has at least 4 characters</p>}
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
                <input
                    placeholder="Address Name*"
                    type="text"
                    id="addressname"
                    value={enteredAddressName}
                    onChange={addressNameChangedHandler}
                    onBlur={addressNameBlurHandler}
                />
                {addressNameInputHasError && <p className={styles.invalidText}>Street need to has at least 3 characters</p>}
                <button disabled={!formIsValid}>{editAddress !== '' ? 'Edit' : 'Create'}</button>
            </form>
        </Modal>
    )
};

export default FormAddress;

import { useState, useEffect } from 'react';
import { useAuth } from 'context/auth/authContext';
import { useCart } from 'context/cart/cartContext';
import TopNav from './navbar/TopNav';
import MiddleNav from './navbar/MiddleNav';
import DownNav from './navbar/DownNav';
import Announcement from './elements/Announcement';
import ContactForm from './elements/ContactForm';
import InfoAbout from './elements/InfoAbout';


const Header = () => {

    //USESTATE FOR NAVBAR
    const [isOpen, setIsOpen] = useState(false);

    //USESTATE FOR MODALS ABOUT US/CONTACT FORM
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);

    //HANDER NAVBAR
    const handlerNavbar = () => setIsOpen(!isOpen)

    //SHOW OR HIDE MODAL ABOUT US
    const handlerShowAboutUS = () => setShowAboutUs(!showAboutUs);

    //SHOW OR HIDE MODAL CONTACT FORM
    const handlerShowContactForm = () => setShowContactForm(!showContactForm);

    return (
        <>
            <div className='header'>
                <Announcement />
                <TopNav />
                <MiddleNav setIsOpen={handlerNavbar} isOpen={isOpen} />
                <DownNav
                    statusOpen={isOpen}
                    showContactForm={handlerShowContactForm}
                    showAboutUs={handlerShowAboutUS}
                />
            </div>
            {showAboutUs && <InfoAbout onClose={handlerShowAboutUS} />}
            {showContactForm && <ContactForm onClose={handlerShowContactForm} />}
        </>
    )
}

export default Header
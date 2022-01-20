import { useState } from 'react';
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


    //SHOW OR HIDE MODAL ABOUT US
    const hideAboutUsHandler = () => setShowAboutUs(false);
    const showAboutUsHandler = () => setShowAboutUs(true);

    //SHOW OR HIDE MODAL CONTACT FORM
    const hideContactFormHandler = () => setShowContactForm(false);
    const showContactFormHandler = () => setShowContactForm(true);

    return (
        <>
            <div className='header'>
                <Announcement />
                <TopNav />
                <MiddleNav open={(isOpen) => setIsOpen(isOpen)} statusOpen={isOpen} />
                <DownNav statusOpen={isOpen} showContactForm={showContactFormHandler} showAboutUs={showAboutUsHandler} />
            </div>
            {showAboutUs && <InfoAbout onClose={hideAboutUsHandler} />}
            {showContactForm && <ContactForm onClose={hideContactFormHandler} />}
        </>
    )
}

export default Header
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter, faInstagram, faPinterest} from "@fortawesome/free-brands-svg-icons";
import './Footer.css';

const Footer = () => {
    return(
        <div className="container-md">
        <footer className="pt-4">

                <div className="socialMedia">

                    <a href="https://www.facebook.com/">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="mr-4"/>
                    </a>

                    <a href="https://www.twitter.com">
                        <FontAwesomeIcon icon={faTwitter} size="2x" className="mr-4"/>
                    </a>


                    <a href="https://www.instagram.com">
                        <FontAwesomeIcon icon={faInstagram} size="2x" className="mr-4"/>
                    </a>

                    <a href="https://www.pinterest.com">
                        <FontAwesomeIcon icon={faPinterest} size="2x" className="mr-4"/>
                    </a>

                </div>



            <div className="text-center py-4" style={{fontSize: '1.2rem'}}>©2021 Copyright: <span
                style={{fontWeight: 'bold' }}>Theater</span>. All
                Rights Reserved
            </div>
        </footer>
        </div>
    )
}
export default Footer;

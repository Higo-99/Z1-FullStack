import { Link } from 'react-router-dom';
import './Footer.scss';
import certifiedIMG from '../../img/logoSaleNoti.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const content = (
        <div className="footerBackground">
            <section className='footerSection'>
                <footer className="topFooter">
                    <div className="footerContents">
                        <div className="links-column">
                            <h2>ABOUT CHARM</h2>
                            <p>Charm VietNam CO.,LTD</p>
                            <p>Address: 73/4 Nguyễn Ảnh Thủ, Trung Chánh, Hóc Môn, HCM City</p>
                            <p>Email: vantrung.ltv@gmail.com</p>
                            <h2>CERTIFIED</h2>
                            <Link to='http://online.gov.vn/Home/WebDetails/98507' target="_blank">
                                <img src={certifiedIMG} alt="certified" srcset="" />
                            </Link>
                        </div>
                        <div className="links-column">
                            <h2>CUSTOMER SERVICE</h2>
                            <Link className='footerLink'>About Charm's Perfume</Link>
                            <Link className='footerLink'>Perfume Samples</Link>
                            <Link className='footerLink'>Agent Registration</Link>
                            <Link className='footerLink'>Lazada Mall</Link>
                            <Link className='footerLink'>Shopee Mall</Link>
                            <Link className='footerLink'>Contact</Link>
                            <Link className='footerLink'>Policies</Link>
                        </div>
                        <div className="links-column socials-column">
                            <h2>Social Media</h2>
                            <p>
                                Follow us on social media to find out the latest updates on our
                                progress.
                            </p>
                            <div className="socialsIcon">
                                <Link
                                    to={`https://www.facebook.com/nuochoacharmevietnam/`}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faSquareFacebook} />
                                </Link>
                                <Link
                                    to={`https://www.youtube.com/channel/UCJJSuChEEfixHyDRb20hnzA`}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faYoutube} />
                                </Link>

                            </div>
                        </div>
                    </div>
                </footer>
                <footer className="bottomFooter">
                    <p className="copyright">© 2023 All rights reserved</p>
                    <div className="legal">
                        <Link
                            className='footerLink' to='http://online.gov.vn/Home/WebDetails/98507'
                            target="_blank"
                        >
                            License
                        </Link>
                        <Link
                            className='footerLink'
                            target="_blank"
                            to={`https://www.dmca.com/Protection/Status.aspx?
                        ID=61ec948e-64e3-4764-970d-e7d255e0dc53&refurl=
                        https://charmevietnam.com/lien-he.html`}
                        >
                            Privacy
                        </Link>
                    </div>
                </footer>
            </section>
        </div>
    );

    return content;
};

export default Footer;
import './UsersEditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import doctorImg from '../img/doctorImg.jpg';

const UsersEditForm = () => {

    let content;

    content = (
        <div className="Edit-background">
            <div className="signup-container">
                <div className="left-container">
                    <h1>
                        <FontAwesomeIcon icon={faUserDoctor} />
                        Z1-HOSPITAL
                    </h1>
                    <div className="doctor">
                        <img src={doctorImg} alt='female doctor smile' />
                    </div>
                </div>
                <div className="right-container">
                    <form action="">
                        <header>
                            <h1>Z1-HOSPITAL! Ensure your health gets the best care! </h1>
                            <div className="set">
                                <div className="users-firstname">
                                    <label for="users-firstname">First Name</label>
                                    <input id="users-firstname" placeholder="User's first name" type="text"></input>
                                </div>
                                <div className="users-photo">
                                    <button id="users-upload">
                                        <FontAwesomeIcon icon={faCameraRetro} />
                                    </button>
                                    <label for="users-upload">Upload a photo</label>
                                </div>
                            </div>
                            <div className="set">
                                <div className="users-lastname">
                                    <label for="users-lastname">Last Name</label>
                                    <input id="users-lastname" placeholder="User's last name" type="text"></input>
                                </div>
                                <div className="users-birthday">
                                    <label for="users-birthday">Birthday</label>
                                    <input id="users-birthday" placeholder="MM/DD/YYYY" type="text"></input>
                                </div>
                            </div>
                            <div className="set">
                                <div className="users-gender">
                                    <label for="users-gender-female">Gender</label>
                                    <div className="radio-container">
                                        <input id="users-gender-female" name="users-gender" type="radio" value="0"></input>
                                        <label for="users-gender-female">Female</label>
                                        <input id="users-gender-male" name="users-gender" type="radio" value="1"></input>
                                        <label for="users-gender-male">Male</label>
                                    </div>
                                </div>
                                <div className="users-phonenumber">
                                    <label for="users-phonenumber">Birthday</label>
                                    <input id="users-phonenumber" placeholder="MM/DD/YYYY" type="text"></input>
                                </div>
                            </div>
                            <div className="users-address fullline ">
                                <label for="users-address">Address</label>
                                <input id="users-address" placeholder="Address" type="text"></input>
                            </div>
                        </header>
                        <footer>
                            <div className="set">
                                <button id="back">Back</button>
                                <button id="next">Next</button>
                            </div>
                        </footer>
                    </form>
                </div>
            </div>
        </div>

    );

    return content;
}

export default UsersEditForm;
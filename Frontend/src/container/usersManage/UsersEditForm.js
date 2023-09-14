import './UsersEditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import doctorImg from '../img/doctorImg.jpg';
import { useEditUsersMutation } from './userApiSlice';
import { useState } from 'react';

const UsersEditForm = ({ user }) => {

    const [
        editUser, {
            isLoading,
            isSuccess,
            isError,
            error
        }
    ] = useEditUsersMutation();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lasttName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [address, setAddress] = useState(user.address);

    const [delPopup, setDelPopup] = useState(false);
    const handleDelPopup = () => setDelPopup(!delPopup);
    const delPopupContent = delPopup && (
        <div className="overlay">
            <div className="modal-content">
                <h1>Delete user?</h1>
                <button className='approve-modal'                >
                    Confirm
                </button>
                <button className='close-modal' onClick={handleDelPopup}                >
                    Close
                </button>
            </div>
        </div>
    );

    let content;

    content = (
        <div className="Edit-background">
            <div className="signup-container">
                <div className="left-container">
                    <div className="Logo">
                        <h1>
                            <FontAwesomeIcon className='icon' icon={faUserDoctor} />
                            Z1-HOSPITAL
                        </h1>
                    </div>

                    <div className="doctor">
                        <img src={doctorImg} alt='female doctor smile' />
                    </div>
                </div>
                <div className="right-container">
                    <form action="" onSubmit={e => e.preventDefault()}>
                        <div className="header">
                            <h1>Z1-HOSPITAL! Ensure your health gets the best care! </h1>
                            <div className="set">
                                <div className="users-firstname">
                                    <label for="users-firstname">First Name</label>
                                    <input id="users-firstname" placeholder="User's first name" type="text"
                                        value={firstName}
                                    />
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
                                    <input id="users-lastname" placeholder="User's last name" type="text"
                                        value={lasttName}
                                    />
                                </div>
                                <div className="users-birthday">
                                    <label for="users-birthday">Birthday</label>
                                    <input id="users-birthday" placeholder="MM/DD/YYYY" type="text" />
                                </div>
                            </div>
                            <div className="set">
                                <div className="users-gender">
                                    <label for="users-gender-female">Gender</label>
                                    <div className="radio-container">
                                        <input id="users-gender-female" name="users-gender" type="radio" value="0" />
                                        <label for="users-gender-female">Female</label>
                                        <input id="users-gender-male" name="users-gender" type="radio" value="1" />
                                        <label for="users-gender-male">Male</label>
                                    </div>
                                </div>
                                <div className="users-phonenumber">
                                    <label for="users-phonenumber">Phonenumber</label>
                                    <input id="users-phonenumber" placeholder="0123456789" type="text" />
                                </div>
                            </div>
                            <div className="users-address fullline ">
                                <label for="users-address">Address</label>
                                <input id="users-address" placeholder="User's address" type="text" />
                            </div>
                            <div class="users-role">
                                <label for="users-role">User's Role</label>
                                <div class="radio-container">
                                    <input id="users-role-Admin" name="users-role" type="radio" value="Admin" />
                                    <label for="users-role-Admin">Admin</label>
                                    <input id="users-role-Doctor" name="users-role" type="radio" value="Doctor" />
                                    <label for="users-role-Doctor">Doctor</label>
                                    <input id="users-role-Patient" name="users-role" type="radio" value="Patient" />
                                    <label for="users-role-Patient">Patient</label>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="set">
                                <button onClick={handleDelPopup} id="delete">
                                    Delete
                                </button>
                                <button id="save">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {delPopupContent}
            </div>
        </div>

    );

    return content;
}

export default UsersEditForm;
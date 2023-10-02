import './UsersEditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faGears } from "@fortawesome/free-solid-svg-icons";
import logo from '../../img/full-logo-trans-back.png';
import { useDeleteUserMutation, useEditUsersMutation } from './userApiSlice';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"

const UsersEditForm = ({ user }) => {
    const [
        editUser, {
            isLoading: isEditLoading,
            isSuccess: isEditSuccess,
            isError: isEditError,
            error: EditError
        }
    ] = useEditUsersMutation();

    const [
        deleteUser, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: DelError
        }
    ] = useDeleteUserMutation();

    const [image, setImage] = useState();
    const userImage = user.image;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [birthday, setBirthday] = useState(user.birthday);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [address, setAddress] = useState(user.address);
    const [gender, setGender] = useState(user.gender);
    const [roleId, setRoleId] = useState(user.roleId);

    const imgInputRef = useRef();

    const handleImgInput = () => {
        imgInputRef.current.click();
    };

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        }
    }, [image]);
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImage(file);
    };

    let avatarContent;
    if (image) {
        avatarContent = <img src={image.preview} alt="" className='avatar' />
    }
    else if (userImage) {
        avatarContent = <img src={userImage} alt="" className='avatar' />
    }
    else {
        avatarContent = <FontAwesomeIcon className='cameraIcon' icon={faCameraRetro} />
    };

    const navigate = useNavigate();

    const onSaveEdit = async () => {
        if (!isEditLoading) {
            await editUser({
                id: user.id, image, firstName, lastName, birthday, phoneNumber, address, gender, roleId
            })
        }
    };

    const onDelUser = async () => {
        await deleteUser({ id: user.id })
    }

    useEffect(() => {
        if (isEditSuccess || isDelSuccess) {
            setImage('')
            setFirstName('')
            setLastName('')
            setBirthday('')
            setPhoneNumber('')
            setAddress('')
            setRoleId('')
            navigate('/usersManage')
        }
    }, [isEditSuccess, isDelSuccess, navigate]);

    const [delPopup, setDelPopup] = useState(false);
    const handleDelPopup = () => setDelPopup(!delPopup);
    const delPopupContent = delPopup && (
        <div className="overlay">
            <div className="modal-content" >
                <div className="content">
                    <div className="anouce">
                        <h4>Delete user</h4>
                        <h3> {user.email} </h3>
                        <h4>???</h4>
                    </div>

                    <button className='approve-modal' onClick={onDelUser} >
                        Confirm
                    </button>
                    <button className='close-modal' onClick={handleDelPopup}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    const errClass = (isEditError || isDelError) ? "errmsg" : "offscreen";
    const errContent = (EditError?.data?.message || DelError?.data?.message) ?? '';

    const content = (
        <div className="Edit-background">
            <p className={errClass} >{errContent}</p>
            <div className="edit-container">
                <div className="left-container">
                    <div className="innerLC Logo">
                        <FontAwesomeIcon className='editIcon' icon={faGears} />
                        <p>EDIT PAGE</p>
                    </div>

                    <div className="innerLC banner">
                        <img src={logo} alt='Charme Logo' />
                    </div>
                </div>

                <div className="right-container">
                    <div className="greeting">
                        <p>CHARME PERFUME GREETING</p>
                        <p>{user.email}</p>
                    </div>
                    <form action="" onSubmit={e => e.preventDefault()}>
                        <div className="formHeader">
                            <div className="set">
                                <div className="users photo">
                                    <div className="avatar" onClick={handleImgInput} id='users-upload'>
                                        {avatarContent}
                                    </div>
                                    <label for="users-upload">Upload avatar</label>
                                    <input type="file" className="users-upload-input" id="img" name="img" accept="image/*"
                                        ref={imgInputRef} onChange={handlePreviewAvatar} />
                                </div>
                                <div className="users firstname">
                                    <label for="users-firstname">First Name</label>
                                    <input id="users-firstname" placeholder="User's first name" type="text"
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="users lastname">
                                    <label for="users-lastname">Last Name</label>
                                    <input id="users-lastname" placeholder="User's last name" type="text"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="set">
                                <div className="users birthday">
                                    <label for="users-birthday">Birthday</label>
                                    <input id="users-birthday" placeholder="MM/DD/YYYY" type="date"
                                        value={birthday} onChange={(e) => setBirthday(e.target.value)}
                                    />
                                </div>
                                <div className="users gender">
                                    <label for="users-gender-female">Gender</label>
                                    <div className="radio-container" >
                                        <input id="users-gender-male" name="users-gender" type="radio" value="Male"
                                            onChange={(e) => setGender(e.target.value)} checked={gender === 'Male'}
                                        />
                                        <label for="users-gender-male">Male</label>
                                        <input id="users-gender-female" name="users-gender" type="radio" value="Female"
                                            onChange={(e) => setGender(e.target.value)} checked={gender === 'Female'}
                                        />
                                        <label for="users-gender-female">Female</label>
                                    </div>
                                </div>
                                <div className="users phonenumber">
                                    <label for="users-phonenumber">Phonenumber</label>
                                    <input id="users-phonenumber" placeholder="+0123456789" type="text"
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="users address fullline ">
                                <label for="users-address">Address</label>
                                <input id="users-address" placeholder="User's address" type="text"
                                    value={address} onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div class="users role fullline offscreen">
                                <label for="users-role">User's Role</label>
                                <div class="radio-container">
                                    <input id="users-role-Admin" name="users-role" type="radio" value="Admin" />
                                    <label for="users-role-Admin">Admin</label>
                                    <input id="users-role-Customer" name="users-role" type="radio" value="Customer" />
                                    <label for="users-role-Customer">Customer</label>
                                </div>
                            </div>
                        </div>
                        <div className="formFooter">
                            <div className="footerBtn">
                                <button onClick={handleDelPopup} id="delete">
                                    Delete
                                </button>
                            </div>
                            <div className="footerBtn">
                                <button id="save" onClick={onSaveEdit} disabled={isEditLoading}>
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
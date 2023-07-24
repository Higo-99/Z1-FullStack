import React, { useState } from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { handleLogin } from '../Service/userService'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [passType, setPassType] = useState('password');
    const [psIcon, setPsIcon] = useState(faEyeSlash);
    const [err, setErr] = useState('');

    const emailHandle = (e) => {
        setEmail(e.target.value);
    };
    const passwordHandle = (e) => {
        setpassword(e.target.value);
    };
    const handlePasswordToggle = () => {
        if (passType === 'password') {
            setPsIcon(faEye);
            setPassType('text')
        } else {
            setPsIcon(faEyeSlash)
            setPassType('password')
        }
    };

    const submitHandle = async () => {
        setErr('');
        try {
            const data = await handleLogin(email, password);
            console.log(data);
            if (data && data.errCode === 0) {
                console.log('logging success');
            }
            if (data && data.errCode !== 0) {
                setErr(data.message)
            }
        }
        catch (e) {
            if (e.response) {
                if (e.response.data) {
                    setErr(e.response.data.message)
                }
            }
            console.log('Error: ' + e.response);
        }

    };

    return (
        <div className="loginbackground center">

            <div className="logincontainer center">
                <h1 className='headform' >Login</h1>
                <form className='loginform center' action="">

                    <div className="email input">
                        <label htmlFor="">Email:</label>
                        <input
                            type="text" name="email" id="email"
                            placeholder='acd@gmail.com' value={email} onChange={emailHandle}
                        />
                    </div>
                    <div className="pass input">
                        <label htmlFor="">Password:</label>
                        <div className='passwordBox'>
                            <input type={passType} name="password" id="password" className='password'
                                placeholder='Password' value={password} onChange={passwordHandle}
                            />
                            <button type='button' className='passIcon' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={psIcon} />
                            </button>
                        </div>
                    </div>
                    <div className="logInMessage center">
                        <p>{err}</p>
                    </div>
                    <div >
                        <button className="login-btn" type="button" onClick={submitHandle}>Log in</button>
                    </div>

                </form>

                <div className="forgotpass">
                    <a href="/$">Forgot your password?</a>
                </div>
                <div className="other-login center">
                    <p>Login with</p>
                    <div className="icon">
                        <a href="/$"><FontAwesomeIcon icon={faSquareGooglePlus} /></a>
                        <a href="/$"><FontAwesomeIcon icon={faSquareFacebook} /></a>

                    </div>
                </div>
                <div className="sign-up center">
                    <p>Don't have account?</p>
                    <a href="/$">SIGN UP</a>
                </div>

            </div>

        </div>
    )
}

export default Login
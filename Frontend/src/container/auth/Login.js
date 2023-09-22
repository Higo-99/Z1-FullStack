import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './form.scss';
import './Login.scss';

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
            // const data = await handleLogin(email, password);
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

    const content = (
        <section className="background center">

            <div className="container center">
                <h1 className='headform' >Login</h1>
                <form className='baseform center' action="" onSubmit={submitHandle} >

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
                                placeholder='Password' value={password}
                                onChange={passwordHandle}
                            />
                            <button type='button' className='passIcon' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={psIcon} />
                            </button>
                        </div>
                    </div>

                    <div >
                        <button className="form-btn" disabled={!email || !password ? true : false}
                            onClick={submitHandle}
                        >
                            Sign In
                        </button>
                    </div>

                </form>
                <div className="formMessage center">
                    <p>{err}</p>
                </div>

                <div className="forgotpass">
                    <Link className='link' to='/$'>Forgot your password?</Link>
                </div>
                <div className="other-login center">
                    <p>Login with</p>
                    <div className="icon">
                        <Link to='/$'><FontAwesomeIcon icon={faSquareFacebook} /></Link>
                        <Link to='/$'><FontAwesomeIcon icon={faSquareGooglePlus} /></Link>
                    </div>
                </div>
                <div className="register center">
                    <p>Don't have account?</p>
                    <Link className='link' to='/register'> REGISTER </Link>
                </div>

            </div>

        </section>
    )

    return content;
}

export default Login
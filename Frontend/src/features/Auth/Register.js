import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import './form.scss'
import './Register.scss'
import { useAddNewUserMutation } from '../UsersManage/userApiSlice';

const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validPwdMatch, setvalidPwdMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    const [passType, setPassType] = useState('password');
    const [confirmPassType, setConfirmPassType] = useState('password');
    const [psIcon, setPsIcon] = useState(faEyeSlash);
    const [cfPsIcon, setCfPsIcon] = useState(faEyeSlash);

    const handlePasswordToggle = () => {
        if (passType === 'password') {
            setPsIcon(faEye);
            setPassType('text')
        } else {
            setPsIcon(faEyeSlash)
            setPassType('password')
        }
    };
    const handleConfirmPasswordToggle = () => {
        if (confirmPassType === 'password') {
            setCfPsIcon(faEye);
            setConfirmPassType('text')
        } else {
            setCfPsIcon(faEyeSlash)
            setConfirmPassType('password')
        }
    };

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setvalidPwdMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('')
    }, [pwd, matchPwd]);

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation();

    const canSave = [validEmail, validPwd, validPwdMatch].every(Boolean) && !isLoading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewUser({ email, password: pwd })
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setPwd('')
            setMatchPwd('')
            navigate('/')
        }
    }, [isSuccess, navigate]);

    const content = (
        <section className="background center">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                aria-live='assertive' > {errMsg} </p>

            <div className="container center">
                <h1 className='headform' >Register</h1>
                <form className='baseform center ' onSubmit={handleSubmit} >
                    <div className="email input">
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? 'hide' : 'invalid'} />
                        </label>
                        <input type="text" name='email' id='email' autoComplete='off' ref={emailRef}
                            onChange={(e) => { setEmail(e.target.value) }} value={email}
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby='uidnote' required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => { setEmailFocus(false) }}
                        />
                    </div>

                    <div className="pass input">
                        <label htmlFor="password">
                            Password
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
                        </label>
                        <div className="passwordBox">
                            <input type={passType} name="password" id="password" className='password'
                                onChange={(e) => { setPwd(e.target.value) }} value={pwd}
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby='pwdnote' required
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <button type='button' className='passIcon' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={psIcon} />
                            </button>
                        </div>
                    </div>

                    <div className="pass input">
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwdMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwdMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <div className="passwordBox">
                            <input type={confirmPassType} id="confirm_pwd" name='confirm_pwd' className='confirm password'
                                onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd}
                                aria-invalid={validPwdMatch ? "false" : "true"}
                                aria-describedby="confirmnote" required
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <button type='button' className='passIcon' onClick={handleConfirmPasswordToggle}>
                                <FontAwesomeIcon icon={cfPsIcon} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <button className="form-btn"
                            disabled={!canSave}
                        >
                            Sign Up
                        </button>
                    </div>

                </form>

                <div >
                    <p className={isError ? "formMessage" : "offscreen"}>{error?.data?.message}</p>

                    <p id='uidnote' className={emailFocus && email && !validEmail ? 'formMessage' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Valid Email Addresses: <br />
                        - email@example.com <br />
                        - firstname-lastname@example.com
                    </p>

                    <p id="pwdnote" className={pwdFocus && !validPwd ? "formMessage" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase a lowercase letters
                        a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <p id="confirmnote" className={matchFocus && !validPwdMatch ? "formMessage" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the password input field.
                    </p>
                </div>

                <div className="log-in center">
                    <p>Already have an account?</p>
                    <Link className='link' to='/login'> LOG IN </Link>
                </div>
            </div>

        </section>
    );

    return content;
}

export default Register
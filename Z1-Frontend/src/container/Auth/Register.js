import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import './form.scss'
import './Register.scss'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('')
    }, [pwd, matchPwd]);

    return (
        <section className="background center">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                aria-live='assertive' > {errMsg} </p>

            <div className="container center">
                <h1 className='headform' >Register</h1>
                <form className='baseform center ' >
                    <div className="email input">
                        <label htmlFor="">
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
                        <label htmlFor="">
                            Password
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
                        </label>
                        <div className="passwordBox">
                            <input type={passType} name="password" id="password" className='password'
                                onChange={(e) => { setPwd(e.target.value) }} value={pwd}
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby='pwdnote'
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <button type='button' className='passIcon' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={psIcon} />
                            </button>
                        </div>
                    </div>


                    <div className="pass input">
                        <label htmlFor="">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <div className="passwordBox">
                            <input type={confirmPassType} id="confirm_pwd" name='confirm_pwd' className='confirm password'
                                onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd} required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
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
                            disabled={!validEmail || !validPwd || !validMatch ? true : false}
                        >
                            Sign Up
                        </button>
                    </div>

                </form>

                <div >
                    <p id='uidnote' className={emailFocus && email &&
                        !validEmail ? 'formMessage' : 'offscreen'}
                    >
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

                    <p id="confirmnote" className={matchFocus && !validMatch ? "formMessage" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the password input field.
                    </p>
                </div>

                <div className="log-in center">
                    <p>Already have an account?</p>
                    <Link className='link' to='/'> LOG IN </Link>
                </div>
            </div>

        </section>
    )
}

export default Register
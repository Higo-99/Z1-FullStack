import { Link } from 'react-router-dom';
import './DropDownMenu.scss';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";

// Burger's button && menu dropdown
export const BurgerMenuDD = () => {
    const [burgerState, setBurgerState] = useState(false);
    const burgerBtnHandle = () => {
        setBurgerState(!burgerState)
    };
    let burgerStateCheck = burgerState ? 'active' : 'inactive';

    let burgerRef = useRef();

    const [checkBox1, setcheckBox1] = useState(false);
    const [checkBox2, setcheckBox2] = useState(false);
    const [checkBox3, setcheckBox3] = useState(false);

    let checkBox1Ref = useRef();
    let checkBox2Ref = useRef();
    let checkBox3Ref = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (checkBox1Ref.current.contains(e.target)) {
                setcheckBox2(false)
                setcheckBox3(false)
            }
            if (checkBox2Ref.current.contains(e.target)) {
                setcheckBox1(false)
                setcheckBox3(false)
            }
            if (checkBox3Ref.current.contains(e.target)) {
                setcheckBox1(false)
                setcheckBox2(false)
            }
            if (!checkBox1Ref.current.contains(e.target)
                && !checkBox2Ref.current.contains(e.target)
                && !checkBox3Ref.current.contains(e.target)) {
                setcheckBox1(false)
                setcheckBox2(false)
                setcheckBox3(false)
            }
            if (!burgerRef.current.contains(e.target)) {
                setBurgerState(false)
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    return (
        <div className='burgerDropdown-menu' ref={burgerRef}>
            {/* Burger Button */}
            <button class={`burger ${burgerStateCheck}`} onClick={burgerBtnHandle}>
                <span></span>
            </button>
            {/* End Burger Button */}

            {/* Menu */}
            <ul className={`dropdown-content ${burgerStateCheck}`}>
                {/* 1st maindroplist */}
                <li className='maindrop'>
                    <Link className='dropCom'>TRANG CHỦ</Link>
                </li>
                {/* End 1st maindroplist */}

                {/* 2nd maindroplist */}
                <li className='maindrop'>
                    <label ref={checkBox1Ref} htmlFor="checkbox-Types"
                        className={`dropCom ${checkBox1 ? 'active' : 'inactive'}`}
                    >
                        LOẠI NƯỚC HOA
                    </label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types" className='checkbox'
                        checked={checkBox1} onClick={() => setcheckBox1(!checkBox1)}
                    />
                    <ul className='expand-menu types'>
                        <li>
                            <Link className='dropCom'>NƯỚC HOA NAM</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>NƯỚC HOA NỮ</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>NƯỚC HOA UNISEX</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>NƯỚC HOA XE HƠI</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>NƯỚC HOA TRẺ EM</Link>
                        </li>
                    </ul>
                </li>
                {/* End 2nd maindroplist */}

                {/* 3rd maindroplist */}
                <li className='maindrop'>
                    <label ref={checkBox2Ref} htmlFor="checkbox-Types2"
                        className={`dropCom ${checkBox2 ? 'active' : 'inactive'}`}
                    >
                        CỬA HÀNG TRỰC TUYẾN
                    </label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types2" className='checkbox'
                        checked={checkBox2} onClick={() => setcheckBox2(!checkBox2)}
                    />
                    <ul className='expand-menu mall'>
                        <li>
                            <Link className='dropCom'>Shopee</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Lazada</Link>
                        </li>
                    </ul>
                </li>
                {/* End 3rd maindroplist */}

                {/* 4th maindroplist */}
                <li className='maindrop'>
                    <label ref={checkBox3Ref} htmlFor="checkbox-Types3"
                        className={`dropCom ${checkBox3 ? 'active' : 'inactive'}`}
                    >
                        THÔNG TIN
                    </label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types3" className='checkbox'
                        checked={checkBox3} onClick={() => setcheckBox3(!checkBox3)}
                    />
                    <ul className='expand-menu mall'>
                        <li>
                            <Link className='dropCom'>VỀ NƯỚC HOA CHARM</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>BÀI VIẾT</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>CHÍNH SÁCH</Link>
                        </li>
                    </ul>
                </li>
                {/* End 4th maindroplist */}
            </ul>
            {/*End Menu */}
        </div>
    )
};

// Search bar dropdown
export const SearchDD = ({ active }) => {
    const [input, setInput] = useState('');
    const inputHandle = (e) => {
        setInput(e.target.value)
    };
    const clearBtnHandle = () => {
        setInput('')
    };

    return (
        <div class={`DropdownSeacher ${active}`}>
            <button className='searchBtn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <input type='text' placeholder='Search here...' value={input} onChange={inputHandle} />
            <button
                className={input ? 'clearBtn' : 'offsceen'}
                onClick={clearBtnHandle}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>

    )
};

// User menu dropdown
export const UserDD = () => {
    const [userDrop, setUserDrop] = useState(false);
    const UserBtnHandle = () => {
        setUserDrop(!userDrop)
    };
    let userDropActive = userDrop ? 'active' : 'inactive';

    const userDropRef = useRef();
    // const [checkBox, setcheckBox] = useState(false);
    // const checkBoxRef = useRef();
    useEffect(() => {
        let outuserDropHandle = (e) => {
            if (!userDropRef.current.contains(e.target)) {
                setUserDrop(false);
            }
            // if (!checkBoxRef.current.contains(e.target)) {
            //     setcheckBox(false);
            // }
        }
        document.addEventListener('mousedown', outuserDropHandle);

        return () => {
            document.removeEventListener('mousedown', outuserDropHandle)
        };
    });

    return (
        <div className="userDropdown-menu" ref={userDropRef}>
            <button className='headerBtnIcon' onClick={UserBtnHandle}>
                <FontAwesomeIcon icon={faUser} className='headerIcon' />
            </button>
            <ul className={`userDropdown-content ${userDropActive}`} >
                <li className='maindrop'>
                    <Link className='dropCom'>THÔNG TIN TÀI KHOẢN</Link>
                </li>
                <li className='maindrop'>
                    <Link className='dropCom'>YÊU THÍCH</Link>
                </li>
                {/* <li className='maindrop'>
                    <label ref={checkBoxRef} htmlFor="checkbox-lang" className='dropCom'>
                        Language
                    </label>
                    <input
                        type="checkbox" name="checkbox-lang" id="checkbox-lang" className='checkbox'
                        checked={checkBox} onClick={() => setcheckBox(!checkBox)}
                    />
                    <ul className='langExpand-menu'>
                        <li>
                            <Link className='dropCom'>VietNamese</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>English</Link>
                        </li>
                    </ul>
                </li> */}
                <li className='maindrop'>
                    <Link className='dropCom'>ĐĂNG XUẤT</Link>
                </li>
            </ul>
        </div>

    )
}
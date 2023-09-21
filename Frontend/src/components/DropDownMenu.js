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

    let checkBox1Ref = useRef();
    let checkBox2Ref = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (checkBox1Ref.current.contains(e.target)) {
                setcheckBox2(false)
            }
            if (checkBox2Ref.current.contains(e.target)) {
                setcheckBox1(false)
            }
            if (!checkBox1Ref.current.contains(e.target) && !checkBox2Ref.current.contains(e.target)) {
                setcheckBox1(false)
                setcheckBox2(false)
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
                    <Link className='dropCom'>Home</Link>
                </li>
                {/* End 1st maindroplist */}

                {/* 2nd maindroplist */}
                <li className='maindrop'>
                    <label ref={checkBox1Ref} htmlFor="checkbox-Types" className='dropCom'>
                        Types
                    </label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types" className='checkbox'
                        checked={checkBox1} onClick={() => setcheckBox1(!checkBox1)}
                    />
                    <ul className='expand-menu'>
                        <li>
                            <Link className='dropCom'>Male Perfume</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Female Perfume</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Unisex Perfume</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Car Perfume</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Children Perfume</Link>
                        </li>
                    </ul>
                </li>
                {/* End 2nd maindroplist */}

                {/* 3rd maindroplist */}
                <li className='maindrop'>
                    <label ref={checkBox2Ref} htmlFor="checkbox-Types2" className='dropCom'>
                        Mall
                    </label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types2" className='checkbox'
                        checked={checkBox2} onClick={() => setcheckBox2(!checkBox2)}
                    />
                    <ul className='expand-menu'>
                        <li>
                            <Link className='dropCom'>Shopee Mall</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Lazada Mall</Link>
                        </li>
                    </ul>
                </li>
                {/* End 3rd maindroplist */}

                {/* 4th maindroplist */}
                <li className='maindrop'>
                    <Link className='dropCom'>About</Link>
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
    let userDropActive = userDrop ? 'active' : 'inactive';
    const userDropRef = useRef();
    useEffect(() => {
        let outuserDropHandle = (e) => {
            e.preventDefault();
            if (!userDropRef.current.contains(e.target)) {
                setUserDrop(false);
            }
        }
        document.addEventListener('mousedown', outuserDropHandle);

        return () => {
            document.removeEventListener('mousedown', outuserDropHandle)
        };
    })

    return (
        <div className="userDropdown-menu">
            <button className='headerBtnIcon' onClick={() => setUserDrop(!userDrop)}>
                <FontAwesomeIcon icon={faUser} className='headerIcon' />
            </button>
            <ul className={`userDropdown-content ${userDropActive}`} ref={userDropRef}>
                <li className='maindrop'>
                    <Link className='dropCom'>Profile</Link>
                </li>
                <li className='maindrop'>
                    <Link className='dropCom'>Favotites</Link>
                </li>
                <li className='maindrop'>
                    <Link className='dropCom'>Language</Link>
                </li>
                <li className='maindrop'>
                    <Link className='dropCom'>Logout</Link>
                </li>
            </ul>
        </div>

    )
}
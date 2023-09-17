import './Header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { BurgerMenuDD } from './DropDownMenu';

const Header = () => {
    const [burgerState, setBurgerState] = useState(false);
    const burgerBtnHandle = () => {
        setBurgerState(!burgerState)
    };
    let burgerStateCheck = burgerState ? 'active' : 'inactive';

    const [input, setInput] = useState('');
    const inputHandle = (e) => {
        setInput(e.target.value)
    };
    const clearBtnHandle = () => {
        setInput('')
    };

    const content = (
        <div className="header-contents">
            <div className="hCom leftCom">
                <button class={`burger ${burgerStateCheck}`} onClick={burgerBtnHandle}>
                    <span></span>
                </button>
                <BurgerMenuDD active={burgerStateCheck} />
            </div>
            <div className="hCom midCom">
                <div class="input-box">
                    <button className='searchBtn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    <input type='text' placeholder='Search here...' value={input} onChange={inputHandle} />
                    <button
                        className={input ? 'clearBtn' : 'offsceen'}
                        onClick={clearBtnHandle}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
            <div className="hCom rightCom">
                <div className="firstCom">
                    <div className="switchCom">
                        <input type="checkbox" name="" id="switcher" className='switcher' />
                        <label className='switchLabel' ></label>
                    </div>
                    <div className="searchCom">
                        <button className='searchBtn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>
                <div className="cartBtn">
                    <button className='btnIcon'>
                        <FontAwesomeIcon icon={faCartShopping} className='headerIcon' />
                    </button>
                </div>
                <div className="userBtn">
                    <button className='btnIcon'>
                        <FontAwesomeIcon icon={faUser} className='headerIcon' />
                    </button>
                </div>
            </div>
        </div>
    )
    return content
}

export default Header
import './Header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from 'react';
import { BurgerMenuDD, SearchDD, UserDD } from './DropDownMenu';
import logoImg from '../../img/logo-name-3.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [input, setInput] = useState('');
    const inputHandle = (e) => {
        setInput(e.target.value)
    };
    const clearBtnHandle = () => {
        setInput('')
    };
    const [searchDrop, SetSearchDrop] = useState(false);

    const searchDropDownRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!searchDropDownRef.current.contains(e.target)) {
                SetSearchDrop(false)
            }
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/')
    };

    const content = (
        <div className="header-contents">
            <div className="hCom leftCom">
                <div className="innerLeftCom menubtn">
                    <BurgerMenuDD className={'BurgerDiv'} />
                </div>
                <div className="innerLeftCom logo" onClick={goHome}>
                    <img src={logoImg} alt="logo Img" />
                </div>
            </div>
            <div className="hCom midCom">
                <div className="input-box">
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

                <div className="hRightInner firstCom">
                    {/* <div className="switchCom">
                        <input type="checkbox" name="" id="switcher" className='switcher' />
                        <label className='switchLabel'></label>
                    </div> */}
                    <div className="hRightInner dropSearchBtn">
                        <button className='headerBtnIcon'
                            onClick={() => { SetSearchDrop(!searchDrop) }} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className="hRightInner cartBtn">
                        <button className='headerBtnIcon'>
                            <FontAwesomeIcon icon={faCartShopping} className='headerIcon' />
                        </button>
                    </div>
                </div>

                <div className="hRightInner secondCom userBtn">
                    <UserDD />
                </div>

            </div>
            <div className="searchdropdownblock" ref={searchDropDownRef}>
                <SearchDD active={searchDrop ? 'active' : 'inactive'} />
            </div>
        </div>
    )
    return content
};

export default Header;
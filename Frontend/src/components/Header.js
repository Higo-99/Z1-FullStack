import './Header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from 'react';
import { BurgerMenuDD, SearchDD, UserDD } from './DropDownMenu';

const Header = () => {
    const [input, setInput] = useState('');
    const inputHandle = (e) => {
        setInput(e.target.value)
    };
    const clearBtnHandle = () => {
        setInput('')
    };
    const [searchDrop, SetSearchDrop] = useState(false);
    const dropSearchRef = useRef();
    useEffect(() => {
        let outSearchHandle = (e) => {
            e.preventDefault();
            if (!dropSearchRef.current.contains(e.target)) {
                SetSearchDrop(false);
            }
        }
        document.addEventListener('mousedown', outSearchHandle);

        return () => {
            document.removeEventListener('mousedown', outSearchHandle);
        }
    });

    const content = (
        <div className="header-contents">
            <div className="hCom leftCom">
                <BurgerMenuDD className={'BurgerDiv'} />
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
                <div className="hRightInner firstCom">
                    <div className="switchCom">
                        <input type="checkbox" name="" id="switcher" className='switcher' />
                        <label className='switchLabel'></label>
                    </div>
                    <div className="searchCom">
                        <button className='headerBtnIcon' onClick={() => SetSearchDrop(!searchDrop)}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <div className="hRightInner cartBtn">
                    <button className='headerBtnIcon'>
                        <FontAwesomeIcon icon={faCartShopping} className='headerIcon' />
                    </button>
                </div>
                <div className="hRightInner userBtn">
                    <UserDD />
                </div>
            </div>
            <div className="searchdropdownblock" ref={dropSearchRef}>
                <SearchDD active={searchDrop ? 'active' : 'inactive'} />
            </div>
        </div>
    )
    return content
}

export default Header
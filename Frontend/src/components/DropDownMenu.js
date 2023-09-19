import { Link } from 'react-router-dom';
import './DropDownMenu.scss';
import { useEffect, useRef, useState } from 'react';

export const BurgerMenuDD = ({ active }) => {
    const [C1, setC1] = useState(false);
    const [C2, setC2] = useState(false);

    let c1Ref = useRef();
    let c2Ref = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (c1Ref.current.contains(e.target)) {
                setC2(false)
            }
            if (c2Ref.current.contains(e.target)) {
                setC1(false)
            }
            else {
                setC1(false)
                setC2(false)
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        }

    })
    return (
        <div className='dropdown-menu'>
            <ul className={`dropdown-content ${active}`}>
                <li className='maindrop'>
                    <Link className='dropCom'>Home</Link>
                </li>
                <li className='maindrop'>
                    <label htmlFor="checkbox-Types" className='dropCom'>Types</label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types" className='checkbox1'
                        checked={C1} ref={c1Ref} onClick={() => setC1(!C1)}
                    />
                    <ul className='expand-menu'>
                        <li>
                            <Link className='dropCom'>Male Perfume 2</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Female Perfume 2</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Unisex Perfume 2</Link>
                        </li>
                    </ul>
                </li>
                <li className='maindrop'>
                    <label htmlFor="checkbox-Types2" className='dropCom'>Types</label>
                    <input
                        type="checkbox" name="checkbox-Types" id="checkbox-Types2" className='checkbox1'
                        checked={C2} ref={c2Ref} onClick={() => setC2(!C2)}
                    />
                    <ul className='expand-menu'>
                        <li>
                            <Link className='dropCom'>Male Perfume 3</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Female Perfume 3</Link>
                        </li>
                        <li>
                            <Link className='dropCom'>Unisex Perfume 3</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
};

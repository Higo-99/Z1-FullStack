import { Link } from 'react-router-dom';
import './DropDownMenu.scss';

export const BurgerMenuDD = ({ active }) => {
    return (
        <div>
            <ul className={`dropdown-content ${active}`}>
                <li>
                    Types
                    <ul className='expand-menu'>
                        <li>
                            <Link className='em-items'>Male Perfume</Link>
                        </li>
                        <li>
                            <Link className='em-items'>Female Perfume</Link>
                        </li>
                        <li>
                            <Link className='em-items'>Unisex Perfume</Link>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    )
};

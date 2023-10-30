import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { fragranceList } from './ProductSelectOptions';

const Test = () => {
    const frgs = [{ label: "Akigalawood", value: "Akigalawood" },
    { label: "Amberwood", value: "Amberwood" }];
    const frgs2 = [{ label: "Akigalawood", value: "Akigalawood" }];

    const [fragrance, setFragrance] = useState('');
    const [fragranceSelect, setFragranceSelect] = useState([]);

    for (let i = 0; i < frgs.length; i++) {
        for (let j = 0; j < fragranceList.length; j++) {
            if (fragranceList[j].value === frgs[i].value) {
                if (!fragranceSelect.includes(fragranceList[j])) {
                    setFragranceSelect([...fragranceSelect, fragranceList[j]])
                }
            }
        }
    };

    const productFragRef = useRef();
    const [isFragSelectOpen, setIsFragSelectOpen] = useState(false);
    useEffect(() => {
        let handler = (e) => {
            if (!productFragRef.current.contains(e.target)) {
                setIsFragSelectOpen(false)
            };
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    const selectFragrance = (fragranceOption) => {
        if (fragranceSelect.includes(fragranceOption)) {
            setFragranceSelect(fragranceSelect.filter(op => op !== fragranceOption))
        }
        else {
            setFragranceSelect([...fragranceSelect, fragranceOption])
        }
    };

    const isSelected = (fragranceOption) => {
        return fragranceSelect.includes(fragranceOption);
    };

    useEffect(() => {
        setFragrance(JSON.stringify(fragranceSelect));
    }, [fragranceSelect]);
    // console.log(fragranceSelect);

    const fragranceContent = (
        fragranceList.map(fragranceOption => (
            <li key={fragranceOption.value}
                className={`fragranceOption ${isSelected(fragranceOption) ? 'selected' : ''}`}
                onClick={e => {
                    e.stopPropagation()
                    selectFragrance(fragranceOption)
                }}
            >
                {fragranceOption.label}
            </li>
        ))
    );


    return (
        <div className="fragrance Product" ref={productFragRef}>
            <label
                htmlFor="fragranceProduct"
                onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
            >
                Fragrance
            </label>
            <div
                tabIndex={0} className="fragranceSelect" id="fragranceProduct"
                onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
            >
                <span className='fragranceValue'>
                    {fragranceSelect.map(frag => (
                        <button key={frag.value} className="option-badge"
                            onClick={e => {
                                e.stopPropagation()
                                selectFragrance(frag)
                            }}
                        >
                            {frag.label}
                            <span className='remove-btn'>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        </button>
                    ))}
                </span>
                <div className="fragranceClearBTN"
                    onClick={(e) => {
                        e.stopPropagation()
                        setFragranceSelect([])
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className="fragranceDivider"></div>
                <div className={`fragranceCaret ${isFragSelectOpen ? 'active' : ''}`}
                    onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
                ></div>
                <div className={`fragrancedropdown ${isFragSelectOpen ? 'active' : ''}`}>
                    <ul className={`fragranceList active`}>
                        {fragranceContent}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Test
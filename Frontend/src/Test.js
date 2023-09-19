import React, { useEffect, useRef, useState } from 'react'

const Test = () => {
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
        <div>
            <input type="checkbox" name="" id="" checked={C1} ref={c1Ref} onClick={() => setC1(!C1)} />
            <input type="checkbox" name="" id="" checked={C2} ref={c2Ref} onClick={() => setC2(!C2)} />
        </div>
    )
}

export default Test
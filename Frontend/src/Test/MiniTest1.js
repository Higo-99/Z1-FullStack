import React from 'react';
const MiniTest1 = ({ setOk, ok }) => {
    const onSetOk = () => {
        setOk(!ok)
    };
    const content = (
        <div className="">
            <button onClick={onSetOk}>
                SET OK
            </button>
        </div>
    );
    return (
        content
    )
}

export default MiniTest1
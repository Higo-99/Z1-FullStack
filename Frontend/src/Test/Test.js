import React, { useState } from 'react';
import useTitle from '../hooks/useTitle';

const Test = () => {
    useTitle('Testing Z1-App');

    const [label, setLabel] = useState('');
    console.log('test re-render')
    return (
        <div>
            <div className="label Product">
                <label htmlFor="labelProduct">Label</label>
                <input type="text" id="labelProduct"
                    value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>
        </div>
    )
}

export default Test
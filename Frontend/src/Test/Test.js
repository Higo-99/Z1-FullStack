import React, { useState } from 'react'

const Test = () => {
    const [label, setLabel] = useState('');
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
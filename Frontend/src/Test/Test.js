import React, { useState, useEffect } from 'react';
import { content } from './base64';

const Test = () => {
    const [imageBlob, setImageBlob] = useState(null);

    useEffect(() => {
        // Replace this with your actual base64 encoded image
        const base64Image = content;


        // Convert the base64 data to a Blob
        const blob = base64ToBlob(base64Image);

        // Set the Blob in the state
        setImageBlob(blob);
    }, []);

    // Function to convert base64 to Blob
    const base64ToBlob = (base64Data) => {
        const parts = base64Data.split(',');
        const type = parts[0].match(/:(.*?);/)[1];
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteNumbers], { type: type });
    }

    const decodeBase64Obj = (base64Data) => {
        const parts = base64Data.split(',');
        const type = parts[0].match(/:(.*?);/)[1];
        const byteCharacters = atob(parts[1]);

        const blob = new Blob([byteCharacters], { type: type });

    }


    return (
        <div>
            <h1>Base64 to Blob Image</h1>
            {imageBlob && (
                <img
                    src={URL.createObjectURL(imageBlob)}
                    alt="Blob Image"
                    style={{ maxWidth: '100%' }}
                />
            )}
        </div>
    );
}
export default Test;
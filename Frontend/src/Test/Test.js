// import './Test.scss';
import { useEffect, useState } from "react";
import MiniTest1 from './MiniTest1';

const Test = () => {
    const [ok, setOk] = useState(false);
    const [result, setResult] = useState('not ok')
    useEffect(() => {
        if (ok) {
            setResult('ok')
        }
        if (!ok) {
            setResult('not ok')
        }
    }, [ok]);
    const content = (
        <div className="">
            <MiniTest1 setOk={setOk} ok={ok} />
            <p> {result} </p>
        </div>
    );
    return (
        content
    )
}

export default Test
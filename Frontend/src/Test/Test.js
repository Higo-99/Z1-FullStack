import useTitle from '../hooks/useTitle';
import './Test.scss';

const Test = () => {
    useTitle('Testing Z1-App');

    const content = (
        <h1>Testing page</h1>
    );

    return content;
};

export default Test;
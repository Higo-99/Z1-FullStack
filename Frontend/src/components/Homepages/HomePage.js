import './HomePage.scss';
import Carousel from '../Carousel/Carousel';
import { BIG_BANNER } from '../../img/Banner/BIG_BANNER';
import TopPromotion from '../../img/Banner/Top-Promotion.jpg';

const HomePage = () => {

    const content = (
        <div className="HomePage">

            <div className="top_promption">
                <img src={TopPromotion} alt="" className='top_promption_img' />
            </div>
            <div className="carouselBanner">
                <Carousel slides={BIG_BANNER} />
            </div>

        </div>
    );
    return content;
};

export default HomePage;
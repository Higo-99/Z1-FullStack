import './HomePage.scss';
import Carousel from '../Carousel/Carousel';
import { BIG_BANNER } from '../../img/Banner/BIG_BANNER';
import TopPromotion from '../../img/Banner/Top-Promotion.jpg';
import ProductCard from '../ProductCard/ProductCard';

const HomePage = () => {

    const content = (
        <div className="HomePage">
            <div className="banner">
                <div className="top_promption">
                    <img src={TopPromotion} alt="" className='top_promption_img' />
                </div>
                <div className="carouselBanner">
                    <Carousel slides={BIG_BANNER} />
                </div>
            </div>
            <div className="show-card">
                <ProductCard />
            </div>

        </div>
    );
    return content;
};

export default HomePage;
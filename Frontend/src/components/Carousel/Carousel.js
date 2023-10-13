import './Carousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = ({ slides }) => {
    const content = (
        <div className="HomeCarousel">
            <Swiper
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className='product-images-slider'
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index} className='SwiperSlide'>
                        <img src={item} alt="product images" className='images' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
    return content;
};

export default Carousel;
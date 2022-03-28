import React from 'react'
import BootstrapCarousel from 'react-bootstrap/Carousel';
import Carousel from 'react-bootstrap/Carousel'
import Image from '../Image/Image';
export default function CarouselView(props) {
    let ProductImages = (
        <Carousel.Item>
            <Image
                styles={{width: '100%', height: '300px', position: "relative"}}
                className="d-block w-100"
                src="/images/ShayAndCompanyHero.jpg"
                alt="First slide"
            />
        </Carousel.Item>
    );
    if (props.Images && props.Images.edges.length !== 0) {
        // console.log(props.Images);
        ProductImages = props.Images.edges.map(function (image, key) {
            return (
                <BootstrapCarousel.Item key={key}>
                    <Image
                        styles={{width: '100%', height: '300px', position: "relative"}}
                        className="d-block w-100"
                        src={image.node.contentUrl}
                        alt={image.node.alt}
                    />
                </BootstrapCarousel.Item>
            )
        }
        );
    }
    return (
        <Carousel className='w-100' style={{ minHeight: "300px", backgroundColor: "#b3b3b3" }}>
            {ProductImages}
        </Carousel>
    );
}

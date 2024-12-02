import React from 'react';
import Carousel from 'react-material-ui-carousel';
import slider from "../Helper/slider.json";
import Item from './Item'; 

export default function CarouselBack() {
    return (
        <Carousel
            indicators={false}
            interval={3000} // Automatically change every 3 seconds
            navButtonsAlwaysInvisible={true} // Hide navigation buttons if needed
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1, // Ensure it's behind the login form
            }}
        >
            {
                slider.map(item => <Item key={item.id} item={item} />)
            }
        </Carousel>
    );
}

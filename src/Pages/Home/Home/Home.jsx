import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import PopularClass from '../PopularClass/PopularClass';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import JoinUs from '../JoinUs/JoinUs';
import CustomerReview from '../CustomerReview/CustomerReview';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import Tour from 'reactour'

const Home = () => {
    const [isTourOpen, setIsTourOpen] = useState(false);

    const closeTour = () => {
        setIsTourOpen(false);
    };

    const startTour = () => {
        setIsTourOpen(true);
    };

    const tourSteps = [
        {
            selector: '.banner-video', 
            content: 'Visualize the quality of our services!',
        },
        {
            selector: '.why-choose-us-heading',
            content: 'Reasons why you can rely on us!',
        },
        {
            selector: '.enroll-button',
            content: 'Get enrolled in our most popular class!',
        },
        {
            selector: '.join-us-button',
            content: 'Click here to join our services!',
        },
        {
            selector: '.popular-instructor-heading',
            content: 'Check out our popular instructors!',
        },
        {
            selector: '.customer-review-heading',
            content: 'Know how it feels to be a part of our family!',
            position: 'top',
        },
        {
            selector: '.subscribe',
            content: 'Subscribe to our newsletter!',
        },
    ];

    return (
        <div className='max-w-7xl mx-auto px-2'>

            <Banner startTour={startTour}></Banner>
            <WhyChooseUs></WhyChooseUs>
            <PopularClass></PopularClass>
            <JoinUs></JoinUs>
            <PopularInstructor></PopularInstructor>
            <CustomerReview></CustomerReview>
            <Tour
                steps={tourSteps}
                isOpen={isTourOpen}
                onRequestClose={closeTour}
                disableInteraction
                disableFocusLock
                accentColor="#007aff" 
                highlightedMaskClassName="custom-mask" 
            />
        </div>
    );
};

export default Home;
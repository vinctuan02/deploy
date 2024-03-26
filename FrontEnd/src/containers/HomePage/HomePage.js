import React, { Component } from 'react';
import { connect } from 'react-redux';


import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';

import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import HomeFooter from './HomeFooter';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            ifninite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        }

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                {/* <MedicalFacility settings={settings} /> */}
                <OutStandingDoctor settings={settings} />
                {/* <HandBook settings={settings} /> */}
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

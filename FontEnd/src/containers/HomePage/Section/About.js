import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { FormattedMessage } from 'react-intl';

// import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'
class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Booking Care
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%" height="400px" src="https://www.youtube.com/embed/DFVuYoDVS_g"
                            title="Dreaming" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Khi có sức khỏe bạn có cả ngàn giấc mơ, nhưng khi không có sức khỏe thì bạn chỉ dám mơ ước duy nhất một điều, đó là sức khỏe. Chính vì thế, những câu slogan về sức khỏe ra đời nhằm thôi thúc ý thức của con người về việc chăm sóc sức khỏe.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

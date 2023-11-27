import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { FormattedMessage } from 'react-intl';

// import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'
class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; Booking Care.<a target='_blank' href='https://www.facebook.com/vinctuan2002/'> &#8594; Click here &#8592;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

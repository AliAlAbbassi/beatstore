import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

const Logout = ({ logout }) => {
    return (
        <Fragment>
            <p onClick={logout} style={{ textDecoration: 'none' }} className='block w-full text-lefti text-5xl lg:text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'>
                SIGN OUT
        </p>
        </Fragment>
    )
}

export default connect(null, { logout })(Logout);
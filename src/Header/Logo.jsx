import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Logo = (props) => {
    const { children, to, image, ...restProps } = props;

    return (
        <div className={'logo'} {...restProps}>
            <Link to={to}>
                {
                    image ? <div className={'image'}><img src={image}/></div> : null
                }
                <div className={'text'}>{children}</div>
            </Link>
        </div>
    );
};

Logo.defaultProps = {
    to: '/'
};

Logo.propTypes = {
    children: PropTypes.string,
    to: PropTypes.string,
    image: PropTypes.string
};

Logo.displayName = 'Logo';

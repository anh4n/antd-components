import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '..';
import { Link } from 'react-router-dom';

export const Logo = (props) => {
    const { children, image, ...restProps } = props;

    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${theme} logo`} {...restProps}>
            <Link to="/">
                {
                    image ? <div className={'image'}><img src={image}/></div> : null
                }
                <div className={'text'}>{children}</div>
            </Link>
        </div>
    );
};

Logo.defaultProps = {};

Logo.propTypes = {
    children: PropTypes.string,
    image: PropTypes.string
};

Logo.displayName = 'Logo';

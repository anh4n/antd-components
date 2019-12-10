import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

export const Logo = (props) => {
    const { children, to, image, version, ...restProps } = props;

    return (
        <div className={'logo'} {...restProps}>
            <Link to={to}>
                {
                    image ? <div className={'image'}><img src={image}/></div> : null
                }
                <div className={'text'}>
                    {children}
                    {version ? <Badge className={'version-badge'} count={version}/> : null}
                </div>
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
    image: PropTypes.string,
    version: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

Logo.displayName = 'Logo';

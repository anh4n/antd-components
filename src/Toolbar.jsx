import React from 'react';
import Row from 'antd/lib/grid/row';

const Toolbar = (props) => {
    return (
        <Row style={{width: '100%'}} type="flex">
            {props.children}
        </Row>
    );
};

export default Toolbar;

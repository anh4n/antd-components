import React from 'react';
import '../dist/prism';
import '../dist/prism.css';
import styled from 'styled-components';
import { Col } from 'antd';
import { PrismCode } from 'react-prism';
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

export * from './PropertyTable';

export const Wrapper = styled.div`
    margin: 0 15px;
`;

const StyledPrismCode = styled(PrismCode)`
    margin: 0 !important; 
`;

export const CustomCol = (props) => (
    <Col
        xs={24}
        md={{span: 18}}
        lg={{span: 12}}
        {...props}
    />
);

export const normalizeWhitespace = new Normalizer({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true
});

export const Code = ({children, ...props}) => (
    <StyledPrismCode component="pre" className="language-jsx" {...props}>
        {normalizeWhitespace.normalize(children)}
    </StyledPrismCode>
);

export const generateFakeDataArray = (count, func) => {
    const data = [];

    for (let i = 0; i < count; i++) {
        data.push(func());
    }

    return data;
};

import React from 'react';
import '../dist/prism';
import '../dist/prism.css';
import styled from 'styled-components';
import { Col } from 'antd';
import { PrismCode } from 'react-prism';
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import faker from 'faker';

export * from './PropertyTable';

export const Wrapper = styled.div`
    margin: 0 30px;
`;

const StyledPrismCode = styled(PrismCode)`
    margin: 0 !important; 
`;

export const CustomCol = (props) => (
    <Col
        xs={24}
        md={18}
        xl={18}
        xxl={19}
        {...props}
    />
);

export const normalizeWhitespace = new Normalizer({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true
});

export const Code = ({ children, ...props }) => (
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

export const generateFakeObject = (min = 3, max = 10) => {
    const len = faker.random.number({ min, max });
    let obj = {};

    for (let i = 0; i < len; i++) {
        obj[faker.lorem.word()] = faker.lorem.words();
    }

    return obj;
};

export const generateFakeList = (min = 3, max = 10) => {
    const len = faker.random.number({ min, max });
    let list = [];

    for (let i = 0; i < len; i++) {
        list.push(faker.lorem.words());
    }

    return list;
};

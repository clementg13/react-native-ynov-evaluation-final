import {createGlobalStyle} from 'styled-components';

import RobotoMedium from './RobotoMedium.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'RobotoMedium';
        src: local('RobotoMedium'),
        url(${RobotoMedium}) format('ttf');
        font-weight: 500;
        font-style: normal;
    }
`;

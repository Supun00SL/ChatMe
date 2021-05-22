import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const SvgComponent = props => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        x="0"
        y="0">
        <Path fill="#9a7af1" fill-opacity="1" d="M0,64L120,96C240,128,480,192,720,224C960,256,1200,256,1320,256L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z">
        </Path>
    </Svg>
);

class SvgTopDesign extends Component {
    render() {
        const { style } = this.props;
        const component = SvgComponent();

        return <View style={style}>{component}</View>;
    }
}

export default SvgTopDesign;
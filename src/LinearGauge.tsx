import * as React from 'react';
import { LinearGauge } from '@progress/kendo-react-gauges';

function LinearGaugeComponent(props) {
    const gaugeStyles = {
        display: 'block',
        height: 120
    };
    const pointer = {
        value: props.value
    };
    const linearOptions: any = {
        shape: 'arrow',
        scale: {
            minorUnit: 5,
            majorUnit: 25,
            max: props.maxValue,
            ranges: [
                { from: props.maxValue / 5 * 2, to: props.maxValue / 5 * 3, color: "#ffc700" },
                { from: props.maxValue / 5 * 3, to: props.maxValue / 5 * 4, color: "#ff7a00" },
                { from: props.maxValue / 5 * 4, to: props.maxValue, color: "#c20000" },
            ],
        },
    };
    return (
        <LinearGauge style={gaugeStyles} pointer={pointer} {...linearOptions} />
    );
}
export default LinearGaugeComponent;
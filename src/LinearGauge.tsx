import * as React from 'react';
import {LinearGauge} from '@progress/kendo-react-gauges';

function LinearGaugeComponent(props) {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        setInterval(
            () => {
                setValue(props.value)
            },
            500);
    }, [])

    const linearOptions: any = {
        value: value,
        shape: 'arrow',
        scale: {
            minorUnit: 2,
            majorUnit: 10,
            max: 100,
            ranges: [
                { from: 40, to: 60, color: "#ffc700" },
                { from: 60, to: 80, color: "#ff7a00" },
                { from: 80, to: 100, color: "#c20000" },
            ],
        },
    };
    return (
        <LinearGauge {...linearOptions} />
    );
}
export default LinearGaugeComponent;
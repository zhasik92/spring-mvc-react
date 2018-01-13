import React from 'react';
import Loader from '../utils/loader';
import $ from 'jquery';
import * as d3 from "d3-shape";
import {
    XYPlot,
    XAxis,
    ContourSeries,
    AreaSeries,
    ArcSeries,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    VerticalGridLines,
    MarkSeries
} from 'react-vis';
import {withRouter} from 'react-router';
import Point from '../items/point';

import auth from '../../auth';

import UserSign from '../utils/user-sign';

import formatText from '../../utils/format-str';


var CanvasPage = withRouter(React.createClass({

    render() {
        const {className, marginLeft, marginTop} = this.props;
        const data = [
            {x: 0, y: 8, size: 1},
            {x: 1, y: 5, size: 1},
            {x: 2, y: 4, size: 1},
            {x: 3, y: 9, size: 1},
            {x: 4, y: 1, size: 1},
            {x: 5, y: 7, size: 1},
            {x: 6, y: 6, size: 12},
            {x: 7, y: 3, size: 10},
            {x: 8, y: 2, size: 1},
            {x: 9, y: 0, size: 1}
        ];
        const selectedPointId = null;
       /* const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(5)
            .startAngle(0)
            .endAngle(Math.PI / 2);
        const valueline = d3.line().curve(d3.curveBasis)	 		// <=== THERE IT IS!
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });*/
        //arc();
        const r = 8;
        const cpoints = [];
        for(let i =0; i < 101; i++ ){
            let x = -r/2+((r/2)*(i/100));
            cpoints.push({x:x ,y: Math.sqrt((r/2)*(r/2) - x*x) })
        }
        const configuredCurve = d3.curveCatmullRom.alpha(1);
        return (
            <XYPlot height={600} width={600} xDomain={[-10, 10]} yDomain={[-10, 10]}>
                <LineSeries data={data}/>
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis/>
                <YAxis/>
                {/*<AreaSeries getNull={(d) => d.y !== null} onNearestX={this.onNearestX} data={DATA[0]} />*/}
                <MarkSeries
                    className="mark-series-example"
                    colorType="literal"
                    data={data.map((point, index) =>
                        ({
                            x: point.x,
                            y: point.y,
                            size: point.size,
                            color: selectedPointId === index ? '#FF9833' : '#12939A'
                        }))}
                    onNearestXY={this._onNearestXY}
                    sizeRange={[5, 13]}/>
                <AreaSeries
                    className="area-series-example"
                    curve={configuredCurve}
                    data={cpoints}/>
            </XYPlot>
        );
    }
}));

export default CanvasPage;

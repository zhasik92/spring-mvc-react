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
        const selectedPointId = 3;
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

        for (let i = 0; i < 201; i++) {
            let x = -r  + ((r ) * (i / 201));
            cpoints.push({x: x, y: Math.sqrt((r) * (r) - x * x)})
        }
        cpoints.push({x: 0, y: r / 2 - r / 200});
        cpoints.push({x: 0, y: -r / 2});
        cpoints.push({x: -r/200, y: -r / 2});

        cpoints.push({x: -r/200, y: -r / 2});
        cpoints.push({x: -r, y: -r / 2});
        cpoints.push({x: -r, y: -r / 2+r/200});
        cpoints.push({x: -r, y: 0});

        const configuredCurve = d3.curveCatmullRomClosed.alpha(0.25);
        return (
            <XYPlot height={800} width={800} xDomain={[-10, 10]} yDomain={[-10, 10]}>
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
                    color="#12939a"
                    curve={configuredCurve}
                    data={cpoints}/>
                <AreaSeries
                    className="area-elevated-series-2"
                     color="#12939a"
                    data={[
                        {x: 0, y: -r, y0: 0},
                        {x: r / 2, y: 0, y0: 0}
                    ]}/>
            </XYPlot>
        );
    }
}));

export default CanvasPage;

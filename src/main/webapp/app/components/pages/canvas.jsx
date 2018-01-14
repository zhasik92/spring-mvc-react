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
import PointService from '../../services/points';
import auth from '../../auth';

import UserSign from '../utils/user-sign';

import formatText from '../../utils/format-str';
class PointList extends React.Component {
    render() {
        var points = this.props.points.map(point =>
            <Point key={point.id} point={point}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>Radius</th>
                    <th>Area</th>
                </tr>
                {points}
                </tbody>
            </table>
        )
    }
}

class Point extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.point.x}</td>
                <td>{this.props.point.y}</td>
                <td>{this.props.point.radius}</td>
                <td>{this.props.point.area + ""}</td>
            </tr>
        )
    }
}

var CanvasPage = withRouter(React.createClass({

    getInitialState() {
        return {
            data: [],
            loading: true,
            r: 8
        };
    },
    componentDidMount() {
        const service = new PointService();
        service.get().then(points => {
            this.setState({points, loading: false});
        });
    },
    handleSubmit(event, a, b, c, d) {
        const {marginLeft, innerHeight, onBrushStart} = this.props;
        const locationX = event.nativeEvent.offsetX - 40;
        const locationY = event.nativeEvent.offsetY - 10;
        const plotSizeInPixels = 800 - 50;
        const plotCenterInPixels = 375;
        const x = 20 *((locationX- plotCenterInPixels) / plotSizeInPixels);
        const y = 20 *((plotCenterInPixels-locationY)/ plotSizeInPixels);
        const radius = 3;
        $.ajax({
            type: 'POST',
            url: `${window.config.basename}/api/point`,
            contentType: 'application/json',
            data: JSON.stringify({x, y, radius, token: auth.getToken()}),
            success: data => {
                this.componentDidMount();
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });

        return false;
    },
    render() {
        if (this.state.loading) {
            return ( <Loader isActive="true"/> );
        }
        const points = this.state.points;
        const {className, marginLeft, marginTop} = this.props;
        /*const data = [
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
        ];*/
        const data = points.map((point, index) => ({x: point.x, y: point.y, size: point.radius}));
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
            let x = -r + ((r ) * (i / 201));
            cpoints.push({x: x, y: Math.sqrt((r) * (r) - x * x)})
        }
        cpoints.push({x: 0, y: r / 2 - r / 200});
        cpoints.push({x: 0, y: -r / 2});
        cpoints.push({x: -r / 200, y: -r / 2});

        cpoints.push({x: -r / 200, y: -r / 2});
        cpoints.push({x: -r, y: -r / 2});
        cpoints.push({x: -r, y: -r / 2 + r / 200});
        cpoints.push({x: -r, y: 0});

        const configuredCurve = d3.curveCatmullRomClosed.alpha(0.25);
        return (
            <div>
                <XYPlot
                    height={800}
                    width={800}
                    xDomain={[-10, 10]}
                    yDomain={[-10, 10]}
                    onMouseDown={this.handleSubmit}
                    marginLeft={0}
                >
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis/>
                    <YAxis/>
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
                    <MarkSeries
                        className="mark-series-example"
                        colorType="literal"
                        data={data.map((point, index) =>
                            ({
                                x: point.x,
                                y: point.y,
                                size: point.size,
                                color: selectedPointId === index ? '#FF9833' : '#10523A'
                            }))}
                        onNearestXY={this._onNearestXY}
                        sizeRange={[1, 13]}/>
                </XYPlot>
                <div>
                    <PointList points={points}/>
                </div>
            </div>
        );
    }
}));

export default CanvasPage;

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
            r: 5
        };
    },
    componentDidMount() {
        const service = new PointService();
        service.get().then(points => {
            this.setState({points, loading: false});
        });
    },
    handleSubmit(event) {
        //const {marginLeft, innerHeight, onBrushStart} = this.props;
        //TODO try to use ScaleUtils
        const locationX = event.nativeEvent.layerX  - 40;
        const locationY = event.nativeEvent.layerY  - 10;
        const plotSizeInPixels = 800 - 50;
        const plotCenterInPixels = 375;
        const x = 20 * ((locationX - plotCenterInPixels) / plotSizeInPixels);
        const y = 20 * ((plotCenterInPixels - locationY) / plotSizeInPixels);
       // const scaledX = ScaleUtils.getAttributeScale(this.props,'x');
       // const scaledY = ScaleUtils.getAttributeScale(this.props,'y');

        const radius = this.state.r;
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
    buttonClick(radius, e) {
        this.state.r = radius;
        this.componentDidMount();
        return false;
    },
    isInArea(x, y, radius) {
        return ((radius >= 2 * x - y) && x >= 0 && y <= 0) ||
            (x <= 0 && y <= 0 && x >= -radius && y >= -radius / 2) ||
            (x <= 0 && y >= 0 && ((x * x + y * y) <= radius * radius));
    },
    deleteAll(e) {
        $.ajax({
            type: 'POST',
            url: `${window.config.basename}/api/remove`,
            contentType: 'application/json',
            success: data => {
                this.componentDidMount();
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    },
    render() {
        if (this.state.loading) {
            return ( <Loader isActive="true"/> );
        }
        const points = this.state.points || [];

        const {className, marginLeft, marginTop} = this.props;
        const data = points.map((point, index) => ({x: point.x, y: point.y, radius: this.state.r}));
        const selectedPointId = 3;
        const r = this.state.r;
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
                        color="#66ffcc"
                        curve={configuredCurve}
                        data={cpoints}/>
                    <AreaSeries
                        className="area-elevated-series-2"
                        color="#66ffcc"
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
                                radius: this.state.r,
                                color: this.isInArea(point.x, point.y, this.state.r) == true ? '#ffffff' : '#cc3300'
                            }))}
                        // onNearestXY={this._onNearestXY}
                        //sizeRange={[1, 13]}
                    />
                </XYPlot>
                <button type="button" onClick={(e) => this.buttonClick(3, e)}>3</button>
                <button type="button" onClick={(e) => this.buttonClick(4, e)}>4</button>
                <button type="button" onClick={(e) => this.buttonClick(5, e)}>5</button>
                <button type="button" onClick={(e) => this.buttonClick(6, e)}>6</button>
                <button type="button" onClick={(e) => this.buttonClick(7, e)}>7</button>
                <button type="button" onClick={this.deleteAll}>Delete all</button>


                <div>
                    <PointList points={points}/>
                </div>
            </div>
        );
    }
}));

export default CanvasPage;

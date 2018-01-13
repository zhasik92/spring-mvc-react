import React from 'react';
import {XYPlot, XAxis, ContourSeries, ArcSeries,AreaSeries,  YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import {Link} from 'react-router';

const Point = React.createClass({
    render() {
        const {id, x, y, radius, area} = this.props.data;
        const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;
        const popularText = declOfNum(popular, [`голос`, `голоса`, `голосов`]);
        const html = formatText(comment);

        const data = {user, created_at, text: `Ответ дан `};

        return (
            <XYPlot
                xDomain={[50, 100]}
                yDomain={[1.5, 8]}
                width={600}
                height={300}>
                <ContourSeries
                    animation
                    className="contour-series-example"
                    style={{
                        stroke: '#125C77',
                        strokeLinejoin: 'round'
                    }}
                    colorRange={[
                        '#79C7E3',
                        '#FF9833'
                    ]}
                    data={data}/>
            </XYPlot>
        )
    }
});

export default Point;
import React from 'react';

import Loader from '../utils/loader';
import declOfNum from '../../utils/number-dec';
import PointService from '../../services/points'
var UserPage = React.createClass({
  getInitialState() {
    return {
      data: {},
      isExist: false,
      loading: true
    };
  },
  componentDidMount() {

    const userName = this.props.params.name;
    const service = new PointService();
    service.get().then(data => {
      this.setState({ loading: false });
      if (!data) {
        return;
      }
      let hitPoints = 0;
      data.forEach( function (p) {
          if(p.area){
              hitPoints++;
          }
      });
      data.hitted= hitPoints;
      data.totalPoints = data.length;
      this.setState({ isExist: true });
      this.setState({ data });
    })
  },
  render() {
    if (this.state.loading) {
      return ( <Loader isActive="true" /> );
    }

    if (!this.state.isExist) {
      return ( <div><h2>Пользователя не существует</h2></div> );
    }

    const hitted = this.state.data.hitted;
    const totalPoints = this.state.data.totalPoints;


    return (
      <div>
        <h2>{this.props.dashboard ? `Привет,` : `Страница пользователя`} {this.state.data.username}</h2>
        <div className="user-stats">
          <div className="row">
              <div className="stat points col-3">
                  <span className="number">{hitted}</span>
                  {declOfNum(hitted, [`Попадание`, `Попадания`, `Попадений`])}
              </div>
              <div className="stat points col-3">
                  <span className="number">{totalPoints}</span>
                  {declOfNum(totalPoints, [`Попытка`, `Попытки`, `Попыток`])}
              </div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
});

export default UserPage;

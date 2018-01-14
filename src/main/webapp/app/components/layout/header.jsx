import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render() {
    return (
      <header id="header">
        <div className="header-wrap">
          <div className="header">
            <ul id="menu" className="menu">
              <li className="li logo">
                <Link to="/" className="black south" activeClassName="active" title="Лабораторная работа 4">
                  <strong><i className="fa fa-bug" aria-hidden="true"></i> Лабораторная работа 4
                  </strong>
                </Link>
              </li>
              <li className="li"><Link to="/point" activeClassName="active"><u>Канвас</u></Link></li>
              <li className="li"><Link to="/dashboard" activeClassName="active"><u>Профиль</u></Link></li>
              <li title={"You are " + (this.props.loggedIn ? '' : 'not') + " logged in."} className="li right">  
                {this.props.loggedIn ? (

                  <span> Привет, <b>{localStorage.name}</b> <Link to="/logout"><u>Выйти</u></Link> </span>
                  
                ) : (
                  <span>
                    <Link to="/login" activeClassName="active">Войти</Link>
                    <Link to="/signup" activeClassName="active">Регистрация</Link>
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
});

export default Header;
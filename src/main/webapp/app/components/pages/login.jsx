import React from 'react';
import auth from '../../auth';
import {withRouter} from 'react-router';


const LoginPage = withRouter(
    React.createClass({

        getInitialState() {
            return {
                error: false,
                message: ''
            }
        },

        handleSubmit(event) {
            event.preventDefault()

            const username = this.refs.username.value
            const pass = this.refs.pass.value

            auth.login(username, pass, (loggedIn, message = 'Введены неверные данные') => {
                if (!loggedIn)
                    return this.setState({error: true, message: message})

                const {location} = this.props

                if (location.state && location.state.nextPathname) {
                    console.log(location.state);
                    console.log(location.state.nextPathname);
                    this.props.router.replace(location.state.nextPathname)
                } else {
                    this.props.router.replace('/point')
                }
            })
        },

        render() {
            return (
                <div>
                    <div>LaboratoryWork#4
                        By Kuznetsov Maxim Konstantinovich, var. 5866 </div>
                    <form onSubmit={this.handleSubmit}>
                        <label><input required="required" ref="username" placeholder="Логин"
                                      defaultValue="joe"/></label><br/>
                        <label><input required="required" type="password" ref="pass"
                                      placeholder="Пароль"/></label><br/>
                        <button className="btn btn-block btn-social btn-linkedin" type="submit">Войти в систему</button>
                        {this.state.error && (
                            <p>{this.state.message}</p>
                        )}
                    </form>
                </div>
            )
        }
    })
)

export default LoginPage;
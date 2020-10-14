import React from "react";
import Header from "../header/header";
import {functionType} from "../../types";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange(evt) {
    const {name, value} = evt.target;
    this.setState({[name]: value});
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.onLogIn(this.state.email);
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header
          {...this.props}
        />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={this.handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    onChange={this.handleFieldChange}
                    placeholder="Email"
                    required/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    onChange={this.handleFieldChange}
                    placeholder="Password"
                    autoComplete="off"
                    required/>
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  onLogIn: functionType,
};

export default Login;

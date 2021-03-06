import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import { Spring } from "react-spring/renderprops";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");

      toast(` Welcome ${nextProps.security.user.fullName}`, {
        className: "dark",
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(LoginRequest);
  }
  render() {
    const { errors } = this.state;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 500, duration: 500 }}
      >
        {(props) => (
          <div style={props}>
            <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 m-auto">
                    <h1 className="display-5 mb-5 mt-5 text-white text-center">Log In</h1>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          autoFocus
                          type="text"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.username,
                            }
                          )}
                          placeholder="Email Address"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChange}
                        />
                        {errors.username && (
                          <div className="feedback">
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password,
                            }
                          )}
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        {errors.password && (
                          <div className="feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        placeholder=""
                        className="btn btn-dark btn-block mt-4"
                        onSubmit={this.onSubmit}
                      >
                        Login
                      </button>
                      <span className="text-light text-center">
                          <Link to="/register">
                            <Button
                              className="btn"
                              style={{
                                border: "none",
                                color: "white",
                                fontSize: "12px",
                                justifyContent: "center",
                              }}
                            >
                             
                              Not Registered?
                               Click here to Register
                            </Button>
                          </Link>
                        </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStoreToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});
export default connect(mapStoreToProps, { login })(Login);

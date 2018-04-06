import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still deciding';
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <ul className="left">
            <a className="left brand-logo">Feedback App</a>
          </ul>

          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
/* function mapStateToProps(state) {
  return { auth: state.auth };
} */

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);

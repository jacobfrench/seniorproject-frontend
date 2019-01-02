import React from "react";
import { AuthNav, MainNav } from "app/src/navigation/Nav";
import { connect } from "react-redux";
import { loginUser, fetchUserInfoByEmail } from "app/src/redux/actions";
import {Provider as PaperProvider} from 'react-native-paper';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //check if we have jwt
    this.authenticate();
  }

  authenticate() {
    if (this.props.authToken) {
      this.props.loginUser();
      this.props.fetchUserInfoByEmail(this.props.email);
    }
  }

  render() {
    return (
      // if JWT is present, load main stack else load auth stack.
      <PaperProvider>
        {this.props.loggedIn ? <MainNav /> : <AuthNav />}
      </PaperProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    authToken: state.authToken,
    email: state.user.info.username
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    fetchUserInfoByEmail
  }
)(Index);

import React, { Component } from "react";
import { connect } from "dva";

@connect(({ user }) => ({ user }))
class UserPage extends Component {
  render() {
    console.log("userpage", this.props); //sy-log
    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}
export default UserPage;

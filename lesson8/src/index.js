// import React, {Component} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border">
      FunctionComponent-{props.name}
      <button
        onClick={() => {
          console.log("omg"); //sy-log
        }}>
        click
      </button>
    </div>
  );
}

class ClassComponent extends Component {
  static defaultProps = {
    color: "green"
  };
  render() {
    return (
      <div className="border">
        ClassComponent-{this.props.name}
        <p className={this.props.color}>color</p>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" color="red" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

//多个节点
// fragment

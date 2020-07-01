import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // dispatch执行的时候 ，执行订阅函数
      this.forceUpdate();
      // if(XX) {//}
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({type: "ADD"});
    store.dispatch({type: "DOUBLE_ADD"})
  };

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      // 模拟dispatch的延迟
      // ajax(()=>{
      //   dispatch({type: "ADD"});
      // })
      setTimeout(() => {
        dispatch({type: "ADD"});
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100
      })
    );
  };
  add2 = () => {
    store.dispatch({type: "ADD2", payload: 100});
  };
  render() {
    const { count, doubleCount } = store.getState();
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{count}</p>
        <p>{doubleCount}</p>
        {/* ! 课后补充 使用combineReducers之后，这里返回的state是个对象 */}
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promiseMinus</button>

        <button onClick={this.add2}>
          count2: {store.getState().count2.num}
        </button>
      </div>
    );
  }
}

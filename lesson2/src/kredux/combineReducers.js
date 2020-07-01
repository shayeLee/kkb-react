
export default function combineReducers(reducerMap) {
  return (state = {}, action) => {
    const nextState = {};
    let hasChanged = false;

    Object.keys(reducerMap).forEach(key => {
      nextState[key] = reducerMap[key](state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    });

    hasChanged = hasChanged || Object.keys(reducerMap).length !== Object.keys(state).length;

    // 如果state没有改变，则返回原来的state，避免react发生不必要的渲染
    const result = hasChanged ? nextState : state;
    return result;
  }
}
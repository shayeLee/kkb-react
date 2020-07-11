class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
    const defaultProps = this.__proto__.constructor.defaultProps
    Object.keys(defaultProps).forEach(key => this.props[key] = (props[key] === undefined) ? defaultProps[key] : props[key]);
  }
}

export default Component;

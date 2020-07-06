import React from "react";
import { RouterContext } from "./Context";

class Lifecycle extends React.Component {
    componentDidMount() {
        if (this.props.onMount) this.props.onMount.call(this, this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
    }

    componentWillUnmount() {
        if (this.props.onUnmount) this.props.onUnmount.call(this, this);
    }

    render() {
        return null;
    }
}

export default function Prompt({ when, message }) {
    return (
        <RouterContext.Consumer>
            {context => {
                if (!when) return null;

                const method = context.history.block;

                return (
                    <Lifecycle
                        onMount={self => {
                            self.release = method(message);
                        }}
                        onUpdate={(self, prevProps) => {
                            if (prevProps.message !== message) {
                                self.release();
                                self.release = method(message);
                            }
                        }}
                        onUnmount={self => {
                            self.release();
                        }}
                        message={message}
                    />
                );
            }}
        </RouterContext.Consumer>
    )
}
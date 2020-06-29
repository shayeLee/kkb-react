import React, { Component } from "react";

export default function createForm(Cmp) {
    return class Form extends Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.options = {};
        }
        handleChange = e => {
            const { name, value } = e.target;
            this.setState({ [name]: value });
        };
        getFieldDecorator = (field, option) => InputCmp => {
            this.options[field] = option;
            return React.cloneElement(InputCmp, {
                name: field,
                value: this.state[field] || "",
                onChange: this.handleChange
            });
        };
        setFieldsValue = newStore => {
            this.setState(newStore);
        };
        getFieldsValue = () => {
            return this.state;
        };
        validateFields = callback => {
            let err = [];

            for (let field in this.options) {
                const value = this.state[field];
                const rules = this.options[field]
                    ? Array.isArray(this.options[field]['rules']) ? this.options[field]['rules'] : []
                    : [];
                    
                if (rules.length === 0) continue;

                const rule = rules[0];
                if (rule && rule.required && (value === null || value === undefined || value === "")) {
                    //  出错
                    err.push({
                        [field]: rule.message,
                        value
                    });
                }
            }

            if (err.length === 0) {
                callback(null, this.state);
            } else {
                callback(err, this.state);
            }
        };
        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    setFieldsValue: this.setFieldsValue,
                    getFieldsValue: this.getFieldsValue,
                    validateFields: this.validateFields
                }
            };
        };
        render() {
            return <Cmp {...this.props} {...this.getForm()} />;
        }
    }
}

import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderError({error, touched}) {
        if(error && touched) {
            return (
                <div className="ui message error">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const error = {};
    if (!formValues.title) {
        error.title = "Please enter a title";
    } 
    if (!formValues.description) {
        error.description = "Please enter a description";
    }
    return error;
} 

export default reduxForm({ 
    form: 'streamForm',
    validate 
})(StreamCreate);

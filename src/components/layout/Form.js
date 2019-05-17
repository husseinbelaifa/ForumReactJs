import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
class Form extends Component {
  componentDidMount() {
    console.log(this.props.inputs);
  }
  renderInput = formValues => {
    console.log(formValues);
    return (
      <div className="form-group">
        <label htmlFor={formValues.input.name}>{formValues.label}</label>
        <input
          id={formValues.id}
          name={formValues.input.name}
          type={formValues.type}
          className="form-input"
          {...formValues.input}
        />
      </div>
    );
  };

  renderArrayOfInput() {
    return this.props.inputs.map(input => {
      return (
        <Field
          type={input.type}
          name={input.name}
          key={input.id}
          id={input.id}
          label={input.label}
          component={this.renderInput}
        />
      );
    });
  }

  registerLink() {
    if (this.props.registerLink) {
      return (
        <div class="form-actions text-right">
          <Link to={this.props.registerLink}> Create an account ? </Link>
        </div>
      );
    }
  }
  renderform() {
    return (
      <form action="" className="card card-form">
        <h1 className="text-center">{this.props.formName}</h1>
        {this.renderArrayOfInput()}
        <div className="form-actions">
          <button type="submit" className="btn-blue btn-block">
            {this.props.formName}
          </button>
        </div>
        {this.registerLink()}
      </form>
    );
  }
  render() {
    return <div>{this.renderform()}</div>;
  }
}

export default reduxForm({
  form: "Form"
})(Form);

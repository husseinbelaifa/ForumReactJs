import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

class Form extends Component {
  handleFileChange(e) {
    console.log("clicked");
  }
  renderErrors(formValues) {
    formValues && console.log(formValues);
    // if (touched && error)
    //   return (
    //     <React.Fragment>
    //       <span className="form-error">{error}</span>
    //     </React.Fragment>
    //   );
    // else return null;
  }
  renderFile(formValues) {
    // const errors = this.renderError(formValues);

    const {
      input: { value, ...input }
    } = formValues;

    // touched && console.log(error);

    const error =
      formValues.meta.error && formValues.meta.touched ? (
        <span class="form-error"> {formValues.meta.error} </span>
      ) : (
        ""
      );

    // const renderValue =
    //   formValues.id === "title" && this.props && this.props.initialValuesThread
    //     ? this.props.initialValuesThread.title
    //     : "";
    // delete formValues.input.value;
    if (formValues.type === "file")
      return (
        <div className="form-group">
          <input
            id={formValues.id}
            name={formValues.input.name}
            type={formValues.type}
            className="form-input"
            {...input}
          />{" "}
          {error}{" "}
        </div>
      );
    else if (formValues.type === "textArea") {
      return (
        <div className="form-group">
          <label htmlFor={formValues.input.name}> {formValues.label} </label>{" "}
          <textarea
            id={formValues.id}
            name={formValues.input.name}
            rows="10"
            cols="40"
            className="form-input"
            {...formValues.input}
          >
            {" "}
            {/* {renderValue} */}{" "}
          </textarea>{" "}
          {error}{" "}
        </div>
      );
    } else
      return (
        <div className="form-group">
          <label htmlFor={formValues.input.name}> {formValues.label} </label>{" "}
          <input
            id={formValues.id}
            name={formValues.input.name}
            type={formValues.type}
            className="form-input"
            {...formValues.input}
            // value={renderValue}
          />{" "}
          {error}{" "}
        </div>
      );
  }

  renderInput = formValues => {
    return (
      <div className="form-group">
        <label htmlFor={formValues.input.name}> {formValues.label} </label>{" "}
        <input
          id={formValues.id}
          name={formValues.input.name}
          type={formValues.type}
          className="form-input"
          {...formValues.input}
        />{" "}
      </div>
    );
  };

  renderArrayOfInput() {
    return this.props.inputs.map(input => {
      return input.type === "file " ? (
        <Field
          type={input.type}
          name={input.name}
          key={input.id}
          id={input.id}
          label={input.label}
          value={null}
          component={this.renderFile}
          disabled
        />
      ) : (
        <Field
          type={input.type}
          name={input.name}
          key={input.id}
          id={input.id}
          label={input.label}
          component={this.renderFile}
          value={this.props.initialValues && this.props.initialValues[input.id]}
        />
      );
    });
  }

  registerLink() {
    if (this.props.registerLink) {
      return (
        <div class="form-actions text-right">
          <Link to={this.props.registerLink}> Create an account ? </Link>{" "}
        </div>
      );
    }
  }
  onSubmit = formValues => {
    const fileSelector = document.querySelector("#avatar");

    if (fileSelector) {
      const file = fileSelector.files[0];
      this.props.onSubmit({
        ...formValues,
        file
      });
    } else {
      this.props.onSubmit({
        ...formValues
      });
    }
  };
  renderform() {
    return (
      <form
        action=""
        className="card card-form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <h1 className="text-center"> {this.props.formName} </h1>{" "}
        {this.renderArrayOfInput()}{" "}
        <div className="form-actions">
          <button type="submit" className="btn-blue btn-block">
            {" "}
            {this.props.formName}{" "}
          </button>{" "}
        </div>{" "}
        {this.registerLink()}{" "}
      </form>
    );
  }
  render() {
    console.log(this.props);

    return <div> {this.renderform()} </div>;
  }
}

const formValidate = (formValues, ownProps) => {
  let errors = {};
  // console.log(formValues);
  ownProps.inputs &&
    ownProps.inputs.map(input => {
      if (input.type === "file") {
        formValues[input.id] && console.log(formValues[input.id].length);
        if (
          !formValues[input.id] ||
          (formValues[input.id] && formValues[input.id].length === 0)
        )
          errors[input.id] = `Field ${input.label} Must Not be empty`;
      } else {
        if (!formValues[input.id])
          errors[input.id] = `Field ${input.label} Must Not be empty`;
      }
    });
  // console.log(errors);
  return errors;
};

export default reduxForm({
  form: "Form",
  validate: formValidate
})(Form);

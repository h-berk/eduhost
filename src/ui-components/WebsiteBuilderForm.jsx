/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
export default function WebsiteBuilderForm(props) {
  const { onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    template: "",
    colour: "",
    fullname: "",
    aboutme: "",
    recentprojectname: "",
    recentprojectdescription: "",
    recentprojectlink: "",
    emailaddress: "",
    linkedinurl: "",
  };
  const [template, setTemplate] = React.useState(initialValues.template);
  const [colour, setColour] = React.useState(initialValues.colour);
  const [fullname, setFullname] = React.useState(initialValues.fullname);
  const [aboutme, setAboutme] = React.useState(initialValues.aboutme);
  const [recentprojectname, setRecentprojectname] = React.useState(
    initialValues.recentprojectname
  );
  const [recentprojectdescription, setRecentprojectdescription] =
    React.useState(initialValues.recentprojectdescription);
  const [recentprojectlink, setRecentprojectlink] = React.useState(
    initialValues.recentprojectlink
  );
  const [emailaddress, setEmailaddress] = React.useState(
    initialValues.emailaddress
  );
  const [linkedinurl, setLinkedinurl] = React.useState(
    initialValues.linkedinurl
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTemplate(initialValues.template);
    setColour(initialValues.colour);
    setFullname(initialValues.fullname);
    setAboutme(initialValues.aboutme);
    setRecentprojectname(initialValues.recentprojectname);
    setRecentprojectdescription(initialValues.recentprojectdescription);
    setRecentprojectlink(initialValues.recentprojectlink);
    setEmailaddress(initialValues.emailaddress);
    setLinkedinurl(initialValues.linkedinurl);
    setErrors({});
  };
  const validations = {
    template: [],
    colour: [{ type: "Required" }],
    fullname: [{ type: "Required" }],
    aboutme: [{ type: "Required" }],
    recentprojectname: [{ type: "Required" }],
    recentprojectdescription: [{ type: "Required" }],
    recentprojectlink: [{ type: "Required" }, { type: "URL" }],
    emailaddress: [{ type: "Required" }, { type: "Email" }],
    linkedinurl: [{ type: "Required" }, { type: "URL" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        const modelFields = {
          template,
          colour,
          fullname,
          aboutme,
          recentprojectname,
          recentprojectdescription,
          recentprojectlink,
          emailaddress,
          linkedinurl,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        await onSubmit(modelFields);
      }}
      {...getOverrideProps(overrides, "WebsiteBuilderForm")}
      {...rest}
    >
      <SelectField
        label="Template"
        placeholder="Please select a template"
        value={template}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template: value,
              colour,
              fullname,
              aboutme,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.template ?? value;
          }
          if (errors.template?.hasError) {
            runValidationTasks("template", value);
          }
          setTemplate(value);
        }}
        onBlur={() => runValidationTasks("template", template)}
        errorMessage={errors.template?.errorMessage}
        hasError={errors.template?.hasError}
        {...getOverrideProps(overrides, "template")}
      >
        <option
          children="Resume"
          value="Resume"
          {...getOverrideProps(overrides, "templateoption0")}
        ></option>
      </SelectField>
      <SelectField
        label="Website Colour"
        placeholder="Please select an option"
        value={colour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour: value,
              fullname,
              aboutme,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.colour ?? value;
          }
          if (errors.colour?.hasError) {
            runValidationTasks("colour", value);
          }
          setColour(value);
        }}
        onBlur={() => runValidationTasks("colour", colour)}
        errorMessage={errors.colour?.errorMessage}
        hasError={errors.colour?.hasError}
        {...getOverrideProps(overrides, "colour")}
      >
        <option
          children="red"
          value="red"
          {...getOverrideProps(overrides, "colouroption0")}
        ></option>
        <option
          children="orange"
          value="orange"
          {...getOverrideProps(overrides, "colouroption1")}
        ></option>
        <option
          children="yellow"
          value="yellow"
          {...getOverrideProps(overrides, "colouroption2")}
        ></option>
        <option
          children="green"
          value="green"
          {...getOverrideProps(overrides, "colouroption3")}
        ></option>
        <option
          children="blue"
          value="blue"
          {...getOverrideProps(overrides, "colouroption4")}
        ></option>
        <option
          children="purple"
          value="purple"
          {...getOverrideProps(overrides, "colouroption5")}
        ></option>
      </SelectField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Full Name</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        placeholder="e.g. John Doe"
        value={fullname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname: value,
              aboutme,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.fullname ?? value;
          }
          if (errors.fullname?.hasError) {
            runValidationTasks("fullname", value);
          }
          setFullname(value);
        }}
        onBlur={() => runValidationTasks("fullname", fullname)}
        errorMessage={errors.fullname?.errorMessage}
        hasError={errors.fullname?.hasError}
        {...getOverrideProps(overrides, "fullname")}
      ></TextField>
      <TextAreaField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>About me</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        placeholder="Write something about yourself here"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname,
              aboutme: value,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.aboutme ?? value;
          }
          if (errors.aboutme?.hasError) {
            runValidationTasks("aboutme", value);
          }
          setAboutme(value);
        }}
        onBlur={() => runValidationTasks("aboutme", aboutme)}
        errorMessage={errors.aboutme?.errorMessage}
        hasError={errors.aboutme?.hasError}
        {...getOverrideProps(overrides, "aboutme")}
      ></TextAreaField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Latest Project Name</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        placeholder="e.g. EduHost"
        value={recentprojectname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname,
              aboutme,
              recentprojectname: value,
              recentprojectdescription,
              recentprojectlink,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.recentprojectname ?? value;
          }
          if (errors.recentprojectname?.hasError) {
            runValidationTasks("recentprojectname", value);
          }
          setRecentprojectname(value);
        }}
        onBlur={() =>
          runValidationTasks("recentprojectname", recentprojectname)
        }
        errorMessage={errors.recentprojectname?.errorMessage}
        hasError={errors.recentprojectname?.hasError}
        {...getOverrideProps(overrides, "recentprojectname")}
      ></TextField>
      <TextAreaField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Latest Project Description</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname,
              aboutme,
              recentprojectname,
              recentprojectdescription: value,
              recentprojectlink,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.recentprojectdescription ?? value;
          }
          if (errors.recentprojectdescription?.hasError) {
            runValidationTasks("recentprojectdescription", value);
          }
          setRecentprojectdescription(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "recentprojectdescription",
            recentprojectdescription
          )
        }
        errorMessage={errors.recentprojectdescription?.errorMessage}
        hasError={errors.recentprojectdescription?.hasError}
        {...getOverrideProps(overrides, "recentprojectdescription")}
      ></TextAreaField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Latest Project URL</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        value={recentprojectlink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname,
              aboutme,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink: value,
              emailaddress,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.recentprojectlink ?? value;
          }
          if (errors.recentprojectlink?.hasError) {
            runValidationTasks("recentprojectlink", value);
          }
          setRecentprojectlink(value);
        }}
        onBlur={() =>
          runValidationTasks("recentprojectlink", recentprojectlink)
        }
        errorMessage={errors.recentprojectlink?.errorMessage}
        hasError={errors.recentprojectlink?.hasError}
        {...getOverrideProps(overrides, "recentprojectlink")}
      ></TextField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Email Address</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        value={emailaddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname,
              aboutme,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink,
              emailaddress: value,
              linkedinurl,
            };
            const result = onChange(modelFields);
            value = result?.emailaddress ?? value;
          }
          if (errors.emailaddress?.hasError) {
            runValidationTasks("emailaddress", value);
          }
          setEmailaddress(value);
        }}
        onBlur={() => runValidationTasks("emailaddress", emailaddress)}
        errorMessage={errors.emailaddress?.errorMessage}
        hasError={errors.emailaddress?.hasError}
        {...getOverrideProps(overrides, "emailaddress")}
      ></TextField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>LinkedIn URL</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        value={linkedinurl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              template,
              colour,
              fullname,
              aboutme,
              recentprojectname,
              recentprojectdescription,
              recentprojectlink,
              emailaddress,
              linkedinurl: value,
            };
            const result = onChange(modelFields);
            value = result?.linkedinurl ?? value;
          }
          if (errors.linkedinurl?.hasError) {
            runValidationTasks("linkedinurl", value);
          }
          setLinkedinurl(value);
        }}
        onBlur={() => runValidationTasks("linkedinurl", linkedinurl)}
        errorMessage={errors.linkedinurl?.errorMessage}
        hasError={errors.linkedinurl?.hasError}
        {...getOverrideProps(overrides, "linkedinurl")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Build!"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

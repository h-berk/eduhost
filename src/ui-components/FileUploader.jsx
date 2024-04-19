/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  fetchByPath,
  getOverrideProps,
  processFile,
  validateField,
} from "./utils";
import { Field } from "@aws-amplify/ui-react/internal";
export default function FileUploader(props) {
  const { onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    file: undefined,
  };
  const [file, setFile] = React.useState(initialValues.file);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFile(initialValues.file);
    setErrors({});
  };
  const validations = {
    file: [{ type: "Required" }],
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
          file,
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
      {...getOverrideProps(overrides, "FileUploader")}
      {...rest}
    >
      <Field
        errorMessage={errors.file?.errorMessage}
        hasError={errors.file?.hasError}
        label={"Website Deployer"}
        descriptiveText={
          "*Please note EduHost only supports index.html files with inbuilt CSS as of now"
        }
        isRequired={true}
      >
        <StorageManager
          onUploadSuccess={({ key }) => {
            setFile((prev) => {
              let value = key;
              if (onChange) {
                const modelFields = {
                  file: value,
                };
                const result = onChange(modelFields);
                value = result?.file ?? value;
              }
              return value;
            });
          }}
          onFileRemove={({ key }) => {
            setFile((prev) => {
              let value = initialValues?.file;
              if (onChange) {
                const modelFields = {
                  file: value,
                };
                const result = onChange(modelFields);
                value = result?.file ?? value;
              }
              return value;
            });
          }}
          processFile={processFile}
          accessLevel={"public"}
          acceptedFileTypes={[".html"]}
          isResumable={false}
          showThumbnails={true}
          maxFileCount={1}
          {...getOverrideProps(overrides, "file")}
        ></StorageManager>
      </Field>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Deploy"
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

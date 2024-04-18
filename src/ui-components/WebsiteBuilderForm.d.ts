/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WebsiteBuilderFormInputValues = {
    template?: string;
    colour?: string;
    fullname?: string;
    aboutme?: string;
    recentprojectname?: string;
    recentprojectdescription?: string;
    recentprojectlink?: string;
    emailaddress?: string;
    linkedinurl?: string;
};
export declare type WebsiteBuilderFormValidationValues = {
    template?: ValidationFunction<string>;
    colour?: ValidationFunction<string>;
    fullname?: ValidationFunction<string>;
    aboutme?: ValidationFunction<string>;
    recentprojectname?: ValidationFunction<string>;
    recentprojectdescription?: ValidationFunction<string>;
    recentprojectlink?: ValidationFunction<string>;
    emailaddress?: ValidationFunction<string>;
    linkedinurl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WebsiteBuilderFormOverridesProps = {
    WebsiteBuilderFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<SelectFieldProps>;
    colour?: PrimitiveOverrideProps<SelectFieldProps>;
    fullname?: PrimitiveOverrideProps<TextFieldProps>;
    aboutme?: PrimitiveOverrideProps<TextAreaFieldProps>;
    recentprojectname?: PrimitiveOverrideProps<TextFieldProps>;
    recentprojectdescription?: PrimitiveOverrideProps<TextAreaFieldProps>;
    recentprojectlink?: PrimitiveOverrideProps<TextFieldProps>;
    emailaddress?: PrimitiveOverrideProps<TextFieldProps>;
    linkedinurl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WebsiteBuilderFormProps = React.PropsWithChildren<{
    overrides?: WebsiteBuilderFormOverridesProps | undefined | null;
} & {
    onSubmit: (fields: WebsiteBuilderFormInputValues) => void;
    onChange?: (fields: WebsiteBuilderFormInputValues) => WebsiteBuilderFormInputValues;
    onValidate?: WebsiteBuilderFormValidationValues;
} & React.CSSProperties>;
export default function WebsiteBuilderForm(props: WebsiteBuilderFormProps): React.ReactElement;

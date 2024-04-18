/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps } from "@aws-amplify/ui-react";
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
export declare type TemplateChooserFormInputValues = {
    template?: string;
};
export declare type TemplateChooserFormValidationValues = {
    template?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TemplateChooserFormOverridesProps = {
    TemplateChooserFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TemplateChooserFormProps = React.PropsWithChildren<{
    overrides?: TemplateChooserFormOverridesProps | undefined | null;
} & {
    onSubmit: (fields: TemplateChooserFormInputValues) => void;
    onChange?: (fields: TemplateChooserFormInputValues) => TemplateChooserFormInputValues;
    onValidate?: TemplateChooserFormValidationValues;
} & React.CSSProperties>;
export default function TemplateChooserForm(props: TemplateChooserFormProps): React.ReactElement;

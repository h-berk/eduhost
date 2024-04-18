/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
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
export declare type FileUploaderInputValues = {
    data?: string;
};
export declare type FileUploaderValidationValues = {
    data?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FileUploaderOverridesProps = {
    FileUploaderGrid?: PrimitiveOverrideProps<GridProps>;
    data?: PrimitiveOverrideProps<StorageManagerProps>;
} & EscapeHatchProps;
export declare type FileUploaderProps = React.PropsWithChildren<{
    overrides?: FileUploaderOverridesProps | undefined | null;
} & {
    onSubmit: (fields: FileUploaderInputValues) => void;
    onChange?: (fields: FileUploaderInputValues) => FileUploaderInputValues;
    onValidate?: FileUploaderValidationValues;
} & React.CSSProperties>;
export default function FileUploader(props: FileUploaderProps): React.ReactElement;

import { InputHTMLAttributes } from "react"
import {useField} from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    label: string,
};
export const InputField: React.FC<InputFieldProps>=({label,size, ...props})=>{ 
    const [field, {error}] = useField(props);
    return <>
    <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input {...field} {...props}  id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
    </>
}
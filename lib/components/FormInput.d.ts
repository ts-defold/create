import React from 'react';
import TextInput from 'ink-text-input';
declare type Props = React.ComponentProps<typeof TextInput> & {
    onFocus?: () => void;
    onBlur?: () => void;
};
export default function FormInput({ onFocus, onBlur, ...props }: Props): JSX.Element;
export {};

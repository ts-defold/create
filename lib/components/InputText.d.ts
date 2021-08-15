import React from 'react';
import TextInput from 'ink-text-input';
declare type Props = React.ComponentProps<typeof TextInput> & {
    onFocus?: () => void;
    onBlur?: () => void;
};
export default function InputText({ onFocus, onBlur, ...props }: Props): JSX.Element;
export {};

import React, { useEffect } from 'react';
import TextInput from 'ink-text-input';

type Props = React.ComponentProps<typeof TextInput> & {
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function FormInput({
  onFocus,
  onBlur,
  ...props
}: Props): JSX.Element {
  useEffect(() => {
    onFocus?.();
    return onBlur?.();
  }, [onFocus, onBlur]);

  return <TextInput {...props} showCursor />;
}

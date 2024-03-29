import { Box, Text } from 'ink';
import React from 'react';

type Props = React.PropsWithChildren<unknown>;

export default function FormError({ children }: Props): JSX.Element {
  return (
    <Box>
      <Text color="red">{children}</Text>
    </Box>
  );
}

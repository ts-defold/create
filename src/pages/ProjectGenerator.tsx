import { Box, Text } from 'ink';
import React from 'react';
import { useArgs, useData } from '../components/Router';

export default function ProjectGenerator(): JSX.Element {
  const [template] = useArgs();
  const { dir } = useData() as { dir: string };

  return (
    <Box paddingTop={1} flexDirection="column" alignItems="center">
      <Box
        flexDirection="column"
        alignItems="center"
        borderStyle="bold"
        borderColor="magentaBright"
        flexGrow={1}
        paddingX={1}
      >
        <Text color="greenBright">Project Generator</Text>
        <Text color="cyanBright">Template: {template}</Text>
        <Text color="yellowBright">Path: {dir}</Text>
      </Box>
    </Box>
  );
}

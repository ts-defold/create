import { Box, Text } from 'ink';
import React from 'react';
import Markdown from '../../components/Markdown';

type Props = {
  project: string;
};

export default function ProjectReady({ project }: Props): JSX.Element {
  return (
    <Box paddingTop={1} flexDirection="column">
      <Text>🚀 Your project is ready to go!</Text>
      <Box paddingTop={1} flexDirection="column">
        <Text>Next Steps:</Text>
        <Box paddingLeft={2} flexDirection="column">
          <Markdown>{`cd *${project}*`}</Markdown>
          <Markdown>**npm** run dev</Markdown>
          <Markdown>Open *app/game.project* in the Defold editor.</Markdown>
        </Box>
        <Box width={46} alignItems="center" flexDirection="column">
          <Box paddingTop={1} flexDirection="row">
            <Text>TypeScript </Text>
            <Text color="red">❤️ </Text>
            <Text> Defold</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

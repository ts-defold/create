import { Box, Text } from 'ink';
import React, { useEffect } from 'react';
import type { WizardSteps } from '../../components/Wizard';
import Markdown from '../../components/Markdown';

type Props = WizardSteps & {
  project: string;
};

export default function ProjectReady({
  project,
  active,
  onCompletion,
}: Props): JSX.Element {
  useEffect(() => {
    if (active) onCompletion?.(true);
  }, [active, onCompletion]);

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

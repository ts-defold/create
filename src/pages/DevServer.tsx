import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import React from 'react';

export default function DevServer(): JSX.Element {
  return (
    <Box paddingTop={1} flexDirection="column">
      <Text>
        <Text color="cyanBright">
          <Spinner type="hamburger" />
        </Text>
        {'  Watching for changes'}
      </Text>
      <Box flexDirection="column" marginTop={1}>
        <Box>
          <Text color="green">./src/player.script.ts</Text>
          <Text color="gray"> [1.3 Kb] (21ms)</Text>
        </Box>
        <Box>
          <Text color="green">./src/orbit.script.ts</Text>
          <Text color="gray"> [1.3 Kb] (21ms)</Text>
        </Box>
        <Box>
          <Text color="yellow">./src/hooks.editor_script.ts</Text>
          <Text color="gray">
            {' '}
            <Spinner type="simpleDots" />
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

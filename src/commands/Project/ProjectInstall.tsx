import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { WizardSteps } from '../../components/Wizard';
import useDependencyInstall from '../../hooks/useDependencyInstall';

type Props = WizardSteps & {
  dir: string;
};

export default function ProjectInstall({
  dir,
  active,
  onCompletion,
}: Props): JSX.Element {
  const install = useDependencyInstall(dir);

  useEffect(() => {
    if (active) {
      if (install.complete) {
        onCompletion?.(true);
      } else if (install.errors.length > 0) {
        onCompletion?.(false);
      }
    }
  }, [install, active, onCompletion]);

  if (install.isLoading) {
    return (
      <Box flexDirection="row">
        <Text>
          <Text color="cyanBright">
            <Spinner type="hamburger" />
          </Text>{' '}
          Installing dependencies{' '}
          {install.progress && <Text color="grey">{install.progress}</Text>}
        </Text>
      </Box>
    );
  } else if (install.errors.length > 0) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="red">𐄂</Text> Dependency installation failed!
        </Text>
        <Text color="red">
          {'  '}
          {install.errors.join('\n  ')}
        </Text>
      </Box>
    );
  }

  return (
    <Text>
      <Text color="green">✓</Text> Installed dependencies
    </Text>
  );
}

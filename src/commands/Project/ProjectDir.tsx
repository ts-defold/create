import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { WizardSteps } from '../../components/Wizard';
import type { ProjectDirInfo } from '../../hooks/useProjectDir';

type Props = WizardSteps & {
  project: ProjectDirInfo;
};

export default function ProjectDir({
  project,
  active,
  onCompletion,
}: Props): JSX.Element {
  useEffect(() => {
    if (active && !project.isLoading) {
      if (project.exists || !project.isEmpty) {
        onCompletion?.(false);
      } else {
        onCompletion?.(true);
      }
    }
  }, [project, active, onCompletion]);

  //* Check if project directory is valid
  if (project.isLoading) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="cyanBright">
            <Spinner type="hamburger" />
          </Text>{' '}
          Checking project directory
        </Text>
      </Box>
    );
  } else if (project.exists || !project.isEmpty) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="red">𐄂</Text> Project directory at{' '}
          <Text color="red">{project.relativePath || '.'}</Text> already exists!
        </Text>
        <Text color="grey">
          Please choose an empty or new directory for your project.
        </Text>
      </Box>
    );
  }

  //* Project directory is valid
  return (
    <Text>
      <Text color="green">✓</Text> Creating new project in{' '}
      <Text color="green">{project.relativePath}</Text>
    </Text>
  );
}

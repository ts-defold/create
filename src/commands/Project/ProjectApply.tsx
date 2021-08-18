import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { ProjectConfigValues } from './ProjectConfig';
import type { WizardSteps } from '../../components/Wizard';
import useProjectApply from '../../hooks/useProjectApply';

type Props = WizardSteps & {
  dir: string;
  config: ProjectConfigValues;
};

export default function ProjectApply({
  dir,
  config,
  active,
  onCompletion,
}: Props): JSX.Element {
  const apply = useProjectApply(dir, config);

  useEffect(() => {
    if (active && !apply.isLoading) {
      if (apply.error) {
        onCompletion?.(false);
      } else if (apply.complete) {
        onCompletion?.(true);
      }
    }
  }, [apply, active]);

  if (apply.isLoading) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="cyanBright">
            <Spinner type="hamburger" />
          </Text>{' '}
          Applying project configuration
        </Text>
      </Box>
    );
  } else if (apply.error) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="red">𐄂</Text> Project configuration failed!
        </Text>
        <Text color="red">
          {'  '}
          {apply.error}
        </Text>
      </Box>
    );
  }

  return (
    <Text>
      <Text color="green">✓</Text> Applied project configuration
    </Text>
  );
}

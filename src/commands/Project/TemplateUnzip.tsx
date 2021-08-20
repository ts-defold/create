import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { WizardSteps } from '../../components/Wizard';
import useUnzip from '../../hooks/useUnzip';

type Props = WizardSteps & {
  src: string;
  dest: string;
  remove?: boolean;
};

export default function TemplateUnzip({
  src,
  dest,
  remove,
  active,
  onCompletion,
}: Props): JSX.Element {
  const unzip = useUnzip(src, dest, remove);

  useEffect(() => {
    if (active) {
      if (unzip.complete) {
        onCompletion?.(true);
      } else if (unzip.error) {
        onCompletion?.(false);
      }
    }
  }, [unzip, active, onCompletion]);

  if (unzip.isLoading) {
    return (
      <Box flexDirection="row">
        <Text>
          <Text color="cyanBright">
            <Spinner type="hamburger" />
          </Text>{' '}
          Extracting template{' '}
          {unzip.progress && <Text color="grey">{unzip.progress}</Text>}
        </Text>
      </Box>
    );
  } else if (unzip.error) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="red">𐄂</Text> Template extraction failed!
        </Text>
        <Text color="red">
          {'  '}
          {unzip.error}
        </Text>
      </Box>
    );
  }

  return (
    <Text>
      <Text color="green">✓</Text> Extracted template archive
    </Text>
  );
}

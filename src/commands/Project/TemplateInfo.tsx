import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import React from 'react';
import Markdown from '../../components/Markdown';
import type { WizardSteps } from '../../components/Wizard';
import type { TemplateInfo } from '../../hooks/useFetchTemplate';

type Props = WizardSteps & {
  template: TemplateInfo;
};

export default function TemplateInfo({
  template,
  active,
  onCompletion,
}: Props): JSX.Element {
  //* Check to see if template is valid
  if (template.isLoading) {
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="cyanBright">
            <Spinner type="hamburger" />
          </Text>{' '}
          Getting Template Info
        </Text>
      </Box>
    );
  } else if (!template.found) {
    if (active) onCompletion?.(false);
    return (
      <Box flexDirection="column">
        <Text>
          <Text color="red">𐄂</Text> The template{' '}
          <Text color="red">{template}</Text> was not found!
        </Text>
        {template.match ? (
          <Text color="grey">
            Are you looking for <Text color="yellow">{template.match}</Text>{' '}
            instead?
          </Text>
        ) : (
          <Markdown>
            `Try:` https://github.com/search?q=tsd-template&type=repositories
          </Markdown>
        )}
      </Box>
    );
  }

  //* Template is valid
  if (active) onCompletion?.(true);
  return (
    <Text>
      <Text color="green">✓</Text> Using project template{' '}
      <Text color="green">{template.name}</Text>
    </Text>
  );
}

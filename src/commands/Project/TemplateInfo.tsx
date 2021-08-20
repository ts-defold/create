import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
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
  useEffect(() => {
    if (active && !template.isLoading) {
      onCompletion?.(template.found);
    }
  }, [template, active, onCompletion]);

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
    if (template.rate) {
      return (
        <Text>
          <Text color="red">𐄂</Text> The api is rate limited, try again in{' '}
          <Text color="yellow">{Math.ceil(template.rate / 60)}</Text>{' '}
          {Math.ceil(template.rate / 60) > 1 ? 'minutes' : 'minute'}
        </Text>
      );
    } else {
      return (
        <Box flexDirection="column">
          <Text>
            <Text color="red">𐄂</Text> The template{' '}
            <Text color="red">{template.name}</Text> was not found!
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
  }

  //* Template is valid
  return (
    <Text>
      <Text color="green">✓</Text> Using project template{' '}
      <Text color="green">{template.name}</Text>
    </Text>
  );
}

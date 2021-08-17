import React, { useMemo, useState } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { Form, Field } from 'react-final-form';
import semver from 'semver';
import FormInput from '../../components/FormInput';
import FormError from '../../components/FormError';
import type { WizardSteps } from '../../components/Wizard';
import type { ProjectDirInfo } from '../../hooks/useProjectDir';

type Props = WizardSteps & {
  author: string;
  email: string;
  project: ProjectDirInfo;
  onConfigured?: (values: ProjectConfigValues) => void;
};

export type ProjectConfigValues = {
  name: string;
  version: string;
  description: string;
  author: string;
};

export default function ProjectConfig({
  author,
  email,
  project,
  active,
  onConfigured,
  onCompletion,
}: Props): JSX.Element {
  const [activeField, setActiveField] = useState(0);

  const fields = useMemo(() => {
    return [
      {
        name: 'name',
        label: 'Project Name',
        validate: (value: string) => {
          if (!value) {
            return 'Required';
          }
        },
        format: (value: string) =>
          value
            ? value
                .toLowerCase()
                .replace(/[^a-z \\-]/g, '')
                .replace(/ /g, '-')
            : '',
        placeholder: project.name || 'my-awesome-game',
      },
      {
        name: 'version',
        label: 'Version',
        placeholder: '0.1.0',
        format: (value: string) =>
          value === undefined ? '' : value.replace(/[^0-9.]/g, ''),
        validate: (value: string) =>
          !value
            ? 'Required'
            : semver.valid(value)
            ? undefined
            : 'Invalid semantic version',
      },
      {
        name: 'description',
        label: 'Description',
        placeholder: `My Awesome ${
          games[Math.trunc(Math.random() * games.length - 1)]
        } Game!`,
        format: (value: string) => (value === undefined ? '' : value),
        validate: (value: string) => (!value ? 'Required' : undefined),
      },
      {
        name: 'author',
        label: 'Author',
        placeholder: author + (email ? ` <${email}>` : ''),
        format: (value: string) => (value === undefined ? '' : value),
        validate: (value: string) => (!value ? 'Required' : undefined),
      },
    ];
  }, [author, email, project]);

  const onSubmit = (values: ProjectConfigValues) => {
    onConfigured?.(values);
    if (active) onCompletion?.(true);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        ...fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
      }}
      render={({ handleSubmit }) => (
        <Box flexDirection="column">
          {fields.map(
            ({ name, label, placeholder, format, validate }, index) => (
              <Field name={name} key={name} format={format} validate={validate}>
                {({ input, meta }) => (
                  <Box flexDirection="column">
                    <Box>
                      <Text bold={activeField === index}>
                        <Text
                          color={
                            meta.error && !meta.pristine
                              ? 'red'
                              : meta.valid
                              ? 'green'
                              : 'cyanBright'
                          }
                        >
                          {activeField === index
                            ? '❯ '
                            : meta.touched
                            ? '✓ '
                            : '  '}
                        </Text>
                        {`${label}: `}
                      </Text>
                      {activeField === index ? (
                        <FormInput
                          {...input}
                          tabComplete
                          placeholder={placeholder}
                          onSubmit={() => {
                            if (meta.valid && !meta.validating) {
                              setActiveField((value) => value + 1);
                              if (activeField === fields.length - 1) {
                                handleSubmit();
                              }
                            }
                          }}
                        />
                      ) : (
                        <Text
                          color={
                            !meta.touched || !input.value ? 'gray' : undefined
                          }
                        >
                          {input.value || placeholder}
                        </Text>
                      )}
                      {meta.validating && name === 'name' && (
                        <Box marginLeft={1}>
                          <Text color="yellow">
                            <Spinner type="dots" />
                          </Text>
                        </Box>
                      )}
                    </Box>
                    {meta.error && meta.touched && !meta.pristine && (
                      <Box paddingLeft={2}>
                        <FormError>{meta.error}</FormError>
                      </Box>
                    )}
                  </Box>
                )}
              </Field>
            )
          )}
        </Box>
      )}
    />
  );
}

const games = [
  'RPG',
  'SHMUP',
  'FPS',
  'Platformer',
  'Tower Defense',
  'Puzzle',
  'Racing',
  'Action',
  'Adventure',
  'Strategy',
  'Simulation',
  'MMORPG',
  'Battle Royal',
];

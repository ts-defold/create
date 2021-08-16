import React, { useState, useMemo } from 'react';
import { Box, Text, useApp } from 'ink';
import Spinner from 'ink-spinner';
import { useParams, useHistory } from 'react-router';
import { Form, Field } from 'react-final-form';
import semver from 'semver';
import InputText from '../../components/InputText';
import InputError from '../../components/InputError';
import Markdown from '../../components/Markdown';
import { Wizard, Step } from '../../components/Wizard';
import useGitConfig from '../../hooks/useGitConfig';
import useProjectDir from '../../hooks/useProjectDir';
import useFetchTemplate from '../../hooks/useFetchTemplate';

type Values = {
  project?: string;
  version?: string;
};

const games = [
  'RPG',
  'Shmup',
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
];

type Props = {
  dir: string;
  template: string;
};

export default function Project({ dir, template }: Props): JSX.Element {
  const [activeField, setActiveField] = useState(0);
  const [projectConfigured, setProjectConfigured] = useState(false);
  const { step } = useParams<{ step?: string }>();
  const history = useHistory();
  const { exit } = useApp();
  const { user: author, email } = useGitConfig();
  const project = useProjectDir(dir);
  const archive = useFetchTemplate(template);

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

  const onSubmit = async (values: Values) => {
    function timeout(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    void values;
    // TODO: Fetch template archive, extract, and use values to update package.json
    setProjectConfigured(true);
    for (let i = 1; i <= 4; i++) {
      await timeout(1000);
      history.push(`/project/${i}`);
    }
    setTimeout(() => exit(), 3000);
  };

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
          {'  '}Please choose an empty or new directory for your project.
        </Text>
      </Box>
    );
  }
  const Project = () => (
    <Text>
      <Text color="green">✓</Text> Creating new project in{' '}
      <Text color="green">{project.relativePath}</Text>
    </Text>
  );

  //* Check to see if template is valid
  if (archive.isLoading) {
    return (
      <Box flexDirection="column">
        <Project />
        <Text>
          <Text color="cyanBright">
            <Spinner type="hamburger" />
          </Text>{' '}
          Getting Template Info
        </Text>
      </Box>
    );
  } else if (!archive.found) {
    return (
      <Box flexDirection="column">
        <Project />
        <Text>
          <Text color="red">𐄂</Text> The template{' '}
          <Text color="red">{template}</Text> was not found!
        </Text>
        {archive.match ? (
          <Text color="grey">
            Are you looking for <Text color="yellow">{archive.match}</Text>{' '}
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
  const Template = () => (
    <Text>
      <Text color="green">✓</Text> Using project template{' '}
      <Text color="green">{archive.name}</Text>
    </Text>
  );

  return (
    <Box flexDirection="column">
      <Project />
      <Template />
      <Form
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
        onSubmit={onSubmit}
        initialValues={{
          ...fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
        }}
        render={({ handleSubmit }) => (
          <Box flexDirection="column">
            {fields.map(
              ({ name, label, placeholder, format, validate }, index) => (
                <Field
                  name={name}
                  key={name}
                  format={format}
                  validate={validate}
                >
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
                          <InputText
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
                          <InputError>{meta.error}</InputError>
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
      {projectConfigured && (
        <Wizard step={step ? parseInt(step) : -1}>
          <Step index={1} name="Download Template">
            <Text>
              <Text color="cyanBright">
                <Spinner type="hamburger" />
              </Text>{' '}
              Downloading template
            </Text>
          </Step>
          <Step index={2} name="Extract Template">
            <Text>
              <Text color="red">𐄂</Text> Extracting template
            </Text>
          </Step>
          <Step index={3} name="Apply Config">
            <Text>
              <Text color="red">𐄂</Text> Applying Configuration
            </Text>
          </Step>
          <Step index={4} name="Init Git">
            <Text>
              <Text color="red">𐄂</Text> Initializing Git Repository
            </Text>
          </Step>
        </Wizard>
      )}
    </Box>
  );
}

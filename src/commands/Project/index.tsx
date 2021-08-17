import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { useParams, useHistory } from 'react-router';
import ProjectConfig, { ProjectConfigValues } from './ProjectConfig';
import ProjectDir from './ProjectDir';
import TemplateInfo from './TemplateInfo';
import DownloadTemplate from './DownloadTemplate';
import ExtractTemplate from './ExtractTemplate';
import { Wizard, Step } from '../../components/Wizard';
import useGitConfig from '../../hooks/useGitConfig';
import useProjectDir from '../../hooks/useProjectDir';
import useFetchTemplate from '../../hooks/useFetchTemplate';

type Props = {
  dir: string;
  template: string;
};

export default function Project({ dir, template }: Props): JSX.Element {
  const [config, setConfig] = useState<ProjectConfigValues>();
  const [archivePath, setArchivePath] = useState<string>();
  const history = useHistory();
  const { exit } = useApp();
  const { step } = useParams<{ step?: string }>();
  const currentStep = step ? parseInt(step) : 0;

  const { user: author, email } = useGitConfig();
  const project = useProjectDir(dir);
  const templateInfo = useFetchTemplate(template);

  const onWizardNext = (success: boolean) => {
    if (success) {
      history.push(`/project/${currentStep + 1}`);
    } else {
      exit();
    }
  };

  // TODO: Use project config values
  void config;

  return (
    <Box flexDirection="column">
      <Wizard step={currentStep}>
        <Step index={0} name="Project Directory">
          <ProjectDir project={project} onCompletion={onWizardNext} />
        </Step>
        <Step index={1} name="Template Info">
          <TemplateInfo template={templateInfo} onCompletion={onWizardNext} />
        </Step>
        <Step index={2} name="Project Configuration">
          <ProjectConfig
            author={author}
            email={email}
            project={project}
            onConfigured={(v) => setConfig(v)}
            onCompletion={onWizardNext}
          />
        </Step>
        <Step index={3} name="Download Template">
          <DownloadTemplate
            url={templateInfo.url}
            onDownloaded={(f) => setArchivePath(f)}
            onCompletion={onWizardNext}
          />
        </Step>
        <Step index={4} name="Extract Template">
          {archivePath && <ExtractTemplate src={archivePath} dest={dir} />}
        </Step>
        <Step index={5} name="Apply Config">
          <Text>
            <Text color="red">𐄂</Text> Applying Configuration
          </Text>
        </Step>
        <Step index={6} name="Init Git">
          <Text>
            <Text color="red">𐄂</Text> Initializing Git Repository
          </Text>
        </Step>
      </Wizard>
    </Box>
  );
}

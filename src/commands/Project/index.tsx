import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { useParams, useHistory } from 'react-router';
import ProjectApply from './ProjectApply';
import ProjectConfig, { ProjectConfigValues } from './ProjectConfig';
import ProjectDir from './ProjectDir';
import ProjectInstall from './ProjectInstall';
import TemplateInfo from './TemplateInfo';
import TemplateDownload from './TemplateDownload';
import TemplateUnzip from './TemplateUnzip';
import { Wizard, Step } from '../../components/Wizard';
import useGitConfig from '../../hooks/useGitConfig';
import useProjectDir from '../../hooks/useProjectDir';
import useFetchTemplate from '../../hooks/useFetchTemplate';
import path from 'path';

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
    if (currentStep == 7) exit();

    if (success) {
      history.push(`/project/${currentStep + 1}`);
    } else {
      exit(new Error());
    }
  };

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
          <TemplateDownload
            url={templateInfo.url}
            onDownloaded={(f) => setArchivePath(f)}
            onCompletion={onWizardNext}
          />
        </Step>
        <Step index={4} name="Extract Template">
          {archivePath && (
            <TemplateUnzip
              src={archivePath}
              dest={dir}
              onCompletion={onWizardNext}
            />
          )}
        </Step>
        <Step index={5} name="Apply Config">
          {config && (
            <ProjectApply
              dir={dir}
              config={config}
              onCompletion={onWizardNext}
            />
          )}
        </Step>
        <Step index={6} name="Install Dependencies">
          <ProjectInstall dir={dir} onCompletion={onWizardNext} />
        </Step>
        <Step index={7} name="Next Steps">
          <Text>cd {project.relativePath}</Text>
          <Text>npm run dev</Text>
          <Text>Open app/game.project in Defold</Text>
        </Step>
      </Wizard>
    </Box>
  );
}

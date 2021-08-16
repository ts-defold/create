/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
import type { ProjectDirInfo } from '../../hooks/useProjectDir';
declare type Props = WizardSteps & {
    project: ProjectDirInfo;
};
export default function ProjectDir({ project, active, onCompletion, }: Props): JSX.Element;
export {};

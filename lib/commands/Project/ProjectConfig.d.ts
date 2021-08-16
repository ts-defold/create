/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
import type { ProjectDirInfo } from '../../hooks/useProjectDir';
declare type Props = WizardSteps & {
    author: string;
    email: string;
    project: ProjectDirInfo;
    onConfigured?: (values: ProjectConfigValues) => void;
};
export declare type ProjectConfigValues = {
    name: string;
    version: string;
    description: string;
    author: string;
};
export default function ProjectConfig({ author, email, project, active, onConfigured, onCompletion, }: Props): JSX.Element;
export {};

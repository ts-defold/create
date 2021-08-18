/// <reference types="react" />
import type { ProjectConfigValues } from './ProjectConfig';
import type { WizardSteps } from '../../components/Wizard';
declare type Props = WizardSteps & {
    dir: string;
    config: ProjectConfigValues;
};
export default function ProjectApply({ dir, config, active, onCompletion, }: Props): JSX.Element;
export {};

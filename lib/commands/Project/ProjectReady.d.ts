/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
declare type Props = WizardSteps & {
    project: string;
};
export default function ProjectReady({ project, active, onCompletion, }: Props): JSX.Element;
export {};

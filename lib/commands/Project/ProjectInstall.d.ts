/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
declare type Props = WizardSteps & {
    dir: string;
};
export default function ProjectInstall({ dir, active, onCompletion, }: Props): JSX.Element;
export {};

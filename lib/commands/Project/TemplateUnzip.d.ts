/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
declare type Props = WizardSteps & {
    src: string;
    dest: string;
    remove?: boolean;
};
export default function TemplateUnzip({ src, dest, remove, active, onCompletion, }: Props): JSX.Element;
export {};

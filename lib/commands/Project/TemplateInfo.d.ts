/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
import type { TemplateInfo } from '../../hooks/useFetchTemplate';
declare type Props = WizardSteps & {
    template: TemplateInfo;
};
export default function TemplateInfo({ template, active, onCompletion, }: Props): JSX.Element;
export {};

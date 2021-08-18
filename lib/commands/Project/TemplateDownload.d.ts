/// <reference types="react" />
import type { WizardSteps } from '../../components/Wizard';
declare type Props = WizardSteps & {
    url: string;
    onDownloaded?: (file: string) => void;
};
export default function TemplateDownload({ url, active, onDownloaded, onCompletion, }: Props): JSX.Element;
export {};

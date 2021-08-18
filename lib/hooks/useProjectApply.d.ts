export declare type ProjectApplyInfo = {
    isLoading: boolean;
    complete: boolean;
    error: string;
};
declare type ConfigValues = {
    name: string;
    version: string;
    description: string;
    author: string;
};
export default function useProjectApply(dir: string, config: ConfigValues): ProjectApplyInfo;
export {};

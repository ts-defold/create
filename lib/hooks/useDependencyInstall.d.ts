export declare type InstallInfo = {
    isLoading: boolean;
    complete: boolean;
    progress: string;
    errors: string[];
};
export default function useDependencyInstall(dir: string): InstallInfo;

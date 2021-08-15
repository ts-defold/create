declare type Return = {
    isLoading: boolean;
    exists: boolean;
    isEmpty: boolean;
    relativePath: string;
    name: string;
};
export default function useProjectDir(dir: string): Return;
export {};

declare type Return = {
    isLoading: boolean;
    exists: boolean;
    isEmpty: boolean;
    relativePath: string;
    name: string;
};
export default function useVerifyProjectDir(dir: string, timeout?: number): Return;
export {};

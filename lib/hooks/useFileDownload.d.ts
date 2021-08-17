export declare type FileInfo = {
    isLoading: boolean;
    complete: boolean;
    error: string;
    url: string;
    file: string;
    progress: number;
    total: number;
};
export default function useFileDownload(url: string, file?: string): FileInfo;

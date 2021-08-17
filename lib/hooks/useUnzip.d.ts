export declare type UnzipInfo = {
    isLoading: boolean;
    complete: boolean;
    error: string;
    src: string;
    dest: string;
    progress: string;
};
export default function useUnzip(src: string, dest?: string, cleanup?: boolean): UnzipInfo;

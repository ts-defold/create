declare type Return = {
    isLoading: boolean;
    found: boolean;
    match: string;
    archive: string;
    name: string;
};
export default function useTemplate(template: string, delay?: number): Return;
export {};

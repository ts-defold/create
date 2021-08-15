declare type Return = {
    isLoading: boolean;
    found: boolean;
    match: string;
    url: string;
    name: string;
    rate?: number;
};
export default function useFetchTemplate(template: string): Return;
export {};

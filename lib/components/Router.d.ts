import React from 'react';
declare type Props = {
    children?: React.ReactElement<{
        path?: string;
    }>[];
    route?: string;
    data?: unknown;
};
export declare function Switch({ children, route, data }: Props): JSX.Element | null;
export declare function Route({ children, }: React.PropsWithChildren<{
    path?: string;
}>): JSX.Element;
export declare function useArgs(): string[];
export declare function useData(): unknown;
export {};

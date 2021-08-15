import React from 'react';
declare type Props = React.PropsWithChildren<{
    step: number;
    exclusive?: boolean;
}>;
export declare function Wizard({ children, step, exclusive, }: Props): JSX.Element | null;
declare type StepProps = React.PropsWithChildren<{
    index: number;
    name?: string;
    active?: boolean;
    complete?: boolean;
}>;
export declare function Step({ children, active, complete }: StepProps): JSX.Element;
export {};

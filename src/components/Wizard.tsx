import React from 'react';
//import { Static } from 'ink';

type Props = React.PropsWithChildren<{
  step: number;
  exclusive?: boolean;
}>;

export function Wizard({
  children,
  step,
  exclusive,
}: Props): JSX.Element | null {
  const matches: React.ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const tl = child.props.index ?? Number.MAX_VALUE;
      const match = exclusive
        ? tl == step
          ? child
          : null
        : tl <= step
        ? child
        : null;
      if (match) matches.push(match);
    }
  });

  if (exclusive) {
    return matches.length > 0
      ? React.cloneElement(matches[0], { step, active: true })
      : null;
  }

  return (
    <>
      {matches.map((match, index) =>
        React.cloneElement(match, {
          step,
          key: index,
          active: match.props.index == step,
          complete: match.props.index < step,
        })
      )}
    </>
  );
}

type StepProps = React.PropsWithChildren<{
  index: number;
  name?: string;
  active?: boolean;
  complete?: boolean;
}>;

export function Step({
  children,
  index,
  active,
  complete,
}: StepProps): JSX.Element {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { step: index, active, complete });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
}

export type WizardSteps = {
  step?: number;
  active?: boolean;
  complete?: boolean;
  onCompletion?: (success: boolean) => void;
};

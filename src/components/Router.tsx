import React, { createContext, useContext } from 'react';

type Props = {
  children?: React.ReactElement<{ path?: string }>[];
  route?: string;
  data?: unknown;
};

const Router = createContext<Record<string, unknown>>({});

export function Switch({ children, route, data }: Props): JSX.Element | null {
  const [, path, ...args] = route ? route.split('/') : [];

  let match: React.ReactElement | null = null;
  React.Children.forEach(children, (child) => {
    if (match == null && React.isValidElement(child)) {
      const tl = child.props?.path ?? '';
      match = tl == `/${path}` ? child : null;
    }
  });

  return (
    <Router.Provider value={{ path, args, data }}>
      {match ? React.cloneElement(match, { route }) : null}
    </Router.Provider>
  );
}

export function Route({
  children,
}: React.PropsWithChildren<{ path?: string }>): JSX.Element {
  return <>{children}</>;
}

export function useArgs(): string[] {
  return (useContext(Router)?.args as string[]) ?? [];
}

export function useData(): unknown {
  return useContext(Router)?.data ?? null;
}

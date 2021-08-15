import React, { useMemo } from 'react';
import { MemoryRouter, Switch, Route } from 'react-router';
import { Box, render } from 'ink';

import Help from './pages/Help';
import Project from './pages/Project';
import Serve from './pages/Serve';

type Props = {
  path: string;
  data?: unknown;
};

const CLI = ({ path, data }: Props) => {
  const { help, dir, template } = useMemo(() => {
    const { help, dir, template } = data as {
      help?: string;
      dir?: string;
      template?: string;
    };
    return { help: help ?? '', dir: dir ?? '', template: template ?? '' };
  }, [data]);

  return (
    <Box width={80} flexDirection="column">
      <MemoryRouter initialEntries={[path]} initialIndex={0}>
        <Switch>
          <Route path="/help">
            <Help text={help} />
          </Route>
          <Route path="/project/:step?">
            <Project dir={dir} template={template} />
          </Route>
          <Route path="/serve">
            <Serve />
          </Route>
        </Switch>
      </MemoryRouter>
    </Box>
  );
};

export default function App(path: string, data?: unknown): void {
  render(<CLI path={path} data={data} />);
}

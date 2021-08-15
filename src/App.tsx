import React from 'react';
import { Box, render } from 'ink';

import { Switch, Route } from './components/Router';
import Help from './pages/Help';
import Project from './pages/Project';
import Serve from './pages/Serve';

type Props = {
  path?: string;
  data?: unknown;
};

const CLI = ({ path, data }: Props) => {
  return (
    <Box width={80} flexDirection="column">
      <Switch route={path} data={data}>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/project">
          <Project />
        </Route>
        <Route path="/serve">
          <Serve />
        </Route>
      </Switch>
    </Box>
  );
};

export default function App(path?: string, data?: unknown): void {
  render(<CLI path={path} data={data} />);
}

import React from 'react';
import { Box, render } from 'ink';

import { Switch, Route } from './components/Router';
import Help from './pages/Help';
import ProjectGenerator from './pages/ProjectGenerator';
import DevServer from './pages/DevServer';

type Props = {
  path?: string;
  data?: unknown;
};

const Demo = ({ path, data }: Props) => {
  return (
    <>
      <Box width={80} flexDirection="column">
        <Switch route={path} data={data}>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/project-generator">
            <ProjectGenerator />
          </Route>
          <Route path="/serve">
            <DevServer />
          </Route>
        </Switch>
      </Box>
    </>
  );
};

export default function App(path?: string, data?: unknown): void {
  render(<Demo path={path} data={data} />);
}

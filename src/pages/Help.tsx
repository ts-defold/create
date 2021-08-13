import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';

import { useData } from '../components/Router';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

const GRADIENT = [
  { h: 0, s: 1, v: 1, a: 1 },
  { h: 90, s: 1, v: 1, a: 1 },
  { h: 180, s: 1, v: 1, a: 1 },
  { h: 270, s: 1, v: 1, a: 1 },
  { h: 360, s: 1, v: 1, a: 1 },
];

export default function Help(): JSX.Element {
  const [gradient, setGradient] = useState(GRADIENT);
  const { help } = useData() as { help: string };

  useEffect(() => {
    const theta = new Date().getSeconds() * 6;
    setGradient(
      GRADIENT.map((stop, index) => ({
        ...stop,
        h: (theta + index * 90) % 360,
      }))
    );
  }, []);

  return (
    <>
      <Gradient colors={gradient}>
        <BigText
          text="@TS-DEFOLD"
          font="simple3d"
          letterSpacing={0}
          space={false}
        />
      </Gradient>
      <Box flexDirection="column" paddingTop={1}>
        <Text>{help}</Text>
      </Box>
    </>
  );
}

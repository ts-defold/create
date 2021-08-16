import React from 'react';
import { Box } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import Markdown from '../components/Markdown';

const makeGradient = () => {
  const GRADIENT = [
    { h: 0, s: 1, v: 1, a: 1 },
    { h: 90, s: 1, v: 1, a: 1 },
    { h: 180, s: 1, v: 1, a: 1 },
    { h: 270, s: 1, v: 1, a: 1 },
    { h: 360, s: 1, v: 1, a: 1 },
  ];

  const theta = new Date().getSeconds() * 6;
  return GRADIENT.map((stop, index) => ({
    ...stop,
    h: (theta + index * 90) % 360,
  }));
};

type Props = {
  text: string;
};

export default function Help({ text }: Props): JSX.Element {
  return (
    <Box alignItems="center" flexDirection="column">
      <Gradient colors={makeGradient()}>
        <BigText
          text="TS-DEFOLD"
          font="simple3d"
          letterSpacing={0}
          space={false}
        />
      </Gradient>
      <Box flexDirection="column" paddingTop={1}>
        <Markdown>{text}</Markdown>
      </Box>
    </Box>
  );
}

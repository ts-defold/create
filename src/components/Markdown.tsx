import React from 'react';
import InkMarkdown from 'ink-markdown';
import chalk from 'chalk';

type Props = React.ComponentProps<typeof InkMarkdown>;

export default function Markdown({ children, ...props }: Props): JSX.Element {
  return (
    <InkMarkdown
      html={chalk.cyan}
      link={chalk.blueBright}
      strong={chalk.green}
      em={chalk.yellowBright}
      codespan={chalk.dim}
      {...props}
    >
      {children}
    </InkMarkdown>
  );
}

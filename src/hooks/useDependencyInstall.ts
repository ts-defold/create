import { useEffect, useState } from 'react';
import { spawn } from 'cross-spawn';

export type InstallInfo = {
  isLoading: boolean;
  complete: boolean;
  progress: string;
  errors: string[];
};

export default function useDependencyInstall(dir: string): InstallInfo {
  const [install, setInstall] = useState<InstallInfo>({
    isLoading: true,
    complete: false,
    progress: '',
    errors: [],
  });

  useEffect(() => {
    let output: string;
    const child = spawn(
      'npm',
      ['ci', '--no-audit', '--no-progress', '--verbose'],
      {
        cwd: dir,
        stdio: 'pipe',
      }
    );

    function process(data: Buffer) {
      output += data.toString();
      const lines = output.split('\n');
      if (!output.endsWith('\n')) output = lines.pop() ?? '';
      const module = lines
        .map((l) =>
          l.replace(
            // eslint-disable-next-line no-control-regex
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ''
          )
        )
        .map(
          (line) =>
            /.*reifyNode:node_modules\/(?<module>[^\s]+)/.exec(line)?.groups
              ?.module
        )
        .filter((l) => l)
        .pop();
      if (module) {
        setInstall((i) => ({
          ...i,
          progress: module,
        }));
      }
    }

    child.stderr?.on('data', process);

    child.on('close', (code) => {
      if (code === 0) {
        setInstall((i) => ({
          ...i,
          isLoading: false,
          complete: true,
        }));
      } else {
        setInstall((i) => ({
          ...i,
          isLoading: false,
          complete: false,
          errors: [
            'Failed to install dependencies',
            'run npm install for details',
          ],
        }));
      }
    });

    return () => {
      child.kill();
    };
  }, [dir]);

  return install;
}

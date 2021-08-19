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
    let stdout: string, stderr: string;
    const child = spawn(
      'npm',
      ['ci', '--no-audit', '--no-progress', '--verbose'],
      {
        cwd: dir,
        stdio: 'pipe',
      }
    );

    function process(data: Buffer) {
      stdout += data.toString();
      const lines = stdout.split('\n');
      if (!stdout.endsWith('\n')) stdout = lines.pop() ?? '';
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

    //child.stdout?.on('data', process);
    child.stderr?.on('data', process);

    child.on('close', (code) => {
      if (code === 0) {
        setInstall({
          ...install,
          isLoading: false,
          complete: true,
        });
      } else {
        setInstall({
          ...install,
          isLoading: false,
          complete: false,
          errors: stderr.split('\n'),
        });
      }
    });

    return () => {
      child.kill();
    };
  }, [dir]);

  return install;
}

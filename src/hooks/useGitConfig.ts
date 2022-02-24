import { useEffect, useState } from 'react';
import simpleGit, { SimpleGit } from 'simple-git';

type Return = { user: string; email: string };

export default function useGitConfig(): Return {
  const [config, setConfig] = useState<Return>({
    user: '',
    email: '',
  });

  useEffect(() => {
    let pending = true;

    (async () => {
      try {
        const git: SimpleGit = simpleGit();
        const cfg = {
          user: (await git.getConfig('user.name')).value || '',
          email: (await git.getConfig('user.email')).value || '',
        };
        if (pending) setConfig(cfg);
      } catch (e) {
        //! ignore
      }
    })();

    return () => {
      pending = false;
    };
  }, []);

  return config;
}

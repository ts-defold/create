import { useEffect, useState } from 'react';
import nodegit from 'nodegit';

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
        const config = await nodegit.Config.openDefault();
        const cfg = {
          user: (await config.getStringBuf('user.name')).toString(),
          email: (await config.getStringBuf('user.email')).toString(),
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

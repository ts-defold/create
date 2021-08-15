import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';

type Return = {
  isLoading: boolean;
  exists: boolean;
  isEmpty: boolean;
  relativePath: string;
  name: string;
};

export default function useProjectDir(dir: string): Return {
  const [results, setResults] = useState<Return>({
    isLoading: true,
    exists: false,
    isEmpty: false,
    relativePath: '',
    name: '',
  });

  useEffect(() => {
    let pending = true;

    (async () => {
      const exists = !!(await new Promise((r) =>
        fs.access(dir, fs.constants.F_OK, (e) => r(!e))
      ));

      const stats = {
        isLoading: false,
        exists,
        isEmpty: exists
          ? await (async () => {
              const itr = await fs.promises.opendir(dir);
              const { done } = await itr[Symbol.asyncIterator]().next();
              if (!done) itr.close();
              return !!done;
            })()
          : true,
        relativePath: path.relative(process.env.INIT_CWD ?? process.cwd(), dir),
        name: path.basename(dir),
      };

      if (pending) setResults(stats);
    })();

    return () => {
      pending = false;
    };
  }, [dir]);

  return results;
}

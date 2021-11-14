import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';

export type ProjectApplyInfo = {
  isLoading: boolean;
  complete: boolean;
  error: string;
};

type ConfigValues = {
  name: string;
  version: string;
  description: string;
  author: string;
};

type PackageJson = {
  name: string;
  version: string;
  description: string;
  author: string;
  private: boolean;
  license?: string;
  repository?: string;
};

export default function useProjectApply(
  dir: string,
  config: ConfigValues
): ProjectApplyInfo {
  const [info, setInfo] = useState<ProjectApplyInfo>({
    isLoading: true,
    complete: false,
    error: '',
  });

  useEffect(() => {
    let pending = true;

    (async () => {
      try {
        const packageJson = JSON.parse(
          await fs.promises.readFile(path.join(dir, 'package.json'), 'utf8')
        ) as PackageJson;

        packageJson.private = true;
        packageJson.name = config.name;
        packageJson.version = config.version;
        packageJson.description = config.description;
        packageJson.author = config.author;
        delete packageJson.repository;
        delete packageJson.license;

        // Use replacer to provide partially ordered keys
        const keyOrder = [
          'private',
          'name',
          'version',
          'description',
          'author',
        ];
        const keys = keyOrder.reduce((acc, key) => ({ ...acc, key }), {});
        JSON.stringify(packageJson, (key, value) => {
          if (!(key in keys)) keyOrder.push(key);
          return value;
        });

        await fs.promises.writeFile(
          path.join(dir, 'package.json'),
          JSON.stringify(packageJson, keyOrder, 2)
        );

        if (pending) {
          setInfo((i) => ({ ...i, isLoading: false, complete: true }));
        }
      } catch (e) {
        const error = e as Error;
        if (pending) {
          setInfo((i) => ({
            ...i,
            isLoading: false,
            error: error.message,
          }));
        }
      }
    })();

    return () => {
      pending = false;
    };
  }, [dir, config]);

  return info;
}

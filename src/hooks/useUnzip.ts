import { useEffect, useState } from 'react';
import rimraf from 'rimraf';
import Zip from 'adm-zip';
import path from 'path';
import { mkdir } from 'fs';

export type UnzipInfo = {
  isLoading: boolean;
  complete: boolean;
  error: string;
  src: string;
  dest: string;
  progress: string;
};

export default function useUnzip(
  src: string,
  dest = '',
  cleanup = false
): UnzipInfo {
  const [unzip, setUnzip] = useState<UnzipInfo>({
    isLoading: true,
    complete: false,
    error: '',
    src,
    dest,
    progress: '',
  });

  useEffect(() => {
    let pending = true;

    (async () => {
      const zip = new Zip(src);
      const entries = zip.getEntries();
      const packageEntry = entries.find(
        (entry) => entry.name === 'package.json'
      );
      if (packageEntry) {
        const parts = packageEntry.entryName.split('/');
        const root =
          (parts.length > 1 ? parts.slice(0, parts.length - 1).join('/') : '') +
          '/';
        entries.forEach(async (entry) => {
          if (
            entry.entryName.startsWith(root) &&
            entry.entryName !== root &&
            !entry.entryName.endsWith('/')
          ) {
            const relEntry = entry.entryName.replace(root, '');
            const destPath = path.join(dest, path.dirname(relEntry), '/');
            mkdir(destPath, { recursive: true }, () => null);
            if (pending) {
              setUnzip((z) => ({ ...z, progress: relEntry }));
              await new Promise((resolve) => setTimeout(resolve, 1));
            }
            zip.extractEntryTo(entry.entryName, destPath, false, false);
          }
        });
        if (cleanup) rimraf(src, () => null);
        if (pending) {
          setUnzip((z) => ({ ...z, isLoading: false, complete: true }));
        }
      } else {
        if (cleanup) {
          rimraf(src, () => null);
          rimraf(dest, () => null);
        }
        if (pending) {
          setUnzip((z) => ({
            ...z,
            isLoading: false,
            error: 'No package.json',
          }));
        }
      }
    })();

    return () => {
      pending = false;
    };
  }, [src, dest]);

  return unzip;
}

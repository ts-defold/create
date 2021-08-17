import { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import fs from 'fs';
import tmp from 'tmp-promise';

export type FileInfo = {
  isLoading: boolean;
  complete: boolean;
  error: string;
  url: string;
  file: string;
  progress: number;
  total: number;
};

export default function useFileDownload(url: string, file = ''): FileInfo {
  const [download, setDownload] = useState<FileInfo>({
    isLoading: true,
    complete: false,
    error: '',
    progress: 0,
    total: 0,
    url,
    file,
  });

  useEffect(() => {
    let pending = true;

    (async () => {
      const req = await fetch(url);
      if (req.status === 200) {
        const dest = file ? file : (await tmp.file()).path;
        const stream = fs.createWriteStream(dest);

        //* total size
        if (pending) {
          setDownload((a) => ({
            ...a,
            file: dest,
            total: Number(req.headers.get('content-length') || 1),
          }));
        }

        //* progress
        req.body.on('data', (chunk) => {
          stream.write(chunk);
          if (pending) {
            setDownload((a) => ({
              ...a,
              progress: a.progress + chunk.length,
            }));
          }
        });

        //* complete
        req.body.on('end', () => {
          stream.close();
          if (pending) {
            setDownload((a) => ({
              ...a,
              isLoading: false,
              complete: true,
              progress: a.total > 0 ? a.total : a.progress,
            }));
          }
        });
      } else {
        if (pending) {
          setDownload((a) => ({
            ...a,
            isLoading: false,
            error: `${req.status} ${req.statusText}`,
          }));
        }
      }
    })();

    return () => {
      pending = false;
    };
  }, [url, file]);

  return download;
}

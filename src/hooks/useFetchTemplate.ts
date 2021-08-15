import { useEffect, useState } from 'react';
import fetch from 'node-fetch';

type Return = {
  isLoading: boolean;
  found: boolean;
  match: string;
  url: string;
  name: string;
  rate?: number;
};

type GitHubSearch = {
  items: Array<{
    name: string;
    archive_url: string;
    default_branch: string;
  }>;
};

export default function useFetchTemplate(template: string): Return {
  const [archive, setArchive] = useState<Return>({
    isLoading: true,
    found: false,
    match: '',
    url: '',
    name: '',
  });

  useEffect(() => {
    let pending = true;

    (async () => {
      const slug =
        (template &&
          (template.startsWith('tsd-template-')
            ? template
            : `tsd-template-${template}`)) ||
        'tsd-template';
      const payload = { ...archive, isLoading: false };

      const req = await fetch(
        `https://api.github.com/search/repositories?q=${slug}&sort=stars`
      );
      if (req.status === 200) {
        const json = (await req.json()) as GitHubSearch;
        const results = json.items.filter((item) =>
          item.name.startsWith('tsd-template-')
        );

        const exact = results.find((item) => item.name === slug);
        const match = (results.length && results[0]) || undefined;
        const url = exact
          ? exact.archive_url
              .replace('{archive_format}', 'zipball')
              .replace('{/ref}', exact.default_branch)
          : '';

        payload.found = !!exact;
        payload.match =
          !exact && match ? match.name.replace('tsd-template-', '') : '';
        payload.url = url;
        payload.name = exact ? exact.name : '';
      } else if (req.status === 403) {
        const reset = req.headers.get('X-RateLimit-Reset');
        if (reset) {
          payload.rate = parseInt(reset) - Date.now();
        }
      }

      if (pending) setArchive(payload);
    })();

    return () => {
      pending = false;
    };
  }, [template]);

  return archive;
}

import ky from 'ky';

export const request = ky.extend({
  prefixUrl: 'https://api.akumanoko.com/',
  credentials: typeof document !== 'undefined' ? 'include' : undefined,
});

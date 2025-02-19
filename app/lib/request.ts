import ky from 'ky';

export const request = ky.extend({
  prefixUrl: 'https://api.akumanoko.com/',
});

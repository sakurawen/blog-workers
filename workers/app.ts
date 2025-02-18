import type { ExecutionContext, ExportedHandler } from '@cloudflare/workers-types';
import { createRequestHandler } from 'react-router';

declare global {
  interface CloudflareEnvironment extends Env {}
}

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment
      ctx: ExecutionContext
    }
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
);

export default {
  // @ts-expect-error ignore
  fetch(request, env, ctx) {
    // @ts-expect-error ignore
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;

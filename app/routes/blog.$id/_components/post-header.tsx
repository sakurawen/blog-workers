import { Icon } from '@iconify/react';
import { useIsClient } from 'foxact/use-is-client';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export function PostHeader() {
  const ref = useRef<React.ComponentRef<'div'>>(null);
  const inView = useInView(ref);
  const isClient = useIsClient();
  return (
    <>
      <div className="fixed top-0 z-2 left-0  w-full ">
        <div className={cn('mx-auto max-w-2xl flex relative items-center justify-between py-3 px-4  bg-white/90 backdrop-blur-md transition-all origin-top opacity-0 -translate-y-full', inView || !isClient ? 'opacity-0 invisible -translate-y-full' : 'visible opacity-100 translate-y-0')}>
          <Link to="/blog" className="p-1 invisible md:visible">
            <Icon className="text-xl size-4" icon="ri:arrow-left-line" />
          </Link>
          <span className="text-sm font-bold">
            {isClient ? document?.title.replace('- akumanoko', '') : ''}
          </span>
          <span className="size-6"></span>
        </div>
      </div>
      <div className="mb-12" ref={ref}>
        <Link to="/blog">
          <Button className="px-6 py-2 rounded-full text-xl ">
            <Icon icon="ri:arrow-left-line" />
          </Button>
        </Link>
      </div>
    </>
  );
}

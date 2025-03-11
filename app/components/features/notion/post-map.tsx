"use client"
import type { Block, ExtendedRecordMap } from 'notion-types';
import { getPageContentBlockIds } from 'notion-utils';
import { useMemo } from 'react';
import { cn } from '~/lib/utils';

interface PostMapProps {
  id: string
  recordMap?: ExtendedRecordMap
}

export function PostMap(props: PostMapProps) {
  const { recordMap, id } = props;

  const blockMap = useMemo(() => {
    const res: Array<Block> = [];
    if (recordMap) {
      const pageBlocks = getPageContentBlockIds(recordMap, id);
      for (const blockId of pageBlocks) {
        const contentBlock = recordMap.block[blockId];
        if (!contentBlock) {
          continue;
        }
        if (contentBlock.value.type !== 'header' && contentBlock.value.type !== 'sub_header' && contentBlock.value.type !== 'sub_sub_header') {
          continue;
        }
        res.push(contentBlock.value);
      }
    }
    return res;
  }, [recordMap, id]);


  return (
    <div className=' fixed lg:block hidden top-1/2 -translate-y-1/2 right-40  '>
      <div className='sticky top-1/2 space-y-4'>
        {blockMap.map((block) => {
          return (
            <div
              role='button'
              key={block.id}
              className={cn('leading-none! opacity-20 hover:opacity-100', {
                'text-sm': block.type === 'header',
                'text-xs ': block.type === 'sub_header',
                'text-xs scale-90 origin-left': block.type === 'sub_sub_header',
              })}
            >
              <span className='select-none'>
                {block.properties?.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

export default function PagesNav({ totalCount }: { totalCount: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const limit = params.get('limit') !== null ? params.get('limit') : '10';
  const activePage = searchParams.get('offset')
    ? Number(searchParams.get('offset')?.toString()) / Number(limit) + 1
    : 1;

  const pagesCount =
    totalCount / Number(limit as string) > 1
      ? Math.floor(totalCount / Number(limit as string)) +
        (totalCount % Number(limit as string) > 0 ? 1 : 0)
      : 1;

  function handlePageClick(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    const newOffset = pageNumber * Number(limit);
    params.set('offset', String(newOffset));
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination>
      <PaginationContent>
        Page:
        {Array.from({ length: pagesCount }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={activePage === i + 1}
              onClick={(e) => handlePageClick(i)}
              href="#"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}

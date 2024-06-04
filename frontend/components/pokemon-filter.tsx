'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const typesList = [
  'FIRE',
  'WATER',
  'GRASS',
  'ELECTRIC',
  'PSYCHIC',
  'FIGHTING',
  'COLORLESS',
  'METAL',
  'DARK',
  'DRAGON',
  'FAIRY',
];

export default function PokemonFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchChange = useDebouncedCallback((searchString: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchString) {
      params.set('name', searchString);
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  function handleTypeSelectChange(typeValue: string) {
    const params = new URLSearchParams(searchParams);

    if (typeValue === 'all') {
      params.delete('type');
    } else {
      params.set('type', typeValue);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handlePageSizeSelectChange(pageSize: string) {
    const params = new URLSearchParams(searchParams);

    params.set('limit', pageSize);
    params.set('offset', '0');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="pt-10 pb-5 flex justify-start gap-4">
      <Input
        name="searchByName"
        placeholder="Search by name"
        className="w-1/3"
        onChange={(e) => handleSearchChange(e.target.value)}
        defaultValue={searchParams.get('name')?.toString()}
      />
      <Select
        name="typeSelect"
        onValueChange={(value) => handleTypeSelectChange(value)}
        defaultValue={searchParams.get('type')?.toString()}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Pokemon" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" key={-1}>
            All Pokemon
          </SelectItem>
          {typesList.map((pokemonType, index) => (
            <SelectItem value={pokemonType} key={index}>
              {pokemonType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="ml-auto pr-20">
        <Select
          name="pageSize"
          onValueChange={(value) => handlePageSizeSelectChange(value)}
          defaultValue={searchParams.get('limit')?.toString()}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'1'}>{'1'}</SelectItem>
            <SelectItem value={'3'}>{'3'}</SelectItem>
            <SelectItem value={'5'}>{'5'}</SelectItem>
            <SelectItem value={'10'}>{'10'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

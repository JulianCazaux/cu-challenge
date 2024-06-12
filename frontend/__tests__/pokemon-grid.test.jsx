import { render, screen } from '@testing-library/react';
import PokemonGrid from '@/components/pokemon-grid';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

describe('PokemonGrid Component', () => {
  it('Renders all 7 default cards if props are empty', async () => {
    render(
      await PokemonGrid({
        nameQuery: '',
        typeQuery: '',
        limitQuery: '',
        offsetQuery: '',
      }),
    );
    const cards = await screen.findAllByTestId(/card-/i);
    expect(cards.length).toBe(7);
  });

  it('Renders only Pikachu card when nameQuery prop equals "pik"', async () => {
    render(
      await PokemonGrid({
        nameQuery: 'pik',
        typeQuery: '',
        limitQuery: '',
        offsetQuery: '',
      }),
    );
    const cards = await screen.findAllByTestId(/card-/i);
    expect(cards.length).toBe(1);
  });

  it('Renders 3 results when limitQuery equals 3', async () => {
    render(
      await PokemonGrid({
        nameQuery: '',
        typeQuery: '',
        limitQuery: '3',
        offsetQuery: '',
      }),
    );
    const cards = await screen.findAllByTestId(/card-/i);
    expect(cards.length).toBe(3);
  });

  it('Renders 1 results when typeQuery equals "FIRE"', async () => {
    render(
      await PokemonGrid({
        nameQuery: '',
        typeQuery: 'FIRE',
        limitQuery: '',
        offsetQuery: '',
      }),
    );
    const cards = await screen.findAllByTestId(/card-/i);
    expect(cards.length).toBe(1);
  });
});

import { render, screen } from '@testing-library/react';
import PokemonCard from '@/components/pokemon-card';

const mockApiCardData = {
  id: 4,
  pokemonType: 'FIRE',
  evolutionType: 'BASIC',
  hitPoints: 100,
  rarity: 'COMMON',
  name: 'Test Pokemon',
  attack: {
    name: 'Punch',
    damageAmount: 1,
  },
  weakness: {
    type: 'FIRE',
    times: 2,
  },
  resistance: {
    type: 'WATER',
    value: 3,
  },
};

describe('PokemonCard Component', () => {
  it('Renders card', () => {
    render(<PokemonCard card={mockApiCardData} />);
    const card = screen.getByTestId(/card-/i);
    expect(card).toBeInTheDocument();
  });

  it('Renders Fight button', () => {
    render(<PokemonCard card={mockApiCardData} />);
    const button = screen.getByText(/fight/i);
    expect(button).toBeInTheDocument();
  });
});

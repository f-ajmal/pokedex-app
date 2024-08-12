import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { IPokemon } from '../../utils/interface';
import PokemonInformation from './PokemonInformation';

const mockPokemonData: IPokemon = {
    name: 'Pikachu',
    id: 25,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['Electric'],
    stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
};

describe('PokemonInformation', () => {
    beforeEach(() => {
        render(
            <ChakraProvider>
                <PokemonInformation pokemonInfo={mockPokemonData} />
            </ChakraProvider>
        );
    });

    afterEach(cleanup);

    it('renders Pokemon information', () => {
        expect(screen.getByTestId('pokemon-information')).toBeInTheDocument();
    });

    it('renders image', () => {
        expect(document.querySelectorAll('img')).toHaveLength(1);
    });
});
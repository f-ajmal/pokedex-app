import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { CapturedContext } from '../../context/capturedContext';
import queryClient from "../../utils/queryClient";
import { IPokemon } from '../../utils/interface';
import CapturedContainer from './CapturedContainer';

const mockPokemonData: IPokemon = {
    name: 'Pikachu',
    id: 25,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['Electric'],
    stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
};

const mockReleasePokemon = jest.fn();
const mockCapturedContext = { capturedList: [...Array(6)].map(() => mockPokemonData.image), capturePokemon: () => {}, releasePokemon: mockReleasePokemon };

describe('CapturedContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <CapturedContext.Provider value={mockCapturedContext}>
                <ChakraProvider>
                    <QueryClientProvider client={queryClient}>
                        <CapturedContainer />
                    </QueryClientProvider>
                </ChakraProvider>
            </CapturedContext.Provider>
        );
    });

    afterEach(cleanup);

    it('renders captured container', () => {
        expect(screen.getByTestId('captured-container')).toBeInTheDocument();
    });

    it('renders images from capturedList', () => {
        expect(document.querySelectorAll('img')).toHaveLength(6);
    });

    it('calls releasePokemon upon image click', () => {
        const testIndex = 3;
        const image = document.querySelectorAll('img')[testIndex];
        fireEvent.click(image);
        expect(mockReleasePokemon).toHaveBeenCalledTimes(1);
        expect(mockReleasePokemon.mock.calls[0][0]).toBe(testIndex);
    })
});
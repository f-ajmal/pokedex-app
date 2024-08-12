import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { CapturedContext, CapturedProvider } from '../../context/capturedContext';
import queryClient from "../../utils/queryClient";
import { IPokemon } from '../../utils/interface';
import SearchContainer from './SearchContainer';

const mockCapturePokemon = jest.fn();
const mockCapturedContext = { capturedList: [], capturePokemon: mockCapturePokemon, releasePokemon: () => {} };

const mockPokemonData: IPokemon = {
    name: 'Pikachu',
    id: 25,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['Electric'],
    stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
};

const mockData = {
    name: 'Pikachu',
    id: 25,
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    types: [{ type: { name: 'Electric' }}],
    stats: [{ base_stat: 35, stat: { name: 'hp' }},
        { base_stat: 55, stat: { name: 'attack' }},
        { base_stat: 40, stat: { name: 'defense' }}, 
        { base_stat: 90, stat: { name: 'speed' }}
    ],
};

describe('SearchContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <CapturedContext.Provider value={mockCapturedContext}>
                <ChakraProvider>
                    <QueryClientProvider client={queryClient}>
                        <SearchContainer />
                    </QueryClientProvider>
                </ChakraProvider>
            </CapturedContext.Provider>
        );
    });

    afterEach(cleanup);

    it('renders search container', () => {
        expect(screen.getByTestId('search-container')).toBeInTheDocument();
    });

    it('handles search input change', () => {
        const input = screen.getByPlaceholderText('Search Pokémon...');
        fireEvent.change(input, { target: { value: 'Pikachu' } });
        expect(input).toHaveValue('Pikachu');
    });

    it('renders Pokémon information', async () => {
        jest.mock('../../utils/api', () => ({
            fetchPokemon: jest.fn(() => {return Promise.resolve(mockData)}),
        }));
        const input = screen.getByPlaceholderText('Search Pokémon...');
        fireEvent.change(input, { target: { value: 'Pikachu' } });
        const searchButton = screen.getByText('Search')
        fireEvent.click(searchButton);
        await waitFor(() => expect(screen.getByTestId('pokemon-information')).toBeInTheDocument());
    });

    it('handles capture button click', async () => {
        const input = screen.getByPlaceholderText('Search Pokémon...');
        fireEvent.change(input, { target: { value: 'Pikachu' } });
        const searchButton = screen.getByText('Search')
        fireEvent.click(searchButton);
        await waitFor(() => expect(screen.getByText('Capture')).toBeInTheDocument());
        const captureButton = screen.getByText('Capture');
        fireEvent.click(captureButton);
        expect(mockCapturePokemon).toHaveBeenCalledTimes(1);
    });

    it('disables capture button when capturedList is full', async () => {
        cleanup();
        render(
            <CapturedContext.Provider value={
                { capturedList: [...new Array(6)], capturePokemon: () => {}, releasePokemon: () => {} }
            }>
                <ChakraProvider>
                    <QueryClientProvider client={queryClient}>
                        <SearchContainer />
                    </QueryClientProvider>
                </ChakraProvider>
            </CapturedContext.Provider>
        );
        const input = screen.getByPlaceholderText('Search Pokémon...');
        fireEvent.change(input, { target: { value: 'Pikachu' } });
        const searchButton = screen.getByText('Search')
        fireEvent.click(searchButton);
        await waitFor(() => expect(screen.getByText('Capture')).toBeDisabled());
    });

    it('renders error message when Pokémon not found', async () => {
        jest.mock('../../utils/api', () => ({
            fetchPokemon: jest.fn().mockRejectedValue(new Error('test')),
        }));
        const input = screen.getByPlaceholderText('Search Pokémon...');
        fireEvent.change(input, { target: { value: 'test' } });
        const searchButton = screen.getByText('Search')
        fireEvent.click(searchButton);
        await waitFor(() => expect(screen.getByText('Pokémon not found. Please search by name or ID.')).toBeInTheDocument());
    });
});
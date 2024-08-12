import { render, fireEvent, waitFor } from '@testing-library/react';
import { CapturedProvider, CapturedContext } from './capturedContext';
import { ICapturedContext } from '../utils/interface';

describe('CapturedContext', () => {
    it('initializes with empty capturedList', () => {
        const { getByTestId } = render(
            <CapturedProvider>
                <CapturedContext.Consumer>
                    {(context: ICapturedContext) => (
                        <div data-testid="captured-list">{context.capturedList.length}</div>
                    )}
                </CapturedContext.Consumer>
            </CapturedProvider>
        );
        expect(getByTestId('captured-list')).toHaveTextContent('0');
    });

    it('captures a Pokémon', async () => {
        // testing with name instead of image URL for simplicity
        const pokemonName = 'Pikachu';
        const { getByTestId } = render(
            <CapturedProvider>
                <CapturedContext.Consumer>
                    {(context: ICapturedContext) => (
                        <div>
                            <button
                                data-testid="capture-button"
                                onClick={() => context.capturePokemon(pokemonName)}
                            >
                                Capture
                            </button>
                            <div data-testid="captured-list">{context.capturedList.length}</div>
                        </div>
                    )}
                </CapturedContext.Consumer>
            </CapturedProvider>
        );
        const captureButton = getByTestId('capture-button');
        fireEvent.click(captureButton);
        await waitFor(() => expect(getByTestId('captured-list')).toHaveTextContent('1'));
    });

    it('releases a Pokémon', async () => {
        // testing with name instead of image URL for simplicity
        const pokemonName = 'Pikachu';
        const { getByTestId } = render(
            <CapturedProvider>
                <CapturedContext.Consumer>
                    {(context: ICapturedContext) => (
                        <div>
                            <button
                                data-testid="capture-button"
                                onClick={() => context.capturePokemon(pokemonName)}
                            >
                                Capture
                            </button>
                            <button
                                data-testid="release-button"
                                onClick={() => context.releasePokemon(0)}
                            >
                                Release
                            </button>
                            <div data-testid="captured-list">{context.capturedList.length}</div>
                        </div>
                    )}
                </CapturedContext.Consumer>
            </CapturedProvider>
        );
        const captureButton = getByTestId('capture-button');
        const releaseButton = getByTestId('release-button');
        fireEvent.click(captureButton);
        await waitFor(() => expect(getByTestId('captured-list')).toHaveTextContent('1'));
        fireEvent.click(releaseButton);
        await waitFor(() => expect(getByTestId('captured-list')).toHaveTextContent('0'));
    });
});
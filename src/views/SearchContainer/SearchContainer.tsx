import { useState, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input, Button, FormControl, Spinner, Text } from '@chakra-ui/react';
import { CapturedContext } from "../../context/capturedContext";
import { IPokemon } from "../../utils/interface";
import { fetchPokemon } from "../../utils/api";
import PokemonInformation from "../PokemonInformation/PokemonInformation";
import styles from './SearchContainer.module.css';

export default function SearchContainer() {
    const [searchValue, setSearchValue] = useState('')
    const [isSearchValid, setIsSearchValid] = useState(true)
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const { capturedList, capturePokemon } = useContext(CapturedContext);

    const { data = null, isError, isLoading } = useQuery({
        queryKey: ['pokemonAPI', selectedPokemon],
        queryFn: () => fetchPokemon(selectedPokemon),
        enabled: !!selectedPokemon
    });

    const pokemonInfo = useMemo<IPokemon>(() => (
        {
            name: data?.name ?? null,
            id: data?.id ?? null,
            image: data?.sprites?.front_default ?? null,
            types: data?.types?.map((item: any) => (item?.type?.name)) ?? [],
            stats: data?.stats?.map((item: any) => (
                    {[item?.stat?.name]: item?.base_stat}
                )).reduce((acc: Object, curr: Object) => (
                    { ...acc, ...curr }
                ), {}) ?? {}
        }
    ), [data])

    const handleSearch = (event: any) => {
        event.preventDefault();
        const modifiedSearchValue = searchValue.trim().toLowerCase().replace(/ /g, '-').replace(/[.']/g, '')
        if((searchValue === "") || /^[a-zA-Z0-9 -]+$/.test(modifiedSearchValue)) {
            setIsSearchValid(true);
            setSelectedPokemon(modifiedSearchValue)
        } else {
            setIsSearchValid(false);
        }
    };

    const showErrorMessage = !isSearchValid || isError;

    return (
        <div className={styles.container} data-testid="search-container">
            <form className={styles.form} onSubmit={handleSearch}>
                <FormControl id="pokemonSearch" className={styles.formGroup}>
                    <Input
                        className={styles.inputBar}
                        variant='outline'
                        placeholder="Search Pokémon..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button 
                        className={styles.searchButton}
                        colorScheme="teal" 
                        variant="solid" 
                        onClick={handleSearch}
                        type="submit"
                    >
                        Search
                    </Button>
                </FormControl>
            </form>
            {!!selectedPokemon && !isLoading && !showErrorMessage && <PokemonInformation pokemonInfo={pokemonInfo} />}
            {!!selectedPokemon && !isLoading && !showErrorMessage && <Button 
                className={styles.captureButton}
                colorScheme="teal" 
                variant="solid" 
                isDisabled={capturedList.length >= 6}
                onClick={() => {capturePokemon(pokemonInfo?.image)}}
            >
                Capture
            </Button>}
            {isLoading && !showErrorMessage && <Spinner 
                size="lg"
                color="#10394A" 
                thickness="4px"
                className={styles.spinner}
            />}
            {!isLoading && showErrorMessage && <Text 
                className={styles.errorMessage} 
                color="#10394A" 
                fontSize="sm"
            >
                Pokémon not found. Please search by name or ID.
            </Text>}
        </div>
      )
}
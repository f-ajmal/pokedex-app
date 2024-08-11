import React, { useState, useContext, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Input, InputGroup, Button } from '@chakra-ui/react';
import { CapturedContext } from "../../context/capturedContext";
import { IPokemon } from "../../utils/interface";
import { fetchPokemon } from "../../utils/api";
import PokemonInformation from "../PokemonInformation/PokemonInformation";
import styles from './SearchContainer.module.css';

export default function SearchContainer() {
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const { capturedList, capturePokemon } = useContext(CapturedContext);
    const queryClient = useQueryClient();

    const { data = null, error, isLoading } = useQuery({
        queryKey: ['pokemonAPI', selectedPokemon],
        queryFn: () => fetchPokemon(selectedPokemon.toLowerCase()),
        enabled: false
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

    const handleSearch = () => {
        if (selectedPokemon !== '') queryClient.fetchQuery({queryKey: ['pokemonAPI', selectedPokemon]});
    };

    return (
        <div className={styles.container}>
            <InputGroup className={styles.inputGroup}>
                <Input
                    className={styles.inputBar}
                    variant='outline'
                    placeholder="Search Pokémon"
                    value={selectedPokemon}
                    onChange={(e) => setSelectedPokemon(e.target.value)}
                />
                    <Button 
                        className={styles.searchButton}
                        colorScheme="teal" 
                        variant="solid" 
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
            </InputGroup>
            {!!data && <PokemonInformation pokemonInfo={pokemonInfo} />}
            <Button 
                className={styles.captureButton}
                colorScheme="teal" 
                variant="solid" 
                isDisabled={capturedList.length >= 6}
                onClick={() => {capturePokemon(pokemonInfo?.image)}}
            >
                Capture
            </Button>
        </div>
      )
}
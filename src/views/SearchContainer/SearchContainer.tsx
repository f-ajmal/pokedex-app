import React, { useState } from 'react';
import { Input, InputGroup, Button } from '@chakra-ui/react';
import styles from './SearchContainer.module.css';

export default function SearchContainer() {
    const [selectedPokemon, setSelectedPokemon] = useState('');

    const handleSearch = () => {
        console.log(selectedPokemon);
    };

    return (
        <div className={styles.container}>
            <InputGroup className={styles.inputGroup}>
                <Input
                    className={styles.inputBar}
                    size='md'
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
            <div className="pokemonIdentificationContainer">
                <div className="pokemonImage"></div>
                <div className="pokemonIdentification">
                <div className="pokemonTypesContainer"></div>
                </div>
                <div className="pokemonStatsContainer"></div>
                <div className="captureButton"></div>
            </div>
        </div>
      )
}
import React from "react";
import { capitalize } from 'lodash';
import { Image, Heading, Text } from '@chakra-ui/react';
import { IPokemon } from "../../utils/interface";
import styles from './PokemonInformation.module.css';

export default function PokemonInformation({ pokemonInfo }: { pokemonInfo: IPokemon }) {
    const { name, id, image, types, stats } = pokemonInfo;
    return (
        <div className={styles.container}>
            <div className={styles.identification}>
                <Image 
                    src={image} 
                    alt="pokemon-image" 
                    boxSize="150px"
                    borderRadius="2xl"
                    border="1px solid #10394A"
                    backgroundColor="#EEDEA4"
                />
                <div className={styles.identificationText}>
                    <div>
                        <Heading size="lg">{capitalize(name)}</Heading>
                        <Text fontSize="lg">#{id}</Text>
                    </div>
                    <div>
                        <Heading size="md">{(types.length === 1) ? "Type:" : "Types:"}</Heading>
                        <div className={styles.types}>
                            {types.map((type) => (
                                <Text fontSize="lg" className={styles.typeTile}>{capitalize(type)}</Text>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.stats}>
                {['hp', 'attack', 'defense', 'speed'].map((key) => (
                    <div className={styles.statTile}>
                        <Heading size="md">{capitalize(key)}</Heading>
                        <Text fontSize="lg">{stats[key]}</Text>
                    </div>
                ))}
            </div>
        </div>
    )
}
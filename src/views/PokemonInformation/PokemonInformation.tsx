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
                        <Heading size="lg" fontSize='30px' lineHeight="1.2">{capitalize(name)}</Heading>
                        <Text fontSize="lg">#{id}</Text>
                    </div>
                    <div>
                        <Heading size="md">{(types.length === 1) ? "Type" : "Types"}</Heading>
                        <div className={styles.types}>
                            {types.map((type) => (
                                <Text key={type} fontSize="lg" className={styles.typeTile}>{capitalize(type)}</Text>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <Heading size="md">Stats</Heading>
            <div className={styles.stats}>
                {['hp', 'attack', 'defense', 'speed'].map((stat) => (
                    <div key={stat} className={styles.statTile}>
                        <Heading size="md">{capitalize(stat)}</Heading>
                        <Text fontSize="lg">{stats[stat]}</Text>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}
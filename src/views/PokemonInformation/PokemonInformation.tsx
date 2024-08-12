import { capitalize } from 'lodash';
import { Image, Heading, Text } from '@chakra-ui/react';
import { IPokemon } from "../../utils/interface";
import styles from './PokemonInformation.module.css';

export default function PokemonInformation({ pokemonInfo }: { pokemonInfo: IPokemon }) {
    const { name, id, image, types, stats } = pokemonInfo;
    return (
        <div className={styles.container} data-testid="pokemon-information">
            <div className={styles.name}>
                <Heading size="lg" fontSize='30px' lineHeight="1.2">{capitalize(name)}</Heading>
                <Heading size="lg" fontSize='25px' lineHeight="1.2">#{id}</Heading>
            </div>
            <div className={styles.imageAndTypes}>
                <Image 
                    src={image} 
                    alt="pokemon-image" 
                    boxSize="150px"
                    borderRadius="2xl"
                    border="1px solid #10394A"
                    backgroundColor="#EEDEA4"
                />
                <div className={styles.types}>
                    <Heading size="md">{(types.length === 1) ? "Type" : "Types"}</Heading>
                    {types.map((type) => (
                        <Text key={type} fontSize="lg" className={styles.typeTile}>{capitalize(type)}</Text>
                    ))}
                </div>
            </div>
            <div>
                <Heading size="md">Stats</Heading>
                <div className={styles.stats}>
                    {['hp', 'attack', 'defense', 'speed'].map((stat) => (
                        <div key={stat} className={styles.statTile}>
                            <Heading size="md">{stat === 'hp' ? 'HP' : capitalize(stat)}</Heading>
                            <Text fontSize="lg">{stats[stat]}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
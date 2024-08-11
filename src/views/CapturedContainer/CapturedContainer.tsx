import { useContext } from 'react';
import { Image } from '@chakra-ui/react';
import { CapturedContext } from "../../context/capturedContext";
import styles from './CapturedContainer.module.css';

export default function CapturedContainer() {
    const { capturedList, releasePokemon } = useContext(CapturedContext);

    return (
        <div className={styles.container}>
            {capturedList.map((image, index) => {
                return <Image 
                    key={image + index}
                    src={image} 
                    alt={"pokemon-image-" + index} 
                    boxSize="120px"
                    borderRadius="2xl"
                    border="1px solid #10394A"
                    backgroundColor="#EEDEA4"
                    onClick={() => releasePokemon(index)}
                />
            })}
        </div>
      )
}
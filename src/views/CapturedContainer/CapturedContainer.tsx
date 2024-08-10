import React from 'react';
import styles from './CapturedContainer.module.css';

export default function CapturedContainer() {
    return (
        <div className={styles.container}>
            <div className="capturedImage"></div>
        </div>
      )
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVideos, addVideo, addVideoToUser } from '../list/listSlice';
import { selectSearchBarState } from '../searchBar/searchBarSlice';
import styles from './ResultsDisplay.module.css';

export function ResultsDisplay() {

    const searchState = useSelector(selectSearchBarState);
    const dispatch = useDispatch();

    const videos = useSelector(selectVideos);

    const displayNone = {
        display: 'none'
    }

    const renderSwitch = (status: 'idle' | 'pending' | 'succeeded' | 'failed') => {
        switch (status) {
            default:
            case 'idle':
                return <div className={styles.list} style={displayNone}>
                    <p>En attente d'un recherche</p>
                </div>

            case 'pending':
                return <div className={styles.list}>
                    <p>Chargement...</p>
                </div>

            case 'succeeded':
                return <div className={styles.list}>
                    <p>Voici les 10 premiers résultats :</p>
                    {searchState.results!.items.map((result, index) => (
                        <div key={result.id.videoId} className={styles.videoCard}>
                            <button type="button" className={styles.add} onClick={() => dispatch(addVideoToUser(result))}>+</button>
                            <p>{result.snippet.title}</p>
                        </div>
                    ))}
                </div>

            case 'failed':
                return <div className={styles.list}>
                    <p>Une erreur est survenue</p>
                </div>
        }
    }
    
    return (
        renderSwitch(searchState.status)
    );
}

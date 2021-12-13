import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../searchBar/SearchBar';
import styles from './List.module.css';
import { chooseVideo, fetchVideos, removeVideoFromUser, selectVideos } from './listSlice';

export function List() {

    const dispatch = useDispatch();
    const videos = useSelector(selectVideos);
    useEffect(() => {
        dispatch(fetchVideos())
    }, [dispatch])

    return (
        <div className={styles.list}>
            <h2>Votre bibliothèque</h2>
            <SearchBar />
            {videos.map((video, index) => (
                <div className={styles.videoCard} key={video.id}>
                    <button type="button" className={styles.suppr} onClick={() => dispatch(removeVideoFromUser(video.id))}>X</button>
                    <p onClick={() => dispatch(chooseVideo(video))}>{video.title}</p>
                </div>
            ))}
        </div>
    );
}

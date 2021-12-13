import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedVideo } from '../list/listSlice';
import styles from './VideoDisplay.module.css';

export function VideoDisplay() {

    const video = useSelector(selectSelectedVideo);
    
    return (
        <div className={styles.videoDisplay}>
            {
                video === null ?
                (<p>Sélectionnez une vidéo de votre bibliothèque</p>)
                :
                (
                    <div>
                        <h2>{video!.title}</h2>
                        <div className={styles.videoContainer}>
                            <iframe id="ytplayer" title="ytvideo" src={"http://www.youtube.com/embed/"+video!.id+"?cc_load_policy=1"} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

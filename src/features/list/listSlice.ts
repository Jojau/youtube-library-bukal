import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { ResultatItem } from '../searchBar/searchBarSlice';

/**
 * Types et State
 */
interface Video {
    title: string;
    id: string;
}

export interface ListState {
  videos: Video[];
  selectedVideo: Video | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ListState = {
    videos: [],
    selectedVideo: null,
    status: 'idle'
};

/**
 * API
 */
// Récupérer la liste des vidéos
export const fetchVideos = createAsyncThunk('list/fetchVideos', async () => {
  const url = new URL(window.location.href);
  const userId = url.searchParams.get("userId");
  const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/utilisateurs/'+userId,
            headers: { 'Authorization': 'Bearer '+process.env.REACT_APP_YOUTUBE_LIBRARY_TOKEN }
        }
    );
    return response.data.videos as Video[];
});
// Supprimer une video
export const removeVideoFromUser = createAsyncThunk('list/removeVideoFromUser', async (videoId: string) => {
  const url = new URL(window.location.href);
  const userId = url.searchParams.get("userId");
  const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/utilisateurs/'+userId+'/removeVideo/'+videoId,
            headers: { 'Authorization': 'Bearer '+process.env.REACT_APP_YOUTUBE_LIBRARY_TOKEN }
        }
    );
    return response.data.videos as Video[];
});
// Ajouter une video
export const addVideoToUser = createAsyncThunk('list/addVideoToUser', async (videoResult: ResultatItem) => {
  // Étape 1 : Créer la vidéo en base
  const creation = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/videos',
      headers: { 'Authorization': 'Bearer '+process.env.REACT_APP_YOUTUBE_LIBRARY_TOKEN },
      data: {"id": videoResult.id.videoId, "title": videoResult.snippet.title}
  }
  );
  
  // Étape 2 : La lier à l'utilisateur
  const url = new URL(window.location.href);
  const userId = url.searchParams.get("userId");
  const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/utilisateurs/'+userId+'/addVideo/'+videoResult.id.videoId,
            headers: { 'Authorization': 'Bearer '+process.env.REACT_APP_YOUTUBE_LIBRARY_TOKEN }
        }
    );
    return response.data.videos as Video[];
});

/**
 * Le reducer et ses actions
 */
export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    chooseVideo: (state, action: PayloadAction<Video>) => {
      state.selectedVideo = action.payload;
    },
    deleteVideo: (state, action: PayloadAction<number>) => {
        if (state.selectedVideo !== null && state.videos[action.payload].id === state.selectedVideo.id) {
            state.selectedVideo = null;
        }
        state.videos.splice(action.payload, 1);
    },
    addVideo: (state, action: PayloadAction<ResultatItem>) => {
        const video = {
            "title": action.payload.snippet.title,
            "id": action.payload.id.videoId
        }
        state.videos.push(video);
    }
  },
  extraReducers: (builder) => {
    builder
    // fetchVideos
    .addCase(fetchVideos.pending, (state, action) => {
        console.log("Chargement des vidéos...");
        state.status = 'pending';
    })
    .addCase(fetchVideos.fulfilled, (state, action) => {
        console.log("Vidéos chargées !");
        state.status = 'succeeded';

        state.videos = action.payload;
    })
    .addCase(fetchVideos.rejected, (state, action) => {
        console.log("Les vidéos n'ont pas pu être chargées");
        state.status = 'failed';
        console.log(action.error.message);
    })

    // removeVideoFromUser
    .addCase(removeVideoFromUser.pending, (state, action) => {
        console.log("Suppression de la vidéo de la bibliothèque...");
        state.status = 'pending';
    })
    .addCase(removeVideoFromUser.fulfilled, (state, action) => {
        console.log("Vidéo supprimée de la bibliothèque !");
        state.status = 'succeeded';

        state.videos = Object.values(action.payload);
    })
    .addCase(removeVideoFromUser.rejected, (state, action) => {
        console.log("La vidéo n'a pas pu être supprimée de la bibliothèque");
        state.status = 'failed';
        console.log(action.error.message);
    })

    // addVideoToUser
    .addCase(addVideoToUser.pending, (state, action) => {
        console.log("Ajout de la vidéo dans la bibliothèque...");
        state.status = 'pending';
    })
    .addCase(addVideoToUser.fulfilled, (state, action) => {
        console.log("Vidéo ajoutée dans la bibliothèque !");
        state.status = 'succeeded';

        state.videos = Object.values(action.payload);
    })
    .addCase(addVideoToUser.rejected, (state, action) => {
        console.log("La vidéo n'a pas pu être ajoutée à la bibliothèque");
        state.status = 'failed';
        console.log(action.error.message);
    })
  }
});

/**
 * Les exports
 */
export const { chooseVideo, deleteVideo, addVideo } = listSlice.actions;

export const selectVideos = (state: RootState) => state.list.videos;
export const selectSelectedVideo = (state: RootState) => state.list.selectedVideo;

export default listSlice.reducer;

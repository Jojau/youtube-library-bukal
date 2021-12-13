import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppThunk } from '../../app/store';

export interface Resultat {
    "kind": "youtube#searchListResponse",
    "etag": string,
    "nextPageToken": string,
    "prevPageToken": string,
    "regionCode": string,
    "pageInfo": {
        "totalResults": number,
        "resultsPerPage": number
    },
    "items": ResultatItem[]
}

export interface ResultatItem {
    "kind": "youtube#searchResult",
    "etag": string,
    "id": {
        "kind": string,
        "videoId": string,
        "channelId": string,
        "playlistId": string
    },
    "snippet": {
        "publishedAt": string,
        "channelId": string,
        "title": string,
        "description": string,
        "thumbnails": {
        (key: string): {
            "url": string,
            "width": number,
            "height": number
        }
        },
        "channelTitle": string,
        "liveBroadcastContent": string
    }
}

export interface SearchBarState {
  query: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  results: Resultat | null
};

const initialState: SearchBarState = {
  query: '',
  status: 'idle',
  results: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchResults = createAsyncThunk(
    'searchBar/fetchResults',
    async (query: string) => {
        const response = await axios({
            method: 'get',
            url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q='+query+'&key='+process.env.REACT_APP_YOUTUBE_API_KEY,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        return response.data as Resultat;
    }
);

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
        // FetchResults
        .addCase(fetchResults.pending, (state) => {
            console.log("chargement des résultats");
            state.status = 'pending';
        })
        .addCase(fetchResults.fulfilled, (state, action) => {
            console.log("yess ! on a trouvé des vidéos trop chouettes :");
            console.log(action.payload);
            state.status = 'succeeded';
            state.results = action.payload;
        })
        .addCase(fetchResults.rejected, (state, action) => {
            console.log("bah alors on arrive pas à envoyer une requête correctement mdrrrrrr");
            console.log(action.error.message);
            state.status = 'failed';
        })
  },
});

// export const { increment, decrement, incrementByAmount } = searchBarSlice.actions;

export const selectSearchBarState = (state: RootState) => state.searchBar;

export default searchBarSlice.reducer;

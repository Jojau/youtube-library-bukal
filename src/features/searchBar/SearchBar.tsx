import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults, selectSearchBarState } from './searchBarSlice';

export function SearchBar() {

    const dispatch = useDispatch();

    const searchState = useSelector(selectSearchBarState);
    const [query, setQuery] = useState(searchState?.query);

    useEffect(() => {
        setQuery(searchState.query);
    },[searchState])

    return (
        <div>
            <input type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <button type="button" onClick={() => dispatch(fetchResults(query))}>Rechercher</button>
        </div>
    );
}

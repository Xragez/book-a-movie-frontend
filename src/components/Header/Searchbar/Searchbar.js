import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {Button} from "react-bootstrap";

function Searchbar(props){
    const [query, setQuery] = useState(props.query)
    const history = useHistory()

    const onKeyDown = (e) =>{
        if(e.key === 'Enter') {
            onSearch()
        }
    }

    const onSearch = () =>{
        history.push(`/search/${query}`)
    }

    return (
        <div className="d-flex">
            <input onKeyDown={onKeyDown}
                value={query}
                onChange={event => setQuery(event.target.value)}
                className="form-control"
                type="text"
                placeholder="Search"
            />
            <Button variant="dark" onClick={onSearch}>
                Search
            </Button>
        </div>
    );
}

export default Searchbar;
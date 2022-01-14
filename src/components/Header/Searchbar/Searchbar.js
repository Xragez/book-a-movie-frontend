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
        if(query.length !== 0)
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
            <div className="ml-2">
                <Button variant="dark" onClick={onSearch}>
                    Search
                </Button>
            </div>

        </div>
    );
}

export default Searchbar;
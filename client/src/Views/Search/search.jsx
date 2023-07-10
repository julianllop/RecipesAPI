import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../Redux/actions';
import styles from "./search.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [input, setInput] = useState(name)


    function handleInputChange(event) {
        setInput(setName(event.target.value));
        console.log(name)
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getByName(name))
        setInput("")
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }


    return (
        <div className={styles.container}>
            <input
                value={input}
                type="text"
                placeholder="Search a recipe..."
                onChange={(event) => handleInputChange(event)}
                className={styles.input}
                onKeyDown={handleKeyPress}
            />
            <button type="submit" onClick={(event) => handleSubmit(event)} className={styles.boton}>Search</button>
        </div>
    )
}
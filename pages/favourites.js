import React, { useState, useEffect } from 'react'

export default function Favourites() {
    const [items, setItems] = useState(null);
    useEffect(function () {
        setItems(localStorage.getItem("name"))
    }, []);

    return <div>Favourite {items}</div>
}

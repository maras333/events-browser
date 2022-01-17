export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const getClassifications = () => {
    return [
        {
            id: "KZFzniwnSyZfZ7v7n1",
            name: "Miscellaneous",         
        }, {
            "id": "KZFzniwnSyZfZ7v7nE",
            "name": "Sports",
        }, {
            "id": "KZFzniwnSyZfZ7v7nJ",
            "name": "Music",
        }, {
            "id": "KZFzniwnSyZfZ7v7na",
            "name": "Arts & Theatre",            
        }, {
            "id": "KZFzniwnSyZfZ7v7nl",
            "name": "Undefined",    
        }, {
            "id": "KZFzniwnSyZfZ7v7nn",
            "name": "Film",
        }, {
            "id": "KZAyXgnZfZ7v7n1",
            "name": "Venue Based",
        }, {
            "id": "KZAyXgnZfZ7v7nJ",
            "name": "Upsell",
        }, {
            "id": "KZAyXgnZfZ7v7nn",
            "name": "Transportation",
        }, {
            "id": "KZAyXgnZfZ7v7lk",
            "name": "Nonticket",
        }, {
            "id": "KZAyXgnZfZ7v7la",
            "name": "Individual",
        }
    ]
}

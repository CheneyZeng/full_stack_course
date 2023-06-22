const MapList = ({ namesToShow, onDelete }) => {
    return namesToShow.map(person =>
        <div>
            <strong>{person.name} {person.number} </strong><button onClick={()=>onDelete(person)}>delete</button>
        </div>
    )
}

export default MapList
import MapList from './Maplist'

const Filter = ({ namesToShow }) => {
    console.log('nametoshow', namesToShow)
    if (namesToShow === '') {
        return
    } else {
        return <ul>< MapList namesToShow={namesToShow} /></ul>
    }
}

export default Filter
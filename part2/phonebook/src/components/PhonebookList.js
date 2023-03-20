import Person from './Person'
import phonebookService from '../services/phonebook'

const PhonebookList = ({ filterName, persons, removePerson }) => {

    const namesToShow = (filterName === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

    return (
        <ul>
            {namesToShow.map((person) =>
                <Person key={person.id}
                    person={person}
                    removePerson={() => removePerson(person)}
                />
            )}
        </ul>
    )
}

export default PhonebookList 
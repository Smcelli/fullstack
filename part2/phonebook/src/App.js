import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import PhonebookList from './components/PhonebookList'
import FilterForm from './components/FilterForm'
import AddNewPerson from './components/AddNewPerson'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
    const [persons, setPersons] = useState(null)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [operationMessage, setOperationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initializePersons => {
                setPersons(initializePersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = { name: newName, number: newNumber }
        const existingPerson = persons.find(person => person['name'] === newName)
        
        if (existingPerson === undefined) {
            phonebookService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    console.log(returnedPerson)
                    setOperationMessage(`${newName} has been added to the phonebook`)
                    setTimeout(() => { setOperationMessage(null) }, 5000)
                })
        }
        else if (window.confirm(`Replace number for ${newName} with ${newNumber}?`)) {
            phonebookService
                .update(existingPerson['id'], personObject)
                .then(returnedPerson => {
                    const updatePersons = persons.filter(person => person['name'] !== newName)
                    setPersons(updatePersons.concat(returnedPerson))
                    setOperationMessage(`${newName} number has been updated to ${newNumber}`)
                    setTimeout(() => {setOperationMessage(null)}, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Number for ${newName} cannot be changed, ${newName} cannot be found`)
                    setTimeout(() => { setErrorMessage(null) }, 5000)
                })
        }

        setNewName('')
        setNewNumber('')
    }

    const removePerson = (person) => {
        if (!window.confirm(`Delete ${person.name}?`))
            return
        phonebookService
            .remove(person.id)
            .then(() => {
                setOperationMessage(`${person.name} has been deleted from the phonebook`)
                setTimeout(() => {setOperationMessage(null)}, 5000)
            })
            .catch(error => {
                setErrorMessage(`${newName} cannot be removed, ${newName} cannot be found`)
                setTimeout(() => { setErrorMessage(null) }, 5000)
            })
        setPersons(persons.filter(p => p.id !== person.id))

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilterName(event.target.value)
    }
    if (!persons) {
        return null
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={operationMessage} />
            <ErrorMessage message={errorMessage} />
            <FilterForm
                filterName={filterName}
                handler={handleFilterChange}
            />

            <h2>Add New</h2>
            <AddNewPerson
                newName={newName}
                newNumber={newNumber}
                nameHandler={handleNameChange}
                numberhandler={handleNumberChange}
                addPerson={addPerson}
            />

            <h2>Numbers</h2>
            <PhonebookList
                filterName={filterName}
                persons={persons}
                removePerson={removePerson}
            />
        </div>
    )
}

export default App
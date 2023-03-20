

const AddNewPerson = ({ newName, newNumber, nameHandler, numberhandler, addPerson }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={nameHandler}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={numberhandler}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNewPerson
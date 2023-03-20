const FilterForm = ({ filterName, handler }) => {
    return (
        <form>
            <div>
                filter names with <input
                    value={filterName}
                    onChange={handler}
                />
            </div>
        </form>
    )
}

export default FilterForm
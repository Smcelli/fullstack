import { useState } from 'react'



const Button = ({ onClick, text }) => {
    return(
        <button onClick ={onClick}> 
            {text} 
        </button>
    )
}

const StatisticLine = ({ label, value }) => {
    return(
        <tr>
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    )
}

const DisplayStats = ({ good, neutral, bad }) => {
    let total = (good + bad + neutral)
    if (total == 0){
        return(
        <div>
            No feedback given
        </div>
        )
    }
    return(
    <div>
        <table>
            <tbody>
                <StatisticLine
                    label={"Good: "}
                    value={good}
                />
                <StatisticLine
                    label={"Neutral: "}
                    value={neutral}
                />
                <StatisticLine
                    label={"Bad: "}
                    value={bad}
                />
                <StatisticLine
                    label={"Total: "}
                    value={total}
                />
                <StatisticLine
                    label={"Average: "}
                    value={(good-bad)/total}
                />
                <StatisticLine
                    label={"Positive: "}
                    value={good/total}
                />
            </tbody>
        </table>
    </div>
    )
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const IncrementGood = () => {
        setGood(good+1)
    }
    const IncrementNuetral = () => {
        setNeutral(neutral+1)
    }
    const IncrementBad = () => {
        setBad(bad+1)
    }
    

    return (
        <div>
            <h1>give feedback</h1>
            <Button 
                onClick={IncrementGood}
                text= {"Good"}
            />
            <Button 
                onClick={IncrementNuetral}
                text= {"Neutral"}
            />
            <Button 
                onClick={IncrementBad}
                text= {"Bad"}
            />
            <h1>Statistics</h1>
            <DisplayStats
                good={good}
                bad={bad}
                neutral={neutral}
            />
        </div>
    )
}

export default App
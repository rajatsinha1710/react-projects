import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setloading] = useState(true)
  const [tours, setTours] = useState([])
  
  const removeTour = (id) => {
    const newTour = tours.filter((tour) => tour.id !== id)
    setTours(newTour)
  }

  const fetchTours = async () => {
    setloading(true)

    try {
      const response = await fetch(url)
    const tours = await response.json()
    setloading(false)
    setTours(tours)
    } catch (error) {
      setloading(false)
      console.log(error);
    }

    
    
  }
  useEffect(() => {
    fetchTours()
  }, [])


  
  if(loading){
    return (
    <main>
      <Loading/>
    </main>
    )
  }
  if(tours.length === 0){
    return (
      <main>
        <div className='title'>
          <h2>No tours left</h2>
          <div className='underline' ></div>
          <button className='btn' onClick={fetchTours}>refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>

    </main>
  )
}

export default App

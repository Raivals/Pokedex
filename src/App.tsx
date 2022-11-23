import axios from "axios"
import React, { useEffect, useState } from "react"
import "./App.css"

interface Pokemons {
  name: string
  url: string
}
function App() {
  // Stocker la liste de pokemon triée
  const [pokemons, setPokemons] = useState([])

  // Commande déclanchée au chargement de la page

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit-20&offset=20",
      )

      console.log(res.data.results)

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        )

        console.log(poke)
      })
    }
    getPokemon()
  }, [])

  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
    </div>
  )
}

export default App

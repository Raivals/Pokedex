import axios from "axios"
import React, { useEffect, useState } from "react"
import "./App.css"
import PokemonCollection from "./components/PokemonCollection"
import { Pokemon } from "./interface"

interface Pokemons {
  name: string
  url: string
}

const App: React.FC = () => {
  // Stocker la liste de pokemon triée
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  // Stockert la nouvelle URL à chaques chargement onclick
  const [nextUrl, setNextUrl] = useState<string>("")

  // Commande déclanchée au chargement de la page

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
      )

      setNextUrl(res.data.next)

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        )

        setPokemons((p) => [...p, poke.data])
      })
    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    let res = await axios.get(nextUrl)

    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
      )

      setPokemons((p) => [...p, poke.data])
    })
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">PokeDex</header>
        <PokemonCollection pokemons={pokemons} />
        <button onClick={nextPage}>Load More !</button>
      </div>
    </div>
  )
}

export default App

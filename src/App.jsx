import { useState } from 'react'
import './App.css'
import { useGlobalContext } from './context'
import Favourites from './components/Favourites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'

export default function App() {

  const { showModal, favourites } = useGlobalContext();
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favourites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}
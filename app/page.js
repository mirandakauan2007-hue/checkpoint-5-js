'use client'

import { useEffect, useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import InputText from './components/InputText'
import List from './components/List'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadNotes() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Erro ao buscar as anotações')
      }

      const data = await response.json()

      setNotes(data)
    } catch (error) {
      console.error(error)
      setError('Não foi possível carregar as anotações.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  async function handleCreate() {
    if (title.trim() === '' || content.trim() === '') {
      setError('Preencha o título e o conteúdo.')
      return
    }

    try {
      setError('')

      const newNote = {
        title: title.trim(),
        content: content.trim(),
        date: new Date().toLocaleString('pt-BR'),
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })

      if (!response.ok) {
        throw new Error('Erro ao criar anotação')
      }

      const createdNote = await response.json()

      setNotes((currentNotes) => [createdNote, ...currentNotes])

      setTitle('')
      setContent('')
    } catch (error) {
      console.error(error)
      setError('Não foi possível criar a anotação.')
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta anotação?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      setError('')

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir anotação')
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== id)
      )
    } catch (error) {
      console.error(error)
      setError('Não foi possível excluir a anotação.')
    }
  }

  return (
    <div>
      <Header
        title="App de Anotações"
        action="Início"
      />

      <main>
        <h2>Nova Anotação</h2>

        <InputText
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputText
          label="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline={true}
        />

        <Button
          label="Criar Anotação"
          onClick={handleCreate}
        />

        {error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}

        <h2>Minhas Anotações</h2>

        {loading ? (
          <p>Carregando anotações...</p>
        ) : notes.length === 0 ? (
          <p>Nenhuma anotação cadastrada.</p>
        ) : (
          <List
            items={notes}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}

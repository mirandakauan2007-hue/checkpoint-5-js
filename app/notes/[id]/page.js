'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function DetailsPage() {
  const params = useParams()

  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadNote() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${API_URL}/${params.id}`
        )

        if (!response.ok) {
          throw new Error('Anotação não encontrada')
        }

        const data = await response.json()

        setNote(data)

        document.title = data.title || 'Anotação'
      } catch (error) {
        console.error(error)
        setError(
          'Não foi possível carregar a anotação.'
        )
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadNote()
    }
  }, [params.id])

  if (loading) {
    return (
      <div>
        <Header
          title="App de Anotações"
          action="Início"
        />

        <main>
          <p>Carregando...</p>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header
          title="App de Anotações"
          action="Início"
        />

        <main>
          <p style={{ color: 'red' }}>
            {error}
          </p>

          <Link href="/">
            Voltar
          </Link>
        </main>
      </div>
    )
  }

  if (!note) {
    return (
      <div>
        <Header
          title="App de Anotações"
          action="Início"
        />

        <main>
          <p>Anotação não encontrada.</p>

          <Link href="/">
            Voltar
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="App de Anotações"
        action="Início"
      />

      <main>
        <h2>{note.title}</h2>

        <p>{note.content}</p>

        <p>
          Criado em: {note.date}
        </p>

        <Link href="/">
          Voltar
        </Link>
      </main>
    </div>
  )
}

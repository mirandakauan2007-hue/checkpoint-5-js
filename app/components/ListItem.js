import Link from 'next/link'

function ListItem({
  id,
  title,
  content,
  date,
  onDelete,
}) {
  return (
    <div>
      <h3>{title}</h3>

      <p>{content}</p>

      <p>
        Criado em: {date}
      </p>

      <Link href={`/notes/${id}`}>
        Ver detalhes
      </Link>

      <button
        type="button"
        onClick={() => onDelete(id)}
      >
        Excluir
      </button>
    </div>
  )
}

export default ListItem

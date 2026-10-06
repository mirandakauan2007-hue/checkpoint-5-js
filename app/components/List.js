import ListItem from './ListItem'

function List({ items, onDelete }) {
  return (
    <div>
      {items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          date={item.date}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default List

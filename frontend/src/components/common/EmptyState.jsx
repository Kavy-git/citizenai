import './EmptyState.css'

export default function EmptyState({ title = 'No schemes found', message = 'Try adjusting your filters or search terms.' }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">🔍</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
    </div>
  )
}

import './PageHeader.css'

export default function PageHeader({ icon, title, subtitle, count, color = 'var(--color-primary)' }) {
  return (
    <div className="page-header">
      <div className="page-header__icon" style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}>
        <span>{icon}</span>
      </div>
      <div className="page-header__text">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {count !== undefined && (
        <div className="page-header__count" style={{ color, background: `${color}18` }}>
          {count} schemes
        </div>
      )}
    </div>
  )
}

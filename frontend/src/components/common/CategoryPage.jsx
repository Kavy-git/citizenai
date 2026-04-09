import PageHeader   from '../../components/common/PageHeader'
import FilterBar    from '../../components/common/FilterBar'
import SchemeCard   from '../../components/common/SchemeCard'
import EmptyState   from '../../components/common/EmptyState'
import BackButton   from '../../components/common/BackButton'
import { useSchemeFilter } from '../../hooks/useSchemeFilter'
import { useChat }  from '../../context/ChatContext'
import './CategoryPage.css'

export default function CategoryPage({ icon, title, subtitle, color, schemes }) {
  const { filtered, search, setSearch, state, setState, income, setIncome, reset } =
    useSchemeFilter(schemes)
  const { openChat } = useChat()

  return (
    <div className="category-page page-container animate-fadeIn">
      <BackButton />

      <PageHeader
        icon={icon}
        title={title}
        subtitle={subtitle}
        count={filtered.length}
        color={color}
      />

      <FilterBar
        search={search} setSearch={setSearch}
        state={state}   setState={setState}
        income={income} setIncome={setIncome}
        onReset={reset}
      />

      {filtered.length > 0 ? (
        <div className="grid-schemes">
          {filtered.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <div className="category-page__ai-cta" onClick={openChat}>
        <span>🤖</span>
        <div>
          <strong>Not sure which scheme fits you?</strong>
          <span>Ask Citizen AI — describe your situation and get personalised recommendations.</span>
        </div>
        <button className="btn btn--outline btn--sm">Ask Now</button>
      </div>
    </div>
  )
}
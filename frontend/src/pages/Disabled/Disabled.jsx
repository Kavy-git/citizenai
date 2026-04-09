import CategoryPage from '../../components/common/CategoryPage'
import { SCHEMES } from '../../data/schemes'


export default function Disabled() {
  
  return (
    <CategoryPage
      icon="♿"
      title="Disabled"
      subtitle="Assistive devices, pensions & rehabilitation support"
      color="#34d399"
      schemes={SCHEMES.disabled}
    />
  )
}

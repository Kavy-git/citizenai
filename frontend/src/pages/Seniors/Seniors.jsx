import CategoryPage from '../../components/common/CategoryPage'
import { SCHEMES } from '../../data/schemes'


export default function Seniors() {

  

  return (
    <CategoryPage
      icon="🧓"
      title="Seniors"
      subtitle="Pensions, healthcare & assistive welfare programs"
      color="#a78bfa"
      schemes={SCHEMES.seniors}
    />
  )
}

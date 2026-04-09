import CategoryPage from '../../components/common/CategoryPage'
import { SCHEMES } from '../../data/schemes'


export default function Jobs() {
  
  return (
    <CategoryPage
      icon="💼"
      title="Jobs"
      subtitle="Skill training, apprenticeships & job opportunities"
      color="#fb923c"
      schemes={SCHEMES.jobs}
    />
  )
}

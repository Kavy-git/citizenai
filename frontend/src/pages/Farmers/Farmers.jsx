import CategoryPage from '../../components/common/CategoryPage'
import { SCHEMES } from '../../data/schemes'



export default function Farmers() {

  
  return (
    <CategoryPage
      icon="🌾"
      title="Farmers"
      subtitle="Subsidies, crop insurance, loans & market access"
      color="#4ade80"
      schemes={SCHEMES.farmers}
    />
  )
}

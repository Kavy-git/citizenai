import CategoryPage from '../../components/common/CategoryPage'
import { SCHEMES } from '../../data/schemes'


export default function Women() {

  
  return (
    <CategoryPage
      icon="👩"
      title="Women"
      subtitle="Maternity benefits, safety schemes & employment"
      color="#f472b6"
      schemes={SCHEMES.women}
    />
  )
}

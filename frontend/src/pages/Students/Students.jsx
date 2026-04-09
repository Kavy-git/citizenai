import CategoryPage from '../../components/common/CategoryPage'
import { SCHEMES } from '../../data/schemes'


export default function Students() {
   
  return (
    <CategoryPage
      icon="🎓"
      title="Students"
      subtitle="Scholarships, internships, exams & free certifications"
      color="#60a5fa"
      schemes={SCHEMES.students}
    />
  )
}

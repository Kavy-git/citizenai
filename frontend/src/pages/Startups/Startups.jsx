import { useLocation } from "react-router-dom"
import { useEffect } from "react"


export default function Startups() {

 

  return (
    <CategoryPage
      icon="🚀"
      title="Startups"
      subtitle="Startup funding, MSME loans, grants & incubation"
      color="#fbbf24"
      schemes={SCHEMES.startups}
    />
  )
}
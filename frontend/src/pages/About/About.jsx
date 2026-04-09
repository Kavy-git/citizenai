import { useNavigate } from "react-router-dom"
import { CATEGORIES } from "../../data/schemes"
import "./About.css"

export default function About() {

  const navigate = useNavigate()

  const VALUES = [
    {
      icon: "🤝",
      title: "Accessibility",
      body: "We believe every citizen should easily access information about government benefits."
    },
    {
      icon: "⚡",
      title: "Simplicity",
      body: "Complex government policies are simplified using AI-powered explanations."
    },
    {
      icon: "🔍",
      title: "Transparency",
      body: "All schemes are linked to official government portals for verification."
    },
    {
      icon: "🇮🇳",
      title: "Impact",
      body: "Our mission is to help Indian citizens discover opportunities that improve lives."
    }
  ]

  return (
    <section className="about-page">

      {/* HERO */}
      <div className="about-hero">

        <h1 className="about-title">
          The Intelligence Behind <br/>
          <span> Citizen AI</span>
        </h1>

        <p className="about-subtitle">
          Citizen AI bridges the gap between Indian citizens and the hundreds
          of government welfare schemes, scholarships, subsidies, and opportunities
          that exist — but often go unclaimed due to lack of awareness.
        </p>

      </div>


      {/* ABOUT GRID */}
      <div className="about-grid">

        {/* IMAGE CARD */}
        <div className="about-card image-card">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            alt="team"
          />
        </div>

        {/* TEXT CARD */}
        <div className="about-card text-card">

          <h3>Why We Built Citizen AI</h3>

          <p>
            Government schemes are scattered across dozens of portals,
            often written in complex bureaucratic language. Most eligible
            citizens never discover the benefits they deserve.
          </p>

          <p>
            Citizen AI simplifies this process using artificial intelligence
            to match citizens with relevant government schemes instantly.
          </p>

          <p>
            Our goal is simple — ensure every Indian citizen can easily
            discover and access the benefits created for them.
          </p>

        </div>

      </div>


      {/* VALUES */}
      <div className="section">

        <h2 className="section-title">Our Values</h2>

        <div className="about__values">

          {VALUES.map(v => (

            <div key={v.title} className="about__value-card">

              <div className="about__value-icon">
                {v.icon}
              </div>

              <div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* CATEGORIES */}
      <div className="section">

        <h2 className="section-title">
          Categories Covered
        </h2>

        <div className="about__cats">

          {CATEGORIES.map(cat => (

            <button
              key={cat.id}
              className="about__cat"
              onClick={() => navigate(cat.path)}
              style={{ "--cat-color": cat.color }}
            >

              <span>{cat.icon}</span>
              <span>{cat.label}</span>

            </button>

          ))}

        </div>

      </div>


      {/* DISCLAIMER */}
      <div className="about__disclaimer">

        <strong>⚠️ Disclaimer:</strong>

        Citizen AI is an independent information platform.
        All scheme details are for informational purposes only.
        Always verify information on official government websites.
        We are not affiliated with any government body.

      </div>

    </section>
  )
}
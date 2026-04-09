import { useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'
import { CATEGORIES, SCHEMES } from '../../data/schemes'
import CountUp from "react-countup"
import { motion } from "framer-motion"
import { useRef } from "react"

import {
  GraduationCap,
  Wheat,
  Briefcase,
  Rocket,
  Accessibility,
  HeartHandshake
} from "lucide-react"

import './Home.css'

const ICON_MAP = {
  students: <GraduationCap size={36} />,
  farmers: <Wheat size={36} />,
  women: <HeartHandshake size={36} />,
  jobs: <Briefcase size={36} />,
  seniors: <Accessibility size={36} />,
  entrepreneurs: <Rocket size={36} />
}

/* CATEGORY COVER IMAGES */

const CATEGORY_IMAGES = {
  students:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  farmers:
    "https://images.openai.com/static-rsc-3/O08gobJYywenhbDQAvOAbuXrJviYJD_X_Qj7e4ZEKiNWCsjhNk1KZVVItSJUENJM3PPwg82bEcPZfLSQvHors4_7YFJozwvrV5ySuGYvPH0?purpose=inline",
  women:
    "https://images.openai.com/static-rsc-3/zWw0CiWP7wOxufGZXru-6RKkzNXXx1Dc-XiF0xoHye1EMY3ijOUaF9k5bWhKUmuLnyszlQUnaWjYBmLUd9z_CZlGirPdUpQQj9nBB1i1LdE?purpose=inline",
  jobs:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  seniors:
    "https://images.openai.com/static-rsc-3/wElr3oeBBg3mZ5WbZbSgpXt1ZiB8fw2vyvcoXz-6SO3tGk-hGIRnOtqwC1WvcHIDPah6wBI7FkrKoZ2-ublvxAS1dpU5CaoklbIm47zM45Q?purpose=inline",
  disabled:
    "https://images.openai.com/static-rsc-3/Q2mnRoPvwO7ONNNB-d7FUgFzcG4nDYYm5hTuxEAp6E0yHt1S9Nj0poNZgtT2h-XMrYS7XThMCbv7N3JvYtKx9e0HeKLepK3yYgmQs7XJcyA?purpose=inline",
  startups:
    "https://photos.peopleimages.com/picture/202205/2467541-diverse-group-of-entrepreneurs-business-people-working-on-laptops-and-writing-notes-while-sitting-around-a-table-in-a-shared-coworking-office-space-fit_400_400.jpg"
}

const STATS = [
  { value: 30, label: 'Schemes Listed', icon: '📋' },
  { value: 7, label: 'Categories', icon: '🗂️' },
  { value: 0, label: 'Cost to Citizens', icon: '💚' },
  { value: 100, label: 'Official Sources', icon: '🏛️' },
]

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    role: 'Student, Karnataka',
    text: 'Found the Vidyasiri scholarship in minutes. Got ₹24,000 for my college fees!',
    avatar: 'https://i.pravatar.cc/48?img=47'
  },
  {
    name: 'Ramesh K.',
    role: 'Farmer, Punjab',
    text: 'PM Kisan registration done in one click. Now I receive ₹6,000 every year directly.',
    avatar: 'https://i.pravatar.cc/48?img=12'
  },
  {
    name: 'Anita M.',
    role: 'Entrepreneur, Mumbai',
    text: 'Got MUDRA loan details and applied instantly. My small business is now running!',
    avatar: 'https://i.pravatar.cc/48?img=32'
  },
]

export default function Home() {

  const navigate = useNavigate()
  const { openChat } = useChat()

  const sliderRef = useRef()
  const trendingRef = useRef()

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }
  const slideTrendingLeft = () => {
  trendingRef.current.scrollBy({
    left: -320,
    behavior: "smooth"
  })
}

const slideTrendingRight = () => {
  trendingRef.current.scrollBy({
    left: 320,
    behavior: "smooth"
  })
}

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero__photo-bg" />
        <div className="hero__overlay-bottom" />
        <div className="hero__overlay-top" />
        <div className="hero__overlay-sides" />

        <div className="hero__content">

          <h1 className="hero__title">
            Find Government Schemes<br />
            <span className="hero__title-green">That Belong to You</span>
          </h1>

          <p className="hero__subtitle">
            Hundreds of welfare programs, scholarships, and subsidies —
            simplified and explained in plain language.
          </p>

          <div className="hero__actions">
            <button
              className="btn--hero-primary"
              onClick={() => navigate('/eligibility-checker')}
            >
              Check My Eligibility →
            </button>

            <button
              className="btn--hero-outline"
              onClick={openChat}
            >
              💬 Ask AI Assistant
            </button>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats-section">

        <div className="stats-inner">

          {STATS.map((s, i) => (

            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >

              <div className="stat-item__icon">{s.icon}</div>

              <div className="stat-item__value">
                <CountUp end={s.value} duration={2} />{s.value !== 0 && '+'}
              </div>

              <div className="stat-item__label">
                {s.label}
              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* CATEGORIES SLIDER */}
      <section className="categories-section page-container">

        <div className="section-tag">Browse by Category</div>
        <h2 className="section-heading">Who Are You?</h2>

        <div className="category-slider">

          <button className="slider-btn left" onClick={slideLeft}>
            ←
          </button>

          <div className="cat-slider-track" ref={sliderRef}>

            {CATEGORIES.map((cat, i) => (

              <motion.div
                key={cat.id}
                className="cat-card-slider"
                onClick={() => navigate(cat.path)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >

                <div
                  className="cat-card-image"
                  style={{
                    backgroundImage: `url(${CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.students})`
                  }}
                >
                  <div className="cat-card-overlay" />
                </div>

                <div className="cat-card__body">

                  <div className="cat-card__label">
                    {cat.label}
                  </div>

                  {/* description intentionally hidden */}

                  {/* scheme meta intentionally hidden */}

                </div>

              </motion.div>

            ))}

          </div>

          <button className="slider-btn right" onClick={slideRight}>
            →
          </button>

        </div>

      </section>

      {/* TRENDING */}
<section className="trending-section page-container">

  <div className="section-tag">Trending Schemes</div>
  <h2 className="section-heading">Popular Government Schemes</h2>

  <div className="trending-slider">

    <button className="slider-btn left" onClick={slideTrendingLeft}>
      ←
    </button>

    <div className="trending-track" ref={trendingRef}>

     {[
  { name: "PM Kisan", benefit: "₹6000 annual farmer support", badge: "🔥 Trending", path: "/farmers" },
  { name: "Mudra Loan", benefit: "Loans for small businesses", badge: "💰 Popular", path: "/startups" },
  { name: "National Scholarship", benefit: "Scholarships for students", badge: "🎓 Students", path: "/students" },
  { name: "Startup India", benefit: "Support for new startups", badge: "🚀 Startup", path: "/startups" },
  { name: "Ayushman Bharat", benefit: "Free healthcare insurance", badge: "🏥 Healthcare", path: "/seniors" }
].map((s, i) => (

  <motion.div
    key={s.name}
    className="trending-card"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.15 }}
  >

    <div className="scheme-badge">
      {s.badge}
    </div>

    <h3>{s.name}</h3>
    <p>{s.benefit}</p>

    {/* FIXED BUTTON */}
    <button
      className="btn--hero-outline"
      onClick={() => navigate(s.path)}
    >
      View Details →
    </button>

  </motion.div>

))}

    </div>

    <button className="slider-btn right" onClick={slideTrendingRight}>
      →
    </button>

  </div>

</section>
      {/* HOW IT WORKS */}
      <section className="how-section">

        <div className="how-inner page-container">

          <div className="section-tag">Simple Process</div>
          <h2 className="section-heading">How Citizen AI Works</h2>

          <div className="how-steps">

            {[
              { n: '01', icon: '🎯', title: 'Choose Your Profile', desc: 'Select your category.' },
              { n: '02', icon: '🤖', title: 'AI Matches Schemes', desc: 'Citizen AI finds eligible schemes.' },
              { n: '03', icon: '🚀', title: 'Apply Directly', desc: 'Apply via official portal.' },
            ].map((s, i) => (

              <motion.div
                key={s.n}
                className="how-step"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >

                <div className="how-step__num">{s.n}</div>
                <div className="how-step__icon">{s.icon}</div>

                <h3>{s.title}</h3>
                <p>{s.desc}</p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      {/* SUCCESS STORIES */}
<section className="success-section page-container">

  <div className="success-layout">

    {/* LEFT SIDE INTRO */}

    <div className="success-intro">

      <div className="quote-icon">“</div>

      <h2 className="section-heading">
        Real Citizens.<br/>Real Benefits.
      </h2>

      <p className="success-desc">
        Thousands of people across India have already discovered 
        government benefits through Citizen AI. These success 
        stories show how the platform helps citizens find the 
        schemes they deserve.
      </p>
      
{/* NEW BUTTON */}
  <button className="feedback-btn">
    Give Feedback
  </button>


    </div>

    {/* RIGHT SIDE CARDS */}

    <div className="success-cards">

      {TESTIMONIALS.map((t, i) => (

        <motion.div
          key={i}
          className="success-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
        >

          <div className="success-card-quote">“</div>

          <p className="success-text">
            {t.text}
          </p>

          <div className="success-user">

            <img
              src={t.avatar}
              alt={t.name}
              className="success-avatar"
            />

            <div>
              <div className="success-name">{t.name}</div>
              <div className="success-role">{t.role}</div>
            </div>

          </div>

        </motion.div>

      ))}

    </div>

  </div>

</section>

    </div>
  )
}
import "./About.scss"

import { Link } from "react-router-dom"

export default function About() {


  return (
    <div className="about">
      <h3>About Angelo Boxing Coach</h3>

      <p>ABC lets you train and work on boxing combos like never before! Never the same workout twice, never the same round twice - a new way to think about your boxing training. Include your favorite combos profiles, go for completely random ones, you choose how to customize your experience! Curious? Get to training right now by <Link to="/train">visiting the Training page</Link>. No sign-up, no email, no code to enter - just boxing!</p>
      
      <h3>Why "Angelo"?</h3>
      
      <div className="about__img-container">
        <img className="about__img" src={require("../../assets/images/Angelo.webp")} alt="Angelo Dundee and Mohammad Ali"/>
        <p className="about__img-caption">Angelo Dundee and one of his most famous proteges, Muhammad Ali</p>
      </div>
      
      
      <p>Angelo Dundee was born in the 20s and was one, if not the, most renowned boxing coaches of history. He most notably was Muhammad Ali's trainer for virtually all of his career, and coached greats like Sugar Ray Leonard, Jimmy Ellis, Willie Pastrano and George Foreman</p>
      <p>Famed for his technical abilities such as dressing and closing cuts as well as his handling of his trainees, he is also generally portrayed as a genuine nice person who played by the rules - a rare achievement in the often world of boxing.</p>
      <p>As a coach myself, I am always inspired by those working behind the scenes. Never a boxer himself, Angelo spent every waking hour honing his craft and becoming the best coach he could be, and that in itself is a precious thing and a feat to be celebrated.</p>
    </div>
  )
}
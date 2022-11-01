import "./About.scss"

export default function About() {


  return (
    <div className="about">
      <h3>About Angelo Boxing Coach</h3>
      <div className="about__img-container">
        <img className="about__img" src={require("../../assets/images/Angelo.webp")} alt="Angelo Dundee and Mohammad Ali"/>
        <p className="about__img-caption">Angelo Dundee and one of his most famous proteges, Muhammad Ali</p>
      </div>
      
      <p>Angelo Dundee was born in the 20s and was one, if not the, most renowned boxing coaches of history. He most notably was Muhammad Ali's trainer for virtually all of his career, and coached greats like Sugar Ray Leonard, Jimmy Ellis, Willie Pastrano and George Foreman</p>
      <p>Famed for his technical abilities such as dressing and closing cuts as well as his handling of his trainees, he is also generally portrayed as a genuine nice person who played by the rules - a rare feat in the boxing world.</p>
    </div>
  )
}
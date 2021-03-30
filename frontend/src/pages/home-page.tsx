import React, { FC } from "react";

const HomePage: FC = () => (
  <main className="px-3 is-flex-grow-1">
    <figure className="image is-128x128 is-pulled-left m-2">
      <img src="/static/images/about.jpg" alt="" />
    </figure>
    <div className="has-text-justified">
      <div className="block">
        Hola! Me llamo Georgina y soy Nutricionista, nacida en Santa Fe.
      </div>
      <div className="block">
        Tengo un hijo de 2 años que se llama Bauti, él es el amor de mi vida. Lo
        van a ver mucho por acá, pues mamá full time. Él me acompaña, prueba
        todas las recetas y le encantan las frutas. Fiel hijo de nutricionista,
        vamos atravesando juntos la aventura de comer rico y sano.
      </div>
      <div className="block">
        A lo largo de los años me fui especializando en Nutrición Clínica en
        Adultos a través de diversas experiencias laborales y capacitaciones. No
        hubo año que no haya hecho un curso, jornada, postgrado, maestría,
        diplomatura. Soy muy inquieta y amo lo que hago, siempre voy por más.
      </div>
      <div className="block">
        En estos 9 años que llevo ejerciendo, comprobé que una mala alimentación
        afecta la calidad de vida de las personas en todos sus sentidos, más
        allá de su salud física. Por eso, decidí trabajar en educación
        alimentaria. Esto significa un desafío continuo, ya que no exagero si
        digo que en general comemos mal, no conocemos la variedad de alimentos
        que existen, nos fijamos en las calorías y no la calidad, no nos hacemos
        tiempo para cocinar, y puedo seguir.
      </div>
      <div className="block">
        Con mucha complicidad y risas voy ayudando a mis pacientes. Es un
        desafío constante que puedan atravesar cambios con naturalidad, que no
        sea algo insostenible y pasajero, yo estoy ahí en cada paso. Lo mejor de
        este trabajo son ellos, sin duda.
      </div>
      <div className="block">
        Mi objetivo es ser feliz con lo que hago, y lo soy. Pero mi deseo real
        tiene que ver con acompañarlos a ustedes en este proceso de cambio de
        alimentación y estilo de vida saludable.
      </div>
      <div className="block">
        Hay una familia y amigos hermosos que acompañan a la par. Hay equipo.
      </div>
      <div className="block">
        Soy una nutri en construcción, aprendo para ustedes y con ustedes.
      </div>
      <div className="block">
        Espero que se sumen a esta comunidad hermosa que crece día a día.
      </div>
      <div className="block">Gracias!</div>
    </div>
  </main>
);

export default HomePage;

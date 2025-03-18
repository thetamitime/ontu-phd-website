//import Image from "next/image";
import { NavigationBar } from "@/ui/NavigationBar";
import { ProgramCardSmall } from "@/ui/ProgramCards";
import { programs } from "../lib/json/Programs.json";

export default function Home() {
  const photoUrl =
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Admin Bar + Navigation */}
      <header>
        <NavigationBar />
      </header>

      {/* Banner */}
      <section
        className="hero min-h-[60dvh] items-end justify-items-start"
        style={{
          backgroundImage: `url(${photoUrl})`,
        }}
      >
        <div className="hero-overlay bg-neutral/70"></div>
        <div className="hero-content text-neutral-content mx-auto mb-[5vh] text-center md:m-[5vw] md:text-left">
          <div className="max-w-md">
            <h2 className="mb-3 text-4xl font-bold md:text-5xl">Вітаємо!</h2>
            <p className="mb-8">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-accent">Умови вступу</button>
          </div>
        </div>
      </section>

      {/* Main Information */}
      <main className="m-auto w-[80%]">
        {/* Programs Section */}
        <section className="section">
          <h3 className="header">Акредитовані галузі</h3>
          <div className="flex flex-wrap content-center items-stretch justify-center gap-6">
            {programs.map((program) => (
              <ProgramCardSmall
                key={program.id}
                id={program.id}
                degree={program.degree}
                fieldOfKnowledge={program.fieldOfKnowledge}
                link={program.link}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

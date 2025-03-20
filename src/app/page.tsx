import { ProgramCardSmall } from "@/ui/components/ProgramCards";
import { programs } from "../lib/json/Programs.json";
import { workers } from "../lib/json/Workers.json";
import { news } from "../lib/json/News.json";
import { FacultyCard } from "@/ui/components/FacultyCard";
import { NewsCardLarge, NewsCardMedium } from "@/ui/components/NewsCards";

export default function Home() {
  const photoUrl =
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [firstNewsCard, ...newsCards] = news;

  return (
    <main className="bg-base-200 min-h-full">
      {/* Banner */}
      <section
        className="hero min-h-[65dvh] items-end justify-items-start"
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
      <div className="m-auto mt-10 mb-20 w-[90%] lg:w-[80%]">
        {/* Programs Section */}
        <section className="section">
          <h3 className="header">Галузі знань</h3>
          <div className="wrapper gap-6">
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

        {/* Faculty Section */}
        <section className="section">
          <h3 className="header">Наші співробітники</h3>
          <div className="wrapper gap-7">
            {workers.map((worker) => (
              <FacultyCard
                key={worker.id}
                id={worker.id}
                name={worker.name}
                photo={worker.photo}
                post={worker.post}
              />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="section">
          <h3 className="header">Останні новини</h3>
          <div className="col grid w-full items-stretch gap-6 md:grid-cols-2 md:grid-rows-3">
            <div className="row-span-3">
              <NewsCardLarge
                id={firstNewsCard.id}
                category={firstNewsCard.category}
                date={new Date(firstNewsCard.date)}
                photo={firstNewsCard.photo}
                title={firstNewsCard.title}
                description={firstNewsCard.description}
                link={firstNewsCard.link}
              />
            </div>
            {newsCards.map((newsCard) => (
              <NewsCardMedium
                key={newsCard.id}
                id={newsCard.id}
                category={newsCard.category}
                date={new Date(newsCard.date)}
                photo={newsCard.photo}
                title={newsCard.title}
                description={newsCard.description}
                link={newsCard.link}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

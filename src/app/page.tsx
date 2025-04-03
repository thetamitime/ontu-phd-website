import { ProgramCardSmall } from "@/ui/components/ProgramCards";
import { FacultyCard } from "@/ui/components/FacultyCard";
import Link from "next/link";
import { getProgramFields } from "@/lib/api/programs";
import { getLatestNews } from "@/lib/api/news";
import { getAllEmployees } from "@/lib/api/employees";
import { NewsCardMedium, NewsCardLarge } from "@/ui/components";

export default async function Home() {
  const photoUrl =
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const programFields = await getProgramFields();
  const employees = await getAllEmployees();
  const latestNews = await getLatestNews();
  const [firstLatestNews, ...restLatestNews] = latestNews;

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
            <Link href="/apply-documents" className="btn btn-accent">
              Умови вступу
            </Link>
          </div>
        </div>
      </section>

      {/* Main Information */}
      <div className="m-auto mt-10 mb-30 w-[90%] lg:w-[80%]">
        {/* Programs Section */}
        <section className="section mt-0">
          <div className="wrapper gap-6">
            {programFields.map((field) => (
              <ProgramCardSmall
                key={field.id}
                id={field.id}
                degree={field.degree}
                fieldOfStudy={field.fieldOfStudy}
              />
            ))}
          </div>
          <Link
            href={"/programs"}
            className="link md:link-hover text-base-content/40 mt-5"
          >
            Усі програми
          </Link>
        </section>

        {/* Faculty Section */}
        <section className="section">
          <h3 className="header">Наші співробітники</h3>
          <div className="wrapper gap-7">
            {employees.map((worker) => (
              <FacultyCard
                key={worker.id}
                id={worker.id}
                name={worker.name}
                photo={worker.photo}
                position={worker.position}
              />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="section">
          <h3 className="header">Останні новини</h3>
          <div className="grid w-full items-stretch gap-6 md:grid-cols-2 md:grid-rows-3">
            <div className="row-span-3">
              <NewsCardLarge
                id={firstLatestNews.id}
                title={firstLatestNews.title}
                summary={firstLatestNews.summary}
                mainTag={firstLatestNews.mainTag}
                thumbnail={firstLatestNews.thumbnail}
                date={firstLatestNews.date}
              />
            </div>
            {restLatestNews.map((newsCard) => (
              <NewsCardMedium
                key={newsCard.id}
                id={newsCard.id}
                summary={newsCard.summary}
                date={newsCard.date}
                title={newsCard.title}
                mainTag={newsCard.mainTag}
              />
            ))}
          </div>
          <Link
            href={"/news"}
            className="link md:link-hover text-base-content/40 mt-5"
          >
            Усі новини
          </Link>
        </section>
      </div>
    </main>
  );
}

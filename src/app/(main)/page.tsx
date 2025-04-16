import Link from "next/link";
import { getLatestNews } from "@/lib/api/news";
import { getAllEmployees } from "@/lib/api/employees";
import { getAllFields } from "@/lib/api/fields";
import {
  FacultyCard,
  NewsCardLarge,
  NewsCardMedium,
  ProgramCardSmall,
} from "@/ui/components";

export default async function Home() {
  const photoUrl =
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const programFields = await getAllFields();
  const employees = await getAllEmployees();
  const latestNews = await getLatestNews();
  const [firstLatestNews, ...restLatestNews] = latestNews;

  console.log(programFields);

  return (
    <>
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

      {/* Main information */}
      <div className="container">
        {/* Programs section */}
        <section className="section">
          <h3 className="sr-only">Галузі знань</h3>
          <div className="flex-wrapper mt-6">
            {programFields.map((field, index) => (
              <ProgramCardSmall
                key={index}
                degree={field.degree}
                name={field.name}
              />
            ))}
          </div>
          <Link
            href={"/programs"}
            className="link md:link-hover text-base-content/40"
          >
            Усі програми
          </Link>
        </section>

        {/* Faculty section */}
        <section className="section">
          <h3 className="header mt-12! mb-6!">Наші співробітники</h3>
          <div className="flex-wrapper">
            {employees.map((worker) => (
              <FacultyCard
                key={worker.id}
                id={worker.id}
                name={worker.name}
                photoPath={worker.photoPath}
                position={worker.position}
              />
            ))}
          </div>
        </section>

        {/* News section */}
        <section className="section">
          <h3 className="header mt-12! mb-6!">Останні новини</h3>
          <div className="grid w-[75%] items-stretch gap-6 md:grid-cols-2 md:grid-rows-3">
            <div className="row-span-3">
              {/* Newest news */}
              <NewsCardLarge
                id={firstLatestNews.id}
                title={firstLatestNews.title}
                summary={firstLatestNews.summary}
                mainTag={firstLatestNews.mainTag}
                thumbnailPath={firstLatestNews.thumbnailPath}
                publicationDate={firstLatestNews.publicationDate}
              />
            </div>
            {/* Other latest news */}
            {restLatestNews.map((newsCard) => (
              <NewsCardMedium
                key={newsCard.id}
                id={newsCard.id}
                summary={newsCard.summary}
                publicationDate={newsCard.publicationDate}
                title={newsCard.title}
                mainTag={newsCard.mainTag}
              />
            ))}
          </div>
          <Link
            href={"/news"}
            className="link md:link-hover text-base-content/40 mt-1.5"
          >
            Усі новини
          </Link>
        </section>
      </div>
    </>
  );
}

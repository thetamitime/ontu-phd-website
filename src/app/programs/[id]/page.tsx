import { programs } from "@/lib/json/Programs.json";
import { Program } from "@/lib/types";
import React from "react";
import { TableLarge, TableSimple } from "@/ui/components/Tables";
import { ArrowUpRight, FileDown } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program: Program | undefined = programs.find(
    (obj) => obj.id.toString() === id,
  );

  return (
    <div className="lg:grid lg:grid-cols-[auto_auto] lg:gap-10">
      {/*Main program content*/}
      <article className="flex flex-col gap-12 pb-20 [&_p]:mb-2">
        {/*Main Section*/}
        <section id="main">
          <h2 className="header mb-0 text-start md:w-[80%]">
            {program?.title}
          </h2>
          {/*Field and Specialty Badges*/}
          <div className="flex flex-wrap gap-2 pt-2 pb-6">
            <div className="badge badge-lg badge-primary badge-soft h-fit">
              {program?.fieldOfKnowledgeCode} {program?.fieldOfKnowledge}
            </div>
            <div className="badge badge-lg badge-primary badge-soft h-fit">
              {program?.specialtyCode} {program?.specialty}
            </div>
          </div>
          {/*
          //TODO:
          //implement очна (денна) та заочна logic based on modeOfStudy (array?)
          */}
          <p>
            <b>Форма навчання:</b> {`${program?.modeOfStudy}`}
          </p>
          <p>
            <b>Основна мета програми:</b>{" "}
            {program?.description.toLocaleLowerCase()}
          </p>
          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:inline-grid md:grid-cols-[auto_1fr] md:grid-rows-2">
            {/*Years*/}
            <SmallCardWithNumber num="4 роки" caption="тривалість навчання" />
            {/*Credits*/}
            <div className="md:row-start-2">
              <SmallCardWithNumber
                num={program?.credits}
                caption="кількість кредитів"
              />
            </div>
            {/*Costs Table*/}
            <div className="flex flex-col gap-4 pl-2 md:col-span-2 md:col-start-2 md:row-span-2">
              <h3 className="text-lg font-bold">
                Вартість навчання (2024/2025 н.р.)
              </h3>
              <div className="rounded-box border-base-content/5 w-full max-w-[100vw] flex-1 overflow-x-auto border md:max-w-full">
                <TableSimple />
              </div>
            </div>
          </div>
        </section>

        {/*Program Characteristics*/}
        <section id="characteristics">
          <Title text="Характеристики програми" />
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="title"> Предметна область </h4>
              <p>
                Об&#39;єкт вивчення: теорія, методологія наукового дослідження,
                феномени, явища і проблеми сучасних економічних процесів та
                систем.
              </p>
              <p>
                Цілі навчання: підготовка висококваліфікованих фахівців, які
                володіють теорією, методологією й інструментарієм проведення
                наукових досліджень, здатних створювати і продукувати нові
                знання для розвитку економіки, викладання фахових дисциплін.
              </p>
              <p>
                Теоретичний зміст: теоретико-методологічні засади дослідження та
                розв`язання актуальних завдань у сфері економіки, що створюють
                підґрунтя для інноваційних рішень теоретичного та прикладного
                спрямування.
              </p>
              <p>
                Методи, методики та технології включають систему
                загальнонаукових та спеціальних методів, методик та технологій,
                застосування яких уможливлює виконання оригінального наукового
                дослідження у сфері економіки, результати якого мають наукову
                новизну, теоретичну та практичну цінність.
              </p>
              <p>
                Інструменти та обладнання: інформаційно-комунікаційні системи,
                пакети прикладних програм, прилади та обладнання, необхідні для
                виконання наукових досліджень та забезпечення інноваційних
                технологій викладання в сфері економіки.
              </p>
            </div>
            <div>
              <h4 className="title"> Основний фокус програми </h4>
              <p>
                Акцент робиться на вирішенні широкого спектру наукових
                управлінських і економічних завдань промисловості у
                фінансовоекономічній, інформаційно-аналітичній (діагностичній),
                обліковоконтрольній, проектній сферах.
              </p>
            </div>
            <div>
              <h4 className="title"> Особливості програми </h4>
              <p>
                Програма охоплює дисципліни, що передбачають поєднання
                теоретичних аспектів із практичними прикладами майбутньої
                діяльності, що дозволяє здобувачам освіти набути необхідних
                навичок. Орієнтована на глибоку професійну підготовку сучасних
                фахівців, підприємців, аналітиків, експертів, ініціативних та
                здатних до швидкої адаптації до сучасного глобального
                бізнес-середовища. Формує фахівців економістів з новим
                перспективним способом мислення, здатних не лише застосовувати
                існуючі методи дослідження, але й розробляти нові на базі
                сучасних наукових досягнень, впроваджувати інноваційні проекти у
                переробці харчової сировини та виробництві продовольства,
                міжнародній торгівлі, готельно-ресторанному господарстві,
                туризмі.
              </p>
              <p>
                Освітньо-наукова програма передбачає поєднання теоретичних знань
                та практичну (в т.ч. педагогічну) підготовку. Навчання
                проводиться в активному дослідницькому науковому середовищі, що
                передбачає Використання інтерактивних, відкритих та проблемних
                лекцій, семінарів і круглих столів із запрошенням відомих
                фахівців і практиків з економіки та суміжних галузей знань,
                участь у бізнес-тренінгах, використання кейс-методів, а також
                застосування сучасних освітніх інформаційно комунікаційних
                технологій і т.ін.
              </p>
            </div>
          </div>
        </section>

        {/*Job Opportunities*/}
        <section id="job">
          <Title text="Працевлаштування" />
          <div className="flex flex-wrap gap-4">
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Голова правління
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Голова ради директорів
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-1 font-normal">
                  Директор (начальник) організації (дослідної, проектної)
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Президент компанії
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Начальник управління
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Директор науково-дослідного інституту
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Начальник відділу
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">Асистент</h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Викладач вищого навчального закладу
                </h4>
              </div>
            </div>
            <div className="card card-border border-base-300 bg-base-100">
              <div className="card-body grow-0">
                <p className="text-base-content/40">1210.1</p>
                <h4 className="card-title -mt-2 font-normal">
                  Молодший науковий співробітник (економіка)
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/*Competences*/}
        <section id="competences">
          <Title text="Програмні компетентності" />
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="title"> Інтегральна компетентність </h4>
              <p>
                Здатність продукувати нові ідеї, розв`язувати комплексні
                проблеми у сфері економіки, а також проводити власне наукове
                дослідження, результати якого мають наукову новизну, теоретичне
                та практичне значення, що передбачає глибоке переосмислення
                наявних та створення нових цілісних знань та/або професійної
                практики.
              </p>
            </div>
            <div>
              <h4 className="title"> Загальні компетентності </h4>
              <p>
                ЗК1. Здатність до абстрактного мислення, аналізу та синтезу.
              </p>
              <p>
                ЗК2. Здатність до пошуку, оброблення та аналізу інформації з
                різних джерел.
              </p>
              <p>ЗК3. Здатність працювати в міжнародному контексті.</p>
              <p>ЗК4. Здатність генерувати нові ідеї (креативність).</p>
              <p>
                ЗК5. Здатність розв`язувати комплексні проблеми економіки на
                основі системного наукового світогляду та загального культурного
                кругозору із дотриманням принципів професійної етики та
                академічної доброчесності.
              </p>
            </div>
            <div>
              <h4 className="title"> Спеціальні (фахові) компетентності </h4>
              <p>
                СК1. Здатність виконувати оригінальні дослідження, досягати
                наукових результатів, які створюють нов знання в економіці та
                дотичних до неї міждисциплінарних напрямах і можуть бути
                опубліковані у провідних наукових виданнях з економіки та
                суміжних галузей.
              </p>
              <p>
                СК2. Здатність усно і письмово презентувати та обговорювати
                результати наукових досліджень та/або інноваційних розробок
                українською та англійською мовами.
              </p>
              <p>
                СК3. Здатність використовувати сучасні методології, методи та
                інструменти емпіричних і теоретичних досліджень у сфері
                економіки, методи комп`ютерного моделювання, сучасні цифрові
                технології, бази даних та інші електронні ресурси,
                спеціалізоване програмне забезпечення у науковій та науково-
                педагогічній діяльності.
              </p>
              <p>
                СК4. Здатність здійснювати науково-педагогічну діяльність у
                закладах вищої освіти.
              </p>
              <p>
                СК5. Здатність виявляти, поглиблено аналізувати та вирішувати
                проблеми дослідницького характеру у сфері економіки з
                врахуванням економічних ризиків та можливих
                соціально-економічних наслідків, оцінювати та забезпечувати
                якість виконуваних досліджень, у тому числі з питань
                європейської та Євроатлантичної інтеграції.
              </p>
              <p>
                СК6. Здатність обґрунтовувати та готувати економічні рішення на
                основі розуміння закономірностей розвитку соціально-економічних
                систем і процесів із застосуванням математичних методів та
                моделей.
              </p>
              <p>
                СК7. Здатність ініціювати, розробляти і реалізовувати комплексні
                наукові проєкти в економіці та дотичні до неї міждисциплінарні
                підходи, проявляти лідерство та відповідальність при їх
                реалізації; комерціалізувати результати наукових досліджень та
                забезпечувати дотримання прав інтелектуальної власності.
              </p>
              <p>
                СК8. Здатність генерувати інноваційні рішення з підвищення
                ефективності функціонування соціально-економічних систем,
                оптимізувати такі рішення та оцінювати їх ефективність.
              </p>
            </div>
          </div>
        </section>

        {/*Results*/}
        <section id="results">
          <Title text="Програмні результати навчання" />
          <div>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
            <p>
              РН01. Мати передові концептуальні та методологічні знання з
              економіки, управління соціально- економічними системами і на межі
              предметних галузей, а також дослідницькі навички, достатні для
              проведення фундаментальних і прикладних досліджень на рівні
              світових досягнень з відповідного напряму.
            </p>
          </div>
        </section>

        {/*Components Table*/}
        <section id="components">
          <Title text="Перелік компонент програми" />
          <div className="rounded-box border-base-content/5 bg-base-100 m-auto w-[85dvw] overflow-auto border md:w-full">
            <TableLarge />
          </div>
          <p className="text-base-content/40 mt-2 text-sm">
            *є можливість вибору дисципліни з іншої освітньої програми
          </p>
        </section>
      </article>

      {/*Menu*/}
      <nav className="sticky top-0 self-start overflow-visible">
        <ul className="menu bg-base-200 rounded-box text-base font-medium [&_a]:px-4 [&_a]:py-3">
          <li>
            <a href="#main">Головна інформація</a>
          </li>
          <li>
            <a href="#characteristics">Характеристики програми</a>
          </li>
          <li>
            <a href="#job">Працевлаштування</a>
          </li>
          <li>
            <a href="#competences">Програмні компетентності</a>
          </li>
          <li>
            <a href="#results">Результати навчання</a>
          </li>
          <li>
            <a href="#components">Перелік компонент програми</a>
          </li>
          <div className="divider m-0.5 px-2"></div>
          <li>
            <a href="" role="button">
              Cайт кафедри
              <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href="" role="button">
              Документ програми
              <FileDown size={22} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const SmallCardWithNumber: React.FC<{
  num: string | undefined;
  caption: string;
}> = ({ num, caption }) => {
  const [firstHalfCaption, secondHalfCaption] = caption.split(" ", 2);

  return (
    <div className="card card-sm card-border overflow-hidden">
      <div className="card-body bg-base-100 items-center px-8 pb-2">
        <p className="text-center text-sm">
          {firstHalfCaption} <br /> {secondHalfCaption}
        </p>
        <p className="card-title text-xl">{num}</p>
      </div>
    </div>
  );
};

const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <h3 className="sub-header">{text}</h3>
      <div className="divider mt-1"></div>
    </>
  );
};

import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { ContactsMap, ContactCard } from "@/ui/components";
import { Contact } from "@/lib/types/contact";

const contactsUniversity: Contact[] = [
  { icon: <Mail />, title: "Пошта", caption: "phddoc.ontu@gmail.com" },
  { icon: <Phone />, title: "Телефон", caption: "048-712-41-56" },
  {
    icon: <ExternalLink />,
    title: "Ватсап-канал",
    caption: "Аспірантура-Вступ 2024 ОНТУ",
    href: "https://t.me/+G8MXnXUvKWI2ODVi",
  },
  {
    icon: <MapPin />,
    title: "Адреса",
    caption:
      "вул. Канатна, 112, Одеський національний технологічний університет, каб. А-215",
  },
];

const facultyMemberContacts: Contact[] = [
  {
    icon: <Phone />,
    title: "Людмила Березовська",
    caption: "097-733-01-60",
  },
];

export default function ContactsPage() {
  return (
    <div className="container">
      <h2 className="header">Контакти</h2>
      <div className="grid items-start gap-6 md:grid-cols-2 md:grid-rows-[auto_1fr] lg:grid-cols-[0.3fr_0.7fr] lg:grid-rows-[auto_auto] lg:items-stretch">
        <ContactCard
          title={"Відділ аспірантури і докторантури"}
          contacts={contactsUniversity}
          isSecondary={false}
        />
        <ContactCard
          title={"Завідувачка відділу аспірантури і докторантури"}
          contacts={facultyMemberContacts}
          isSecondary={true}
        />
        <div className="h-[50dvh] md:col-span-2 md:h-[80dvh] lg:row-span-2 lg:row-start-1 lg:h-full">
          <ContactsMap />
        </div>
      </div>
    </div>
  );
}

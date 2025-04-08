import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Contact } from "@/lib/types";

interface ContactCardProps {
  title: string;
  contacts: Contact[];
  isSecondary?: boolean;
}

export const ContactCard = ({
  title,
  contacts,
  isSecondary,
}: ContactCardProps) => {
  return (
    <>
      <div
        className={`card bg-base-100/80 card-border border-base-300 w-fit p-6 ${isSecondary && "lg:col-start-1 lg:row-start-2"}`}
      >
        <div className="card-title text-xl">{title}</div>
        <div className="card-body gap-3 px-0 pb-0">
          {contacts.map((contact) => (
            <div key={uuidv4()}>
              <div className="flex flex-row items-center gap-2 text-lg font-medium">
                {!isSecondary && contact.icon}{" "}
                {/*display icon only if it's not faculty card*/}
                {contact.title}
              </div>
              <div className="mt-2 text-base font-normal">
                {/*
                //if contact has link -> display caption as link
                //else if contact is faculty member display caption with icon
                //else display just caption
                */}
                {contact.href ? (
                  <Link href={contact.href} className="link">
                    {contact.caption}
                  </Link>
                ) : isSecondary ? (
                  <div className="flex flex-row items-center gap-2">
                    {contact.icon} {contact.caption}
                  </div>
                ) : (
                  contact.caption
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

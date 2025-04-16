export const ContactsMap = () => {
  const mapSource =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.905158289013!2d30.74253339165407!3d46.45945528024109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633d77bbf5f0b%3A0x1d1d936df1b2aa29!2z0J7QtNC10YHRjNC60LjQuSDQvdCw0YbRltC-0L3QsNC70YzQvdC40Lkg0YLQtdGF0L3QvtC70L7Qs9GW0YfQvdC40Lkg0YPQvdGW0LLQtdGA0YHQuNGC0LXRgg!5e0!3m2!1sen!2sua!4v1743274640553!5m2!1sen!2sua";

  return (
    <iframe
      src={mapSource}
      width={"100%"}
      height="100%"
      className="border-base-300 rounded-lg border"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

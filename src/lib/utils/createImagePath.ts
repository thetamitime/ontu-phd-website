export const createImagePath = (main: string, id: number, image: string) => {
  const route = process.env.NEXT_PUBLIC_API_URL;
  return `${route}/files/uploads/${main}/${id}/${image}`;
};

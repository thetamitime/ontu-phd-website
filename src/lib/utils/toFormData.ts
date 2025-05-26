export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  }
  return formData;
};

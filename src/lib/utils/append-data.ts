type FormDataValue = string | number | boolean | File | null;
type FormDataEntry =
  | FormDataValue
  | FormDataObject
  | FormDataValue[]
  | FormDataObject[];

type FormDataObject = {
  [key: string]: FormDataEntry;
};

export function appendToFormData(
  formData: FormData,
  prefix: string,
  value: FormDataEntry,
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendToFormData(formData, `${prefix}[${index}]`, item);
    });
  } else if (
    typeof value === "object" &&
    value !== null &&
    !(value instanceof File)
  ) {
    for (const subKey in value) {
      if (Object.prototype.hasOwnProperty.call(value, subKey)) {
        appendToFormData(formData, `${prefix}.${subKey}`, value[subKey]);
      }
    }
  } else if (value !== undefined && value !== null) {
    formData.append(prefix, value.toString());
  }
}

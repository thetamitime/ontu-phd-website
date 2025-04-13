"use client";

import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/lib/utils/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value);
        console.log(value);
        router.push("/dashboard");
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
  });

  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field name="email">
            {(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Email:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div>
          <form.Field name="name">
            {(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Last Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => {
            return (
              <>
                <button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Submit"}
                </button>
                <button type="reset" onClick={() => form.reset()}>
                  Reset
                </button>
              </>
            );
          }}
        </form.Subscribe>
      </form>
    </div>
  );
}

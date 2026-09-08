"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to sign in."
        );

        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (loginError) {
      console.error(
        "Admin login error:",
        loginError
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-50/30 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-primary-100 bg-white p-7 shadow-sm sm:p-8">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
              <ShieldCheck
                size={26}
                className="text-primary"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-primary">
              Ihesie Natural Health
            </p>

            <h1 className="mt-2 font-heading text-3xl font-bold text-primary-hover">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-muted">
              Sign in to manage orders and
              consultation bookings.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-primary-hover"
              >
                Email
              </label>

              <div className="relative mt-2">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="admin@ihesienaturalhealth.com"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-primary-100
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-primary-hover"
              >
                Password
              </label>

              <div className="relative mt-2">
                <LockKeyhole
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter password"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-primary-100
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl
                bg-primary
                px-5
                font-medium
                text-white
                transition
                hover:bg-primary-hover
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Booking = {
  id: string;
  name: string;
  meetingTitle: string;
  date: string;
  startTime: string;
  endTime: string;
};

type SupabaseBookingRecord = {
  id: string;
  name: string;
  meeting_title: string;
  date: string;
  start_time: string;
  end_time: string;
  created_at: string | null;
};

const tabLabels = ["Booking", "Booked"] as const;

export default function HomePage() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabLabels)[number]>("Booking");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    meetingTitle: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasFormFilled = useMemo(
    () => Object.values(formValues).every((value) => value.trim().length > 0),
    [formValues],
  );

  const loadBookings = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from<SupabaseBookingRecord>("bookings")
      .select("*")
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    setIsLoading(false);

    if (error) {
      console.error("Supabase fetch error:", error.message);
      setErrorMessage("Unable to load bookings. Please try again.");
      return;
    }

    if (data) {
      setBookings(
        data.map((record) => ({
          id: record.id,
          name: record.name,
          meetingTitle: record.meeting_title,
          date: record.date,
          startTime: record.start_time,
          endTime: record.end_time,
        })),
      );
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasFormFilled) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const bookingPayload = {
      name: formValues.name.trim(),
      meeting_title: formValues.meetingTitle.trim(),
      date: formValues.date,
      start_time: formValues.startTime,
      end_time: formValues.endTime,
    };

    const { error } = await supabase
      .from<SupabaseBookingRecord>("bookings")
      .insert(bookingPayload);

    setIsSubmitting(false);

    if (error) {
      console.error("Supabase insert error:", error.message);
      setErrorMessage("Unable to save booking. Please try again.");
      return;
    }

    setFormValues({
      name: "",
      meetingTitle: "",
      date: "",
      startTime: "",
      endTime: "",
    });
    setActiveTab("Booked");
    await loadBookings();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/80 ring-1 ring-slate-200">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Meeting Room
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Book your next meeting
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              A simple local booking app demo using Next.js App Router,
              TypeScript, and Tailwind.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm">
            {tabLabels.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === "Booking" ? (
          <section>
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Your name
                  </span>
                  <input
                    value={formValues.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    placeholder="Alex Morgan"
                    type="text"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Meeting title
                  </span>
                  <input
                    value={formValues.meetingTitle}
                    onChange={(event) =>
                      handleChange("meetingTitle", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    placeholder="Project kickoff"
                    type="text"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Date
                  </span>
                  <input
                    value={formValues.date}
                    onChange={(event) =>
                      handleChange("date", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    type="date"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Start time
                  </span>
                  <input
                    value={formValues.startTime}
                    onChange={(event) =>
                      handleChange("startTime", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    type="time"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    End time
                  </span>
                  <input
                    value={formValues.endTime}
                    onChange={(event) =>
                      handleChange("endTime", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    type="time"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500">
                  {errorMessage
                    ? "Something went wrong. Check your input and try again."
                    : "Book a room and view it in the Booked tab."}
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={!hasFormFilled || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Add booking"}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section>
            <div className="space-y-4">
              {isLoading ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                  Loading bookings...
                </div>
              ) : errorMessage ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                  {errorMessage}
                </div>
              ) : bookings.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
                  No bookings yet. Add one from the Booking tab.
                </div>
              ) : (
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {booking.meetingTitle}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            Booked by {booking.name}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                          {booking.date}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Start
                          </p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">
                            {booking.startTime}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            End
                          </p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">
                            {booking.endTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

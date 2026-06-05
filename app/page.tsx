"use client";

import { useMemo, useState } from "react";

type Booking = {
  id: string;
  name: string;
  meetingTitle: string;
  date: string;
  startTime: string;
  endTime: string;
};

const initialBookings: Booking[] = [
  {
    id: "1",
    name: "Alex Morgan",
    meetingTitle: "Design review",
    date: "2026-06-10",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "2",
    name: "Priya Singh",
    meetingTitle: "Sprint planning",
    date: "2026-06-11",
    startTime: "14:00",
    endTime: "15:00",
  },
];

const tabLabels = ["Booking", "Booked"] as const;

export default function HomePage() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabLabels)[number]>("Booking");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [formValues, setFormValues] = useState({
    name: "",
    meetingTitle: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const hasFormFilled = useMemo(
    () => Object.values(formValues).every((value) => value.trim().length > 0),
    [formValues],
  );

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasFormFilled) {
      return;
    }

    const newBooking: Booking = {
      id: String(Date.now()),
      name: formValues.name.trim(),
      meetingTitle: formValues.meetingTitle.trim(),
      date: formValues.date,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
    };

    setBookings((current) => [newBooking, ...current]);
    setFormValues({
      name: "",
      meetingTitle: "",
      date: "",
      startTime: "",
      endTime: "",
    });
    setActiveTab("Booked");
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

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={!hasFormFilled}
                >
                  Add booking
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section>
            <div className="space-y-4">
              {bookings.length === 0 ? (
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

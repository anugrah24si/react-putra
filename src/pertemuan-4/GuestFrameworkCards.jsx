export default function GuestFrameworkCards({ frameworks }) {
    // Function ini untuk menampilkan data framework dalam bentuk card untuk tampilan Guest.
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((item) => (
                <article
                    key={item.id}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/95 text-slate-900 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-950/20"
                >
                    <div className="relative aspect-4/3 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white">
                            <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold backdrop-blur">
                                {item.category}
                            </span>
                            <span className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-black text-slate-950">
                                {item.rating.toFixed(1)} / 5
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3 p-5">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-950">
                                {item.name}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                {item.location}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                            <div className="rounded-2xl bg-slate-100 px-3 py-2">
                                <span className="block text-xs uppercase tracking-wide text-slate-500">
                                    Rating
                                </span>
                                <span className="font-semibold text-slate-900">
                                    {item.rating}
                                </span>
                            </div>
                            <div className="rounded-2xl bg-slate-100 px-3 py-2">
                                <span className="block text-xs uppercase tracking-wide text-slate-500">
                                    Location
                                </span>
                                <span className="font-semibold text-slate-900">
                                    {item.location}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
export default function AdminFrameworkTable({ frameworks }) {
    // Function ini untuk menampilkan data framework dalam bentuk table untuk tampilan Admin.
    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-950/30">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
                    <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {frameworks.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 font-semibold text-white">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-slate-300">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4 text-slate-300">
                                    {item.location}
                                </td>
                                <td className="px-6 py-4 font-semibold text-cyan-300">
                                    {item.rating.toFixed(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
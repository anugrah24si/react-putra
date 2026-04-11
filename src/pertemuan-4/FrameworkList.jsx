import { useState } from "react";
import frameworkData from "./framework.json";
import GuestFrameworkCards from "./GuestFrameworkCards";
import AdminFrameworkTable from "./AdminFrameworkTable";

export default function FrameworkList() {
    /** Deklarasi state **/
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedCategory: "",
        selectedLocation: "",
        viewMode: "guest",
    });

    // Function ini untuk menangani perubahan input search, filter, dan toggle mode.
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    };

    /** Deklarasi Logic Search & Filter **/
    // Function ini untuk mengubah teks search menjadi lowercase agar pencarian konsisten.
    const searchTerm = dataForm.searchTerm.toLowerCase();

    // Function ini untuk memfilter data berdasarkan nama, category, dan location.
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch = framework.name.toLowerCase().includes(searchTerm);
        const matchesCategory = dataForm.selectedCategory
            ? framework.category === dataForm.selectedCategory
            : true;
        const matchesLocation = dataForm.selectedLocation
            ? framework.location === dataForm.selectedLocation
            : true;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    /** Deklarasi unique data frameworkData **/
    // Function ini untuk mengambil daftar category unik sebagai opsi filter.
    const allCategories = [
        ...new Set(frameworkData.map((framework) => framework.category)),
    ];
    // Function ini untuk mengambil daftar location unik sebagai opsi filter.
    const allLocations = [
        ...new Set(frameworkData.map((framework) => framework.location)),
    ];

    // Function ini untuk merender konten sesuai mode Guest atau Admin.
    const renderContent = () => {
        if (dataForm.viewMode === "guest") {
            return <GuestFrameworkCards frameworks={filteredFrameworks} />;
        }

        return <AdminFrameworkTable frameworks={filteredFrameworks} />;
    };

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur">
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
                                Pertemuan 4
                            </p>
                            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Framework Explorer
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                Cari berdasarkan nama, kombinasikan filter kategori dan lokasi, lalu ubah tampilan antara Guest dan Admin menggunakan data yang sama.
                            </p>
                        </div>

                        <div className="inline-flex rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
                            <button
                                type="button"
                                onClick={() =>
                                    setDataForm((previousState) => ({
                                        ...previousState,
                                        viewMode: "guest",
                                    }))
                                }
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                    dataForm.viewMode === "guest"
                                        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30"
                                        : "text-slate-300 hover:text-white"
                                }`}
                            >
                                Guest
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setDataForm((previousState) => ({
                                        ...previousState,
                                        viewMode: "admin",
                                    }))
                                }
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                    dataForm.viewMode === "admin"
                                        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30"
                                        : "text-slate-300 hover:text-white"
                                }`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <input
                            type="text"
                            name="searchTerm"
                            placeholder="Search by name..."
                            value={dataForm.searchTerm}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400"
                        />

                        <select
                            name="selectedCategory"
                            value={dataForm.selectedCategory}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                        >
                            <option value="">All Categories</option>
                            {allCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            name="selectedLocation"
                            value={dataForm.selectedLocation}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
                        >
                            <option value="">All Locations</option>
                            {allLocations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                        <span>
                            Showing {filteredFrameworks.length} of {frameworkData.length} data
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1">
                            {dataForm.viewMode === "guest" ? "Tampilan Guest" : "Tampilan Admin"}
                        </span>
                    </div>
                </div>

                {renderContent()}

                {filteredFrameworks.length === 0 && (
                    <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300">
                        Tidak ada data yang cocok dengan kombinasi search dan filter saat ini.
                    </div>
                )}
            </div>
        </div>
    );
}
export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900">
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Selesai
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/login"
              className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-sm px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            <span className="block mb-2">Jadwalmu banyak.</span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kami yang ingatkan.
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Atur jadwal dan pengingat, terima email tepat waktu,
            tanpa aplikasi tambahan. Fokus pada pekerjaan, bukan mengingatnya.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="/register"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              <span className="flex items-center justify-center gap-2">
                Mulai Gratis
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="#how-it-works"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 group flex items-center gap-2"
            >
              <span>Lihat cara kerja</span>
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-slate-500">Ketepatan waktu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-slate-500">Pengguna aktif</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-slate-500">Biaya bulanan</div>
            </div>
          </div>
        </div>

        {/* Right - Email Mockup with Animation */}
        <div className="relative animate-float">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20"></div>
          <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="text-sm text-slate-500 ml-auto">📧</div>
            </div>
            
            <div className="text-sm text-slate-500 mb-2 font-medium">
              Subject: Pengingat — Submit Proposal
            </div>
            <div className="space-y-4 text-slate-700">
              <p>Hai Jokowi,</p>
              <p>
                Ini pengingat untuk jadwal:
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="font-semibold text-lg">
                  "Submit proposal klien A"
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  ⏰ Hari ini, 16:00
                </p>
              </div>
              <p className="text-sm pt-4 border-t border-slate-100">
                Pastikan dokumen sudah lengkap dan siap dikirim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Cara kerja yang <span className="text-blue-600">sederhana</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hanya tiga langkah untuk mengatur semua pengingatmu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "1",
              title: "Buat jadwal",
              description: "Tambahkan manual atau import dari Excel.",
              icon: "📅",
              color: "from-blue-500 to-cyan-500"
            },
            {
              number: "2",
              title: "Atur pengingat",
              description: "Tentukan waktu pengingat sesuai kebutuhanmu.",
              icon: "⏰",
              color: "from-purple-500 to-pink-500"
            },
            {
              number: "3",
              title: "Terima email",
              description: "Kami kirimkan pengingat tepat waktu.",
              icon: "📧",
              color: "from-green-500 to-emerald-500"
            }
          ].map((step, index) => (
            <div 
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl mb-6`}>
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="text-sm text-slate-500">Langkah {step.number}/3</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY EMAIL ================= */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Kenapa pengingat lewat <span className="text-blue-600">email</span>?
              </h2>
              
              <div className="space-y-6">
                {[
                  "✓ Tidak mudah terlewat - Email ada di inbox utama",
                  "✓ Bisa dibaca ulang kapan saja - Arsip otomatis tersimpan",
                  "✓ Cocok untuk kerja profesional - Format formal & lengkap",
                  "✓ Akses di semua device - Buka di ponsel, tablet, atau laptop",
                  "✓ Notifikasi ganda - Email + reminder browser"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white/70 rounded-xl backdrop-blur-sm hover:bg-white transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <span className="text-slate-700 group-hover:text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-4">Efektivitas Terbukti</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700">Email Reminder</span>
                    <span className="font-bold text-blue-600">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700">Push Notification</span>
                    <span className="font-bold text-slate-600">68%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-slate-400 rounded-full h-2" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700">SMS Reminder</span>
                    <span className="font-bold text-slate-600">45%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-slate-400 rounded-full h-2" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-12 text-center text-lg text-slate-600 italic max-w-2xl mx-auto">
            "Jika email penting selalu kamu baca, kenapa pengingat tidak?"
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700"></div>

        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Fokus <span className="text-yellow-300">menyelesaikan</span> pekerjaan.
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Bukan mengingatnya.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/register"
              className="group px-10 py-5 rounded-2xl bg-white text-blue-600 font-bold hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg inline-flex items-center gap-3"
            >
              <span>Buat Jadwal Pertamamu</span>
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </a>
            
            <a
              href="/demo"
              className="px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Lihat Demo
            </a>
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-blue-100 text-lg">
              🎁 <span className="font-semibold">Gratis selamanya</span> untuk 100 jadwal pertama
            </p>
            <p className="text-sm text-blue-200 opacity-90">
              Tidak perlu kartu kredit • Daftar dalam 30 detik • Batal kapan saja
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200/50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Selesai
              </div>
              <span className="text-sm text-slate-600">© {new Date().getFullYear()} — Ingatkan yang penting</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">
                Tentang
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">
                Kontak
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">
                Blog
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">
                GitHub
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform">
                Kebijakan Privasi
              </a>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300">
                in
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-500">
            Dibuat dengan ❤️ untuk produktivitas yang lebih baik
          </div>
        </div>
      </footer>
    </div>
  );
}

// Tambahkan style animasi ke global CSS atau inline style
const styles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in 0.6s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;

// Tambahkan styles ke komponen
export function HomepageStyles() {
  return <style>{styles}</style>;
}
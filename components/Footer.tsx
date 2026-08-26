export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 sm:px-6">
        <p>eSIM 電話網 — 展示用專案，方案與電信商資料為模擬內容，並未串接真實電信商 API。</p>
        <p className="mt-1">© {new Date().getFullYear()} eSIM 電話網 Demo</p>
      </div>
    </footer>
  );
}

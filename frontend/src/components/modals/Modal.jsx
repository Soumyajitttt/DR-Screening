export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
        <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="font-helvetica-neue text-lg font-medium text-[#010110]">{title}</h3>
          <button onClick={onClose} className="text-xl text-[#8a8f98] transition-colors hover:text-[#010110]">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

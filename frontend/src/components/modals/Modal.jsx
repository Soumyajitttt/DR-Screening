export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

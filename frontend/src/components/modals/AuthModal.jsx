import Modal from "./Modal";

export default function AuthModal({ open, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire up to a real auth flow.
    onClose();
  }

  return (
    <Modal open={open} title="Login / Register" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clinicianId">Clinician ID / Email</label>
          <input id="clinicianId" type="text" placeholder="PHC-RAMPUR-102" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="********" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </Modal>
  );
}

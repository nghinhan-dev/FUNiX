export default function ChatRoom() {
  return (
    <div id="chatRoom" className="card">
      <div className="card-header bg-white d-flex align-items-center justify-content-between">
        <p>CUSTOMER SUPPORT</p>
        <span className="bg-light">Let&apos;s Chap App </span>
      </div>
      <div className="card-body"></div>
      <div className="card-footer">
        <label className="d-flex align-items-center justify-content-between">
          <input type="text" placeholder="Enter Your Message !" />
          <div className="d-flex align-items-center justify-content-between">
            <i className="fa-solid fa-paperclip"></i>
            <i className="fa-solid fa-face-smile"></i>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </label>
      </div>
    </div>
  );
}

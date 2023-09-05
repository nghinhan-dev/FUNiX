export default function AddUser() {
  return (
    <section id="render_data">
      <>
        <div className="header">
          <h3>Add User</h3>
          <button className="btn btn-add" type="submit">
            Submit
          </button>
        </div>
        <div className="add-form-container">
          <div className="table_container add-display main-shadow">
            <code>
              <p className="bracket">{`{`}</p>
              <p>
                username: <span>sillywhale</span>,
              </p>
              <p>
                password: <span>123456</span>,
              </p>
              <p>
                fullName: <span>Nguyen Nghi Nhan</span>,
              </p>
              <p>
                phoneNumber: <span>763218899</span>,
              </p>
              <p>
                email: <span>sillywhale@sw.com</span>,
              </p>
              <p>
                isAdmin: <span>true</span>,
              </p>
              <p className="bracket">{`}`}</p>
            </code>
          </div>
          <div className="form-inputs">
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" name="password" />
            </div>
            <div>
              <label htmlFor="confirm">Confirm password</label>
              <input type="text" name="confirm" />
            </div>
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input type="text" name="fullname" />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div>
              isAdmin
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </>
    </section>
  );
}

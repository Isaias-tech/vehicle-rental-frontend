export const CarReports = () => {
  return (
    <main className="container w-full min-h-[71.4vh] h-full flex flex-row justify-center items-center">
      <div className="card bg-base-100 w-96 shadow-xl border-slate-200 border-2">
        <div className="card-body">
          <h2 className="card-title mb-4">Create report</h2>
          <div className="container">
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Name" />
            </label>
            <div className="navbar bg-base-300 rounded-box">
              <div className="flex-1 px-2 lg:flex-none">
                <a className="text-lg font-bold">Reports</a>
              </div>
              <div className="flex flex-1 justify-end px-2">
                <div className="flex items-stretch">
                  <a className=" btn btn-ghost rounded-btn btn-primary">
                    Create report
                  </a>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost rounded-btn"
                    >
                      Select type
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
                    >
                      <li>
                        <a>Financial report</a>
                      </li>
                      <li>
                        <a>Car report</a>
                      </li>
                      <li>
                        <a>Client report</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

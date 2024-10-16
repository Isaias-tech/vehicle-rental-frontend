const Tableclients = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Licence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
              </td>
              <td>Email</td>
              <td>Phone number</td>
              <td>Licence</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tableclients;

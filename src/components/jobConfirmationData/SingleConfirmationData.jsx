// SingleJsonForm.js
import React from "react";

export default function SingleConfirmationData({ data }) {
  if (!data) return null;

  return (
    <div
      className="upload-card card p-4 shadow rounded m-4"
      style={{ width: "400px" }}
    >
      <div className="container mt-3">
        <h4>{data.filename}</h4>
        <form>
          {Object.entries(data).map(([key, value]) => (
            <div className="form-floating mb-3" key={key}>
              <input
                type="text"
                className="form-control"
                id={key}
                placeholder={`Enter ${key}`}
                name={key}
                value={String(value)}
                disabled
              />
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import React from "react";

export default function ManyConfirmationsData({ data }) {
  if (!data || data.length < 2) return null;

  const reversedData = [...data].reverse();

  return (
    <div
      className="accordion card p-4 shadow rounded m-4"
      id="jsonAccordion"
      style={{ width: "400px" }}
    >
      {reversedData.map((obj, index) => {
        const collapseId = `collapse-${index}`;
        const headingId = `heading-${index}`;
        return (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={collapseId}
              >
                {obj.filename || `Unnamed File ${data.length - index}`}
              </button>
            </h2>
            <div
              id={collapseId}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              aria-labelledby={headingId}
              data-bs-parent="#jsonAccordion"
            >
              <div className="accordion-body">
                <form>
                  {Object.entries(obj).map(([key, value]) => (
                    <div className="form-floating mb-3" key={key}>
                      <input
                        type="text"
                        className="form-control"
                        id={`${key}-${index}`}
                        placeholder={`Enter ${key}`}
                        name={key}
                        value={String(value)}
                        disabled
                      />
                      <label htmlFor={`${key}-${index}`}>{key}</label>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

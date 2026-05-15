// src/components/FieldReports.jsx
export default function FieldReports({ destination }) {
  const { blogHtml, fieldReports } = destination;

  return (
    <div className="fieldreports">
      {/* BLOG SECTION */}
      {blogHtml && (
        <section className="blog-section">
          <h2>Destination Guide</h2>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogHtml }}
          />
        </section>
      )}

      {/* FIELD REPORTS SECTION */}
      <section className="reports-section">
        <h2>Recent Field Reports</h2>

        {(!fieldReports || fieldReports.length === 0) && (
          <p>No field reports yet.</p>
        )}

        {fieldReports &&
          fieldReports
            .filter((r) => r.isApproved)
            .map((report) => (
              <div key={report.id} className="report-card">
                <p><strong>Date:</strong> {report.visitDate}</p>
                <p><strong>Coral Health:</strong> {report.coralHealth}</p>
                <p><strong>Visibility:</strong> {report.visibility} ft</p>
                <p><strong>Notes:</strong> {report.notes}</p>

                {report.fishLife && report.fishLife.length > 0 && (
                  <p>
                    <strong>Wildlife:</strong>{" "}
                    {report.fishLife.map((f) => f.name).join(", ")}
                  </p>
                )}
              </div>
            ))}
      </section>
    </div>
  );
}

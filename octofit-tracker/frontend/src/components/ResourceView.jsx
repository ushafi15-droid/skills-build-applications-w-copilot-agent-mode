function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (typeof value === 'object') {
    return (
      value.displayName ||
      value.name ||
      value.username ||
      value.email ||
      value._id ||
      JSON.stringify(value)
    )
  }

  return String(value)
}

export default function ResourceView({
  title,
  description,
  records,
  isLoading,
  error,
  columns,
}) {
  return (
    <section>
      <div className="mb-4">
        <h1 className="h2 mb-1">{title}</h1>
        <p className="text-body-secondary">{description}</p>
      </div>

      {isLoading && (
        <div className="d-flex align-items-center gap-2 text-body-secondary" role="status">
          <span aria-hidden="true" className="spinner-border spinner-border-sm" />
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!isLoading && !error && records.length === 0 && (
        <div className="alert alert-info" role="status">
          No {title.toLowerCase()} to display yet.
        </div>
      )}

      {!isLoading && !error && records.length > 0 && (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id || record.id || index}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {displayValue(column.value ? column.value(record) : record[column.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

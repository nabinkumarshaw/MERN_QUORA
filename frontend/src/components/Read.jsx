import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Something went wrong');
    } else {
      setSuccessMessage("Deleted Successfully");

      setTimeout(() => {
        setSuccessMessage(""); // Clear success message
        getData(); // Refresh the data
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch('http://localhost:5000');
      const result = await response.json();

      if (!response.ok) {
        console.error(result.error || 'Something went wrong');
        setError(result.error || 'Something went wrong');
      } else {
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Unable to fetch data. Please try again later.');
    }
  }

  return (
    <div className="container my-2">
      {/* Display error alert */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display success alert */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <h2 className="text-center">All Data</h2>

      <div className="row">
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {ele.email}
                  </h6>
                  <p className="text-muted">{ele.age}</p>
                  <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>
                    Delete
                  </a>
                  <Link to={`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Read;

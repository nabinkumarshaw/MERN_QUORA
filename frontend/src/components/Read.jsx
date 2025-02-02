import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [commentText, setCommentText] = useState({});
  const [likes, setLikes] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => { getData(); }, []);

  async function getData() {
    try {
      const response = await fetch('http://localhost:5000');
      const result = await response.json();
      if (!response.ok) setError(result.error || 'Something went wrong');
      else setData(result);
    } catch (err) {
      setError('Unable to fetch data. Please try again later.');
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, { method: "DELETE" });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Something went wrong');
    } else {
      setSuccessMessage("Deleted Successfully");
      setTimeout(() => {
        setSuccessMessage("");
        getData();
      }, 1000);
    }
  };

  return (
    <div className="container my-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <h2 className="text-center" style={styles.header}>All Posts</h2>
      <div style={styles.cardRow}>
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-12 mb-4" style={styles.cardContainer}>
              <div className="card" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title" style={styles.cardTitle}>{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary" style={styles.username}>{ele.email}</h6>
                  <textarea
                    readOnly
                    style={styles.textArea}
                    value={ele.post}
                  />

                  <div style={styles.buttonGroup}>
                    <button onClick={() => handleDelete(ele._id)} style={styles.deleteButton}>Delete</button>
                    <Link to={`/${ele._id}`} style={styles.editButton}>Edit</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (<p>No data available.</p>)}
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: 'maroon',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    borderRadius: '8px',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: '500px',
  },
  card: {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    background: 'linear-gradient(to right, #ff9966, #ff5e62)',
    color: 'white',
    padding: '20px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  username: {
    fontStyle: 'italic',
  },
  textArea: {
    width: '100%',
    minHeight: '100px',
    backgroundColor: '#ffe5d9',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    resize: 'none',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  deleteButton: {
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  editButton: {
    backgroundColor: '#1d3557',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#c53030',
  },
  editButtonHover: {
    backgroundColor: '#16324f',
  },
};

export default Read;

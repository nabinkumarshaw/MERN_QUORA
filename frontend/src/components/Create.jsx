import React, { useState } from 'react';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [post, setPost] = useState('');
  const [error, setError] = useState('');

  console.log(name, email, post);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, post };

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      body: JSON.stringify(addUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error || 'Something went wrong');
      setError(result.error || 'Something went wrong');
    } else {
      console.log(result);
      setError('');
      setName('');
      setEmail('');
      setPost('');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        {error && <div style={styles.alert}>{error}</div>}
        <h2 style={styles.title}>Enter the Data</h2>
        <form onSubmit={handlesubmit}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Post</label>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
  },
  container: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    width: '400px',
    textAlign: 'center',
  },
  alert: {
    background: '#ffdddd',
    color: '#d8000c',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    textAlign: 'left',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    color: '#fff',
    background: '#6e8efb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default Create;

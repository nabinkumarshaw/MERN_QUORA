import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [post, setPost] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const getSingleUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${id}`);
            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Something went wrong');
            } else {
                setError('');
                setName(result.name);
                setEmail(result.email);
                setPost(result.post || ''); // Ensure post is a string
            }
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to fetch user details');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedUser = { name, email, post }; // Update with post message

        try {
            const response = await fetch(`http://localhost:5000/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Something went wrong');
            } else {
                setError('');
                navigate('/all'); // Redirect to '/all' after successful update
            }
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to update user');
        }
    };

    useEffect(() => {
        getSingleUser();
    }, []);

    return (
        <div className="container my-2">
            {error && <div className="alert alert-danger">{error}</div>}
            <h2 className="text-center">Edit the data</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Post</label>
                    <textarea
                        className="form-control"
                        value={post}
                        onChange={(e) => setPost(e.target.value)} // Use textarea for multi-line input
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Update;

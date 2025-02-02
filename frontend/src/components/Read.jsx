import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({});
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();
      if (!response.ok) setError(result.error || "Something went wrong");
      else {
        setData(result);
        // Initialize likes and comments states from the fetched data
        const initialLikes = {};
        const initialComments = {};
        result.forEach((post) => {
          initialLikes[post._id] = post.likes || false;
          initialComments[post._id] = post.comments || [];
        });
        setLikes(initialLikes);
        setComments(initialComments);
      }
    } catch (err) {
      setError("Unable to fetch data. Please try again later.");
    }
  }

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle like state
    }));
  };

  const toggleCommentBox = (id) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle comment box visibility
    }));
  };

  const handleCommentChange = (id, text) => {
    setComments((prev) => ({
      ...prev,
      [id]: text, // Save comment text as user types
    }));
  };

  const handleSaveComment = (id) => {
    if (!comments[id]) return;

    setData((prevData) =>
      prevData.map((post) =>
        post._id === id
          ? { ...post, comments: [...(post.comments || []), comments[id]] }
          : post
      )
    );

    setComments((prev) => ({ ...prev, [id]: "" }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      setData((prevData) => prevData.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container my-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center" style={styles.header}>All Posts</h2>
      <div style={styles.cardRow}>
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-12 mb-4" style={styles.cardContainer}>
              <div className="card" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title" style={styles.cardTitle}>{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary" style={styles.username}>{ele.email}</h6>
                  <textarea readOnly style={styles.textArea} value={ele.post} />

                  <div style={styles.buttonGroup}>
                    <button onClick={() => toggleLike(ele._id)} style={styles.iconButton}>
                      <FaHeart color={likes[ele._id] ? "red" : "white"} size={20} /> {likes[ele._id] ? "Unlike" : "Like"}
                    </button>
                    <button onClick={() => toggleCommentBox(ele._id)} style={styles.iconButton}>
                      <FaComment size={20} /> Comment
                    </button>
                  </div>

                  {showComments[ele._id] && (
                    <div style={styles.commentBox}>
                      <textarea
                        placeholder="Write a comment..."
                        style={styles.commentInput}
                        value={comments[ele._id] || ""}
                        onChange={(e) => handleCommentChange(ele._id, e.target.value)}
                      />
                      <button style={styles.saveButton} onClick={() => handleSaveComment(ele._id)}>
                        Save Comment
                      </button>
                    </div>
                  )}

                  {ele.comments && ele.comments.length > 0 && (
                    <div style={styles.commentList}>
                      {ele.comments.map((comment, index) => (
                        <div key={index} style={styles.commentItem}>
                          {comment}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={styles.buttonGroup}>
                    <button onClick={() => handleDelete(ele._id)} style={styles.deleteButton}>Delete</button>
                    <Link to={`/${ele._id}`} style={styles.editButton}>Edit</Link>
                  </div>
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

const styles = {
  header: {
    backgroundColor: "maroon",
    color: "white",
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
  },
  cardRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    maxWidth: "500px",
  },
  card: {
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    background: "linear-gradient(to right, #ff9966, #ff5e62)",
    color: "white",
    padding: "20px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  username: {
    fontStyle: "italic",
  },
  textArea: {
    width: "100%",
    minHeight: "100px",
    backgroundColor: "#ffe5d9",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    resize: "none",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontWeight: "bold",
  },
  commentBox: {
    marginTop: "10px",
    width: "100%",
  },
  commentInput: {
    width: "100%",
    minHeight: "50px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    resize: "none",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  commentList: {
    marginTop: "10px",
  },
  commentItem: {
    backgroundColor: "#ffeb3b",
    color: "#333",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
    fontWeight: "bold",
    border: "1px solid #ff9800",
  },
  deleteButton: {
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#1d3557",
    color: "white",
    padding: "10px 15px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Read;

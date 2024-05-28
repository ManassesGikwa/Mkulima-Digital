import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import Pagination from "react-bootstrap/Pagination";


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6); // Number of posts to display per page
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("/blogposts");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const postData = await response.json();
                setPosts(postData);
                setLoading(false); // Set loading to false when data is fetched successfully
            } catch (error) {
                setError(error); // Set error state if there's an error during fetching
                setLoading(false); // Set loading to false even in case of error
            }
        };

        fetchPosts();
    }, []);

    // Return loading indicator if posts are still being fetched
    if (loading) {
        return <h2 className="center">Loading...</h2>;
    }

    // Return error message if there's an error during fetching
    if (error) {
        return <h2 className="center">Error: {error.message}</h2>;
    }

    // Return message if no posts are found
    if (!posts || posts.length === 0) {
        return <h2 className="center">No Posts Found!</h2>;
    }

    // Get current posts based on pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="posts">
            <div className="container posts__container">
                {currentPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
            <Pagination className="justify-content-center">
                <Pagination.Prev
                    onClick={() =>
                        setCurrentPage((prevPage) =>
                            prevPage > 1 ? prevPage - 1 : prevPage
                        )
                    }
                    disabled={currentPage === 1}
                />
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(
                    (number) => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    )
                )}
                <Pagination.Next
                    onClick={() =>
                        setCurrentPage((prevPage) =>
                            prevPage <
                            Math.ceil(posts.length / postsPerPage)
                                ? prevPage + 1
                                : prevPage
                        )
                    }
                    disabled={
                        currentPage >=
                        Math.ceil(posts.length / postsPerPage)
                    }
                />
            </Pagination>
        </section>
    );
};

export default Posts;

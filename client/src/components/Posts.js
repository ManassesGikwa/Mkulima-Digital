import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import Pagination from "react-bootstrap/Pagination";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3); // Number of posts to display per page

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("/blogposts");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const postData = await response.json();
                setPosts(postData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    // Get current posts based on pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="posts">
            {posts.length > 0 ? (
                <>
                    <div className="container posts__container">
                        {currentPosts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>
                    <Pagination className="justify-content-center">
                        <Pagination.Prev
                            onClick={() =>
                                setCurrentPage(
                                    (prevPage) =>
                                        (prevPage > 1 ? prevPage - 1 : prevPage)
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
                                setCurrentPage(
                                    (prevPage) =>
                                        (prevPage <
                                        Math.ceil(posts.length / postsPerPage)
                                            ? prevPage + 1
                                            : prevPage)
                                )
                            }
                            disabled={
                                currentPage >=
                                Math.ceil(posts.length / postsPerPage)
                            }
                        />
                    </Pagination>
                </>
            ) : (
                <h2 className="center">No Posts Found!</h2>
            )}
        </section>
    );
};

export default Posts;

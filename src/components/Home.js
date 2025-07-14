import React from 'react';
import '../css/Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="home-container">
                <h1>The Kind Neighbors Initiative</h1>
                <div className="about-us">
                    <h2>About Us</h2>
                    <div className="about-text">
                    The Kind Neighbors Initiative is a non-profit that is looking to match people in search
                    of volunteer opportunities. We are a group of volunteers who are passionate about
                    helping others in need. We are looking for people who are willing to help us
                    by matching people with opportunities nearest to them and closely matches their skills.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
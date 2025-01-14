document.addEventListener("DOMContentLoaded", function() {
    // Initial post counts for each topic
    const postCounts = {
        software: 0,
        hardware: 0,
        bigdataAi: 0,
        computerData: 0,
        network: 0,
        data: 0,
    };

    // Function to update the post counts in the DOM
    function updatePostCounts() {
        for (const topic in postCounts) {
            document.getElementById(`${topic}-count`).textContent = postCounts[topic];
        }
    }

    // Simulate new posts being added every few seconds
    function simulateNewPosts() {
        setInterval(() => {
            const topics = Object.keys(postCounts);
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            postCounts[randomTopic]++;
            updatePostCounts();
        }, 5000); // Update every 5 seconds
    }

    // Event listener for clicking on a topic card
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            // Code to navigate to the respective topic page can be added here
            // For example, you could use window.location.href = `/${topic}.html`;
        });
    });

    // Initialize the post counts and start the simulation
    updatePostCounts();
    simulateNewPosts();
});

const newCommentHandler = async (event) => {

    const description = document.querySelector('#comment-desc').value.trim();
    const dataElement = document.getElementById('blogpost-id');
    var blogpost_id = dataElement.getAttribute('data-id');
    console.log(blogpost_id);
    if (description) {
        await fetch("/api/comments", {
            method: 'POST',
            body: JSON.stringify({ description, blogpost_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                fetch('/api/blogposts/' + blogpost_id, {
                    method: 'GET',
                });
            } else {
                alert('Failed to create comment');
            } 
        })
        
    }
}

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);
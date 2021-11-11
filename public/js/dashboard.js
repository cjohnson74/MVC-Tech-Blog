const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blogpost-name').value.trim();
    const description = document.querySelector('#blogpost-desc').value.trim();

    if (name && description) {
        const response = await fetch("/api/blogposts", {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create tech post');
        }
    }
};

// const newCommentHandler = async (event) => {
//     event.preventDefault();

//     const description = document.querySelector('#comment-desc').value.trime();

//     if (description) {
//         const response = await fetch("/api/comments", {
//             method: 'POST',
//             body: JSON.stringify({ description }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             console.log('Successfully created tech post')
//         } else {
//             alert('Failed to create tech post');
//         }
//     }
// }

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch('/api/blogposts/${id}', {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blogpost');
        }
    }
};

document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.blogpost-list')
    .addEventListener('click', delButtonHandler);

// document
//     .querySelector('.new-comment-form')
//     .addEventListener('click', newCommentHandler);
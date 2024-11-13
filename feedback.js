// feedback.js
const feedbackRoot = document.getElementById("feedback-root");

let rating = null;
let hover = null;
let submitted = false;
let comment = "";

// Handle rating selection
function handleRating(ratingValue) {
  rating = ratingValue;

  if (ratingValue === 4 || ratingValue === 5) {
    // Redirect immediately for 4-5 stars
    setTimeout(() => {
      window.location.href =
        "https://www.google.com/search?q=First+India+Credit&oq=First+India+Credit";
    }, 0);
  }
  renderFeedback();
}

// Handle comment input
function handleCommentInput(event) {
  comment = event.target.value;
}

// Handle form submission
function handleSubmit() {
  submitted = true;
  console.log("Rating:", rating);
  console.log("Comment:", comment);
  renderFeedback();
}

// Get emoji based on rating
function getEmoji() {
  if (rating === 1) return "😢";
  if (rating === 2) return "😕";
  if (rating === 3) return "😐";
  return null;
}

// Render the feedback component
function renderFeedback() {
  feedbackRoot.innerHTML = "";

  if (submitted && rating <= 3) {
    feedbackRoot.innerHTML = `
            <div class="feedback-submitted">
                <h1 class="feedback-thankyou">Thank you! ${getEmoji()}</h1>
                <p class="feedback-message">We appreciate your feedback.</p>
            </div>
        `;
  } else {
    feedbackRoot.innerHTML = `
            <div class="feedback-card">
                <div class="feedback-image">
                    <img src="1727438008481.jpg" alt="img" />
                </div>
                <div class="feedback-content">
                    <h1 class="feedback-title">Rate Your Experience</h1>

                    ${
                      rating && rating <= 3
                        ? `<div class="feedback-emoji">${getEmoji()}</div>`
                        : ""
                    }

                    <div class="feedback-stars">
                        ${[1, 2, 3, 4, 5]
                          .map(
                            (value) => `
                            <span 
                                class="feedback-star ${
                                  value <= (hover || rating)
                                    ? "star-selected"
                                    : "star-unselected"
                                }" 
                                data-value="${value}"
                                style="font-size: 40px; cursor: pointer;">
                                ★
                            </span>
                        `
                          )
                          .join("")}
                    </div>

                    ${
                      rating && rating <= 3
                        ? `
                        <div class="feedback-comment">
                            <textarea
                                placeholder="Please leave a comment..."
                                oninput="handleCommentInput(event)"
                            >${comment}</textarea>
                        </div>
                        <button onclick="handleSubmit()" class="feedback-submit">Submit your Feedback</button>
                    `
                        : ""
                    }
                </div>
            </div>
        `;

    // Add event listeners for stars
    const stars = document.querySelectorAll(".feedback-star");
    stars.forEach((star) => {
      const value = parseInt(star.getAttribute("data-value"));
      star.addEventListener("click", () => handleRating(value));
      star.addEventListener("mouseenter", () => {
        hover = value;
        renderFeedback();
      });
      star.addEventListener("mouseleave", () => {
        hover = null;
        renderFeedback();
      });
    });
  }
}

// Initial render
renderFeedback();

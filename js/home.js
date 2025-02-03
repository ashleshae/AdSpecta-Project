const texts = document.querySelectorAll('.carousel-text');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

// Function to update the active text and active dot
function showText(index) {
  texts.forEach((text, i) => {
    text.classList.remove('active'); // Remove active class from all
    if (i === index) {
      text.classList.add('active'); // Add active class to the current text
    }
  });

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-300px'; // Hide sidebar
    hamburgerMenu.style.display = 'block'; // Show menu button
  } else {
    sidebar.style.left = '0px'; // Show sidebar
    hamburgerMenu.style.display = 'none'; // Hide menu button
  }
}


// Event listener for next button
document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % texts.length; // Loop back to 0 after last text
  showText(currentIndex);
});

// Event listener for back button
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + texts.length) % texts.length; // Loop to last text when at the first
  showText(currentIndex);
});

// Event listener for dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentIndex = parseInt(dot.getAttribute('data-index'));
    showText(currentIndex);
  });
});

// Automatically change the text every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % texts.length; // Loop back to 0 after last text
  showText(currentIndex);
}, 2000); // Change every 3 seconds

// Initially show the first text
showText(currentIndex);

const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.toggle-icon');

      question.addEventListener('click', () => {
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
        icon.textContent = isVisible ? '+' : '-';
      });
    });

    // Show/hide "Move to Top" button on scroll
window.onscroll = function() {
  let moveToTop = document.getElementById("moveToTop");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      moveToTop.style.display = "block";
  } else {
      moveToTop.style.display = "none";
  }
};

// Scroll to top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

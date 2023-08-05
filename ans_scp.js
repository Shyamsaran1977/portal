document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".clickable-section");
    const contents = document.querySelectorAll(".content");

    sections.forEach(section => {
        section.addEventListener("click", function () {
            const target = this.getAttribute("data-target");
            const content = document.getElementById(target);

            contents.forEach(item => {
                item.style.display = "none"; // Hide all content
            });

            content.style.display = "block"; // Display the clicked content
        });
    });
});

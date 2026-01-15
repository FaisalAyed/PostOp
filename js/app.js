const jobs = [
  {
    tag: "NEW",
    title: "Post OP Mission",
    desc: "Deliver packages across the city and earn rewards.",
    bg: "mission-1.jpg",
    character: "character2.png",
  },
  {
    tag: "HOT",
    title: "Express Delivery",
    desc: "Fast deliveries with higher risk and better rewards.",
    bg: "mission-2.jpg",
    character: "character3.png",
  },
  {
    tag: "SECRET",
    title: "Important Delivery",
    desc: "High priority shipment. Handle with care.",
    bg: "mission-3.jpg",
    character: "character4.png",
  },
];

$(document).ready(function () {
  /* ===============================
     INITIAL STATE
     =============================== */
  $(".center .content-name, .right .content-name").hide();
  $('.center .content-name[data-page="home"]').show();
  $('.right .content-name[data-page="home"]').show();

  /* ===============================
     NAVIGATION
     =============================== */
  $(".nav-item").on("click", function () {
    const page = $(this).data("page");

    $(".center .content-name, .right .content-name").hide();
    $(`.center .content-name[data-page="${page}"]`).fadeIn(200);
    $(`.right .content-name[data-page="${page}"]`).fadeIn(200);

    $(".nav-item").removeClass("active");
    $(this).addClass("active");
  });

  /* ===============================
     CLOSE UI
     =============================== */
  $(".cloeMenu").on("click", function () {
    const $ui = $(".container");
    if ($ui.hasClass("ui-closing")) return;

    $ui.addClass("ui-closing");
    setTimeout(() => {
      $("#ui-root").hide();
      // $.post("https://your_resource/close");
    }, 450);
  });

  /* ===============================
     GENERATE CARDS + DOTS
     =============================== */
  const track = document.querySelector(".announcement-track");
  const dotsWrap = document.querySelector(".carousel-dots");

  jobs.forEach((job, i) => {
    // Card
    track.insertAdjacentHTML(
      "beforeend",
      `
      <div class="announcment-card">
        <div class="card-bg" style="background-image:url('${job.bg}')"></div>

        <div class="card-content">
          <div class="card-info">
            <span class="card-tag">${job.tag}</span>
            <h2 class="card-title">${job.title}</h2>
            <p class="card-desc">${job.desc}</p>

            <div class="card-actions">
              <button class="card-btn primary">Start Mission</button>
              <button class="card-btn">Details</button>
            </div>
          </div>

          <div class="card-character">
            <img src="${job.character}">
          </div>
        </div>
      </div>
    `
    );

    // Dot
    dotsWrap.insertAdjacentHTML(
      "beforeend",
      `<span class="dot ${i === 0 ? "active" : ""}"></span>`
    );
  });

  const dots = [...dotsWrap.children];

  /* ===============================
     CAROUSEL LOGIC (DRAG)
     =============================== */
  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  function updateCarousel() {
    track.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  track.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    track.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    currentX = e.clientX - startX;
    track.style.transform = `translateX(calc(-${
      index * 100
    }% + ${currentX}px))`;
  });

  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;

    if (currentX < -80 && index < jobs.length - 1) index++;
    if (currentX > 80 && index > 0) index--;

    currentX = 0;
    updateCarousel();
  });

  /* ===============================
     DOT CLICK (OPTIONAL)
     =============================== */
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
  });
});

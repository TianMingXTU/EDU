document.addEventListener("DOMContentLoaded", function () {
  initModals();
});

function initModals() {
  bindModalEvents(".hide-news-btn", hide_news);
  bindModalEvents(".hide-know-more-btn", hide_know_more);
  bindModalEvents(".hide-personal-info-btn", hide_personal_info);
  bindModalEvents(".hide-author-ramblings-btn", hide_author_ramblings);

  bindModalEvents(".show-news-btn", show_news);
  bindModalEvents(".show-know-more-btn", show_know_more);
  bindModalEvents(".show-personal-info-btn", show_personal_info);
  bindModalEvents(".show-author-ramblings-btn", show_author_ramblings);
}

function bindModalEvents(selector, handler) {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener("click", handler);
  });
}

function showModal(modalId) {
  document.querySelector(modalId).style.display = "block";
}

function hideModal(modalId) {
  document.querySelector(modalId).style.display = "none";
}

function hide_news() {
  hideModal(".modal-mask3");
}

function hide_know_more() {
  hideModal(".modal-mask2");
}

function hide_personal_info() {
  hideModal(".modal-mask1");
}

function hide_author_ramblings() {
  hideModal(".modal-mask6");
}

function show_news() {
  showModal(".modal-mask3");
}

function show_know_more() {
  showModal(".modal-mask2");
}

function show_personal_info() {
  showModal(".modal-mask1");
}

function show_author_ramblings() {
  showModal(".modal-mask6");
}

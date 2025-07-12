document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const requestList = document.getElementById("requestList");

  if (!currentUser) {
    window.location.href = "h2.html"; // redirect to login
    return;
  }

  const allRequests = JSON.parse(localStorage.getItem(`swapRequests_${currentUser.email}`)) || [];

  if (allRequests.length === 0) {
    requestList.innerHTML = "<p>No swap requests received yet.</p>";
    return;
  }

  allRequests.forEach((req, index) => {
    const card = document.createElement("div");
    card.className = "request-card";

    card.innerHTML = `
      <h3>From: ${req.from}</h3>
      <p><strong>Skills Offered:</strong> ${req.offered.join(", ")}</p>
      <p><strong>Skills Wanted:</strong> ${req.wanted.join(", ")}</p>
      <p><strong>Message:</strong> ${req.message || "(No message)"}</p>
      <p><strong>Status:</strong> <span class="status">${req.status}</span></p>
      ${req.status === "pending" ? `
        <button class="accept-btn" data-index="${index}">Accept</button>
        <button class="reject-btn" data-index="${index}">Reject</button>
      ` : ""}
    `;

    requestList.appendChild(card);
  });

  // Accept or reject logic
  requestList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("accept-btn")) {
      allRequests[index].status = "accepted";
    } else if (e.target.classList.contains("reject-btn")) {
      allRequests[index].status = "rejected";
    } else return;

    localStorage.setItem(`swapRequests_${currentUser.email}`, JSON.stringify(allRequests));
    window.location.reload(); // refresh to update UI
  });
});

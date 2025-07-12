document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser) {
    window.location.href = "h2.html";
    return;
  }

  const selectedUser = JSON.parse(localStorage.getItem("selectedUserProfile"));
  if (!selectedUser) {
    alert("No profile selected.");
    window.location.href = "h.html";
    return;
  }

  // Fill profile details dynamically
  document.getElementById("userName").textContent = selectedUser.name;
  document.getElementById("profilePhoto").src = selectedUser.image;

  const paragraphs = document.querySelectorAll(".left p");
  paragraphs[0].innerHTML = `<strong>Skills Offered:</strong> ${selectedUser.skillsOffered.join(", ")}`;
  paragraphs[1].innerHTML = `<strong>Skills Wanted:</strong> ${selectedUser.skillsWanted.join(", ")}`;
  paragraphs[2].innerHTML = `<strong>Rating and Feedback:</strong> ${selectedUser.rating}`;

  // Modal logic continues as before...
  const allSkills = [
    "Python", "JavaScript", "Java", "C++", "HTML", "CSS", "React",
    "Node.js", "MongoDB", "SQL", "Graphic Design", "UI/UX", "Video Editing",
    "Public Speaking", "Excel", "Figma"
  ];

  function renderSkills(containerId, inputName) {
    const box = document.getElementById(containerId);
    box.innerHTML = "";
    allSkills.forEach(skill => {
      box.innerHTML += `
        <label>
          <input type="checkbox" name="${inputName}" value="${skill}"> ${skill}
        </label>`;
    });
  }

  document.getElementById("requestBtn").addEventListener("click", () => {
    document.getElementById("requestModal").style.display = "flex";
    renderSkills("yourSkillBox", "yourSkills");
    renderSkills("theirSkillBox", "theirSkills");
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("requestModal").style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("requestModal")) {
      document.getElementById("requestModal").style.display = "none";
    }
  });

  document.getElementById("submitRequest").addEventListener("click", () => {
    const offered = Array.from(document.querySelectorAll('input[name="yourSkills"]:checked')).map(i => i.value);
    const wanted = Array.from(document.querySelectorAll('input[name="theirSkills"]:checked')).map(i => i.value);
    const message = document.getElementById("messageBox").value;

    if (offered.length === 0 || wanted.length === 0) {
      alert("Select at least one skill in both sections.");
      return;
    }

    const request = {
      from: currentUser.email,
      to: selectedUser.name,
      offered,
      wanted,
      message,
      date: new Date().toISOString()
    };

    const key = `swapRequests_${request.to}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(request);
    localStorage.setItem(key, JSON.stringify(existing));

    alert("✅ Request sent!");
    document.getElementById("requestModal").style.display = "none";
  });
});

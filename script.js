// MD5 for Gravatar (if needed)
function md5(string) {
  return CryptoJS.MD5(string.trim().toLowerCase()).toString();
}

// ✅ Redirect if not logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser) {
    window.location.href = "h2.html"; // redirect to login
    return;
  }

  const users = [
    {
      name: "Marc Demo",
      email: "marc@example.com",
      image: "download.jpg",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Mechanical", "Graphic designer"],
      rating: "3.4/5"
    },
    {
      name: "Michell",
      email: "michell@example.com",
      image: "men2.jpg",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Mechanical", "Graphic designer"],
      rating: "2.5/5"
    },
    {
      name: "Joe Wills",
      email: "joe@example.com",
      image: "woman.webp",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Mechanical", "Graphic designer"],
      rating: "4.0/5"
    }
  ];

  const userList = document.getElementById('user-list');

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <div class="profile-photo">
        <img src="${user.image}" alt="${user.name}">
      </div>
      <div class="user-info">
        <h3>${user.name}</h3>
        <div class="skills-title">Skills Offered =&gt;</div>
        ${user.skillsOffered.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        <div class="skills-wanted-title">Skills Wanted =&gt;</div>
        ${user.skillsWanted.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        <div class="rating">Rating: ${user.rating}</div>
      </div>
      <button class="request-btn">Request</button>
    `;

    const requestBtn = card.querySelector(".request-btn");
    requestBtn.addEventListener("click", () => {
      localStorage.setItem("selectedUserProfile", JSON.stringify(user));
      window.location.href = `h5.html?email=${encodeURIComponent(user.email)}`;
    });

    userList.appendChild(card);
  });

const topControls = document.querySelector(".top-controls");

if (currentUser) {
  const alreadyExists = topControls.querySelector(".profile-pic") || topControls.querySelector(".logout-btn");
  if (alreadyExists) return; // ✅ Prevent duplicates

  const hash = md5(currentUser.email);
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

  // Remove login button if still there
  const loginBtn = topControls.querySelector(".login-btn");
  if (loginBtn) loginBtn.remove();

  // Create and append profile image
 const profileLink = document.createElement("a");
profileLink.href = "h4.html"; // 🔗 destination

const profileImg = document.createElement("img");
profileImg.src = gravatarURL;
profileImg.alt = "Profile";
profileImg.title = currentUser.email;
profileImg.className = "profile-pic";

profileLink.appendChild(profileImg);
topControls.appendChild(profileLink);

  // Create and append logout button
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.className = "logout-btn";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  });

  // topControls.appendChild(profileImg);
  topControls.appendChild(logoutBtn);
}

});

// 1️⃣ Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!currentUser) {
  window.location.href = "h2.html"; // redirect to login
}

// 2️⃣ Get all input references
const nameInput = document.getElementById("name");
const locationInput = document.getElementById("location");
const skillsOfferedInput = document.getElementById("skillsOffered");
const skillsWantedInput = document.getElementById("skillsWanted");
const availabilityInput = document.getElementById("availability");
const visibilityInput = document.getElementById("visibility");
const photoPreview = document.getElementById("photoPreview");
const photoUpload = document.getElementById("photoUpload");

// 3️⃣ Load saved profile if exists
const saved = JSON.parse(localStorage.getItem(`profile_${currentUser.email}`));
if (saved) {
  nameInput.value = saved.name || "";
  locationInput.value = saved.location || "";
  photoPreview.src = saved.image || photoPreview.src;
  availabilityInput.value = saved.availability || "";
  visibilityInput.value = saved.visibility || "";

  // Restore multi-select skills
  for (let option of skillsOfferedInput.options) {
    option.selected = saved.skillsOffered?.includes(option.value);
  }
  for (let option of skillsWantedInput.options) {
    option.selected = saved.skillsWanted?.includes(option.value);
  }
}

// 4️⃣ Preview photo on upload
photoUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// 5️⃣ Reset photo to default
document.getElementById("removePhoto").addEventListener("click", () => {
  photoPreview.src = "https://www.gravatar.com/avatar?d=identicon";
  photoUpload.value = "";
});

// 6️⃣ Save profile
document.querySelector(".save-btn").addEventListener("click", () => {
  const name = nameInput.value.trim();
  const location = locationInput.value.trim();
  const availability = availabilityInput.value;
  const visibility = visibilityInput.value;
  const offered = Array.from(skillsOfferedInput.selectedOptions).map(opt => opt.value);
  const wanted = Array.from(skillsWantedInput.selectedOptions).map(opt => opt.value);
  const photo = photoPreview.src;

  // Validation
  if (!name || !location || !availability || !visibility || offered.length === 0 || wanted.length === 0) {
    alert("❌ Please fill all fields and select at least one skill in both sections.");
    return;
  }

  const profile = {
    email: currentUser.email,
    name,
    location,
    skillsOffered: offered,
    skillsWanted: wanted,
    availability,
    visibility,
    image: photo
  };

  localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(profile));
  alert("✅ Profile saved successfully!");
});

// 7️⃣ Discard changes
document.querySelector(".discard-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to discard all changes?")) {
    window.location.reload();
  }
});

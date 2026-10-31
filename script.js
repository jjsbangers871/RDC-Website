// RDC Promotions starter website data.
// Replace the demo entries below with official RDC Promotions information.
// Optional Google Sheets connection: publish a public, read-only sheet as CSV and set SHEET_CSV_URL.
// Do not publish private tabs, contact details, or information that should not be public.
const SHEET_CSV_URL = ""; // Example: https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?output=csv

const drivers = [
  { no: "871", name: "Driver One", className: "Unlimited Bangers", points: 274, meetings: 8 },
  { no: "13", name: "Driver Two", className: "Unlimited Bangers", points: 261, meetings: 8 },
  { no: "22", name: "Driver Three", className: "2L Bangers", points: 248, meetings: 7 },
  { no: "274", name: "Driver Four", className: "Unlimited Bangers", points: 233, meetings: 8 },
  { no: "181", name: "Driver Five", className: "Ladies Bangers", points: 229, meetings: 6 },
  { no: "458", name: "Driver Six", className: "2L Bangers", points: 212, meetings: 7 },
  { no: "717", name: "Driver Seven", className: "Unlimited Bangers", points: 198, meetings: 6 },
  { no: "194", name: "Driver Eight", className: "Rookie Championship", points: 187, meetings: 5 }
];
const fixtures = [
  { date: "ADD DATE", month: "FIXTURE 01", venue: "Add confirmed venue", details: "Add meeting name and classes", status: "Scheduled" },
  { date: "ADD DATE", month: "FIXTURE 02", venue: "Add confirmed venue", details: "Add meeting name and classes", status: "Scheduled" },
  { date: "ADD DATE", month: "FIXTURE 03", venue: "Add confirmed venue", details: "Add meeting name and classes", status: "Scheduled" },
  { date: "ADD DATE", month: "FIXTURE 04", venue: "Add confirmed venue", details: "Add meeting name and classes", status: "Scheduled" }
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function renderPoints(data) {
  const sorted = [...data].sort((a,b) => Number(b.points) - Number(a.points));
  document.querySelector("#points-table tbody").innerHTML = sorted.slice(0,10).map((d,i) =>
    `<tr><td>${i+1}</td><td>${escapeHTML(d.no)}</td><td>${escapeHTML(d.name)}</td><td>${escapeHTML(d.className)}</td><td><b>${escapeHTML(d.points)}</b></td></tr>`
  ).join("");
  const leader = Number(sorted[0]?.points || 0);
  document.querySelector("#championship-table tbody").innerHTML = sorted.map((d,i) =>
    `<tr><td>${i+1}</td><td>${escapeHTML(d.no)}</td><td>${escapeHTML(d.name)}</td><td>${escapeHTML(d.className)}</td><td><b>${escapeHTML(d.points)}</b></td><td>${i===0 ? "—" : `-${leader-Number(d.points)}`}</td></tr>`
  ).join("");
}
function renderDrivers(filter = "") {
  const filtered = drivers.filter(d => `${d.no} ${d.name} ${d.className}`.toLowerCase().includes(filter.toLowerCase()));
  document.querySelector("#driver-grid").innerHTML = filtered.map(d => `
    <article class="driver-card"><div class="driver-top"><span class="car-number">${escapeHTML(d.no)}</span><span class="driver-class">${escapeHTML(d.className)}</span></div>
    <h3>${escapeHTML(d.name)}</h3><p>RDC Promotions competitor</p><div class="driver-stats"><span>SEASON POINTS</span><b>${escapeHTML(d.points)}</b></div></article>`).join("") ||
    '<p class="small-note">No drivers match your search.</p>';
}
function renderFixtures() {
  document.querySelector("#fixtures-list").innerHTML = fixtures.map(f => `
    <article class="fixture"><div class="fixture-date">${escapeHTML(f.date)}<small>${escapeHTML(f.month)}</small></div>
    <div><h3>${escapeHTML(f.venue)}</h3><p>${escapeHTML(f.details)}</p></div><span class="status">${escapeHTML(f.status)}</span></article>`).join("");
}
document.querySelector(".menu-toggle").addEventListener("click", () => {
  const nav = document.querySelector("#nav");
  const open = nav.classList.toggle("open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  document.querySelector("#nav").classList.remove("open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  document.querySelectorAll(".nav a").forEach(link => link.classList.remove("active"));
  a.classList.add("active");
}));
document.querySelector("#driver-search").addEventListener("input", e => renderDrivers(e.target.value));
document.querySelector("#year").textContent = new Date().getFullYear();
renderPoints(drivers);
renderDrivers();
renderFixtures();

// Sheet connection note: this starter is deliberately not auto-fetching an arbitrary spreadsheet.
// To connect data, publish only the intended results tab as CSV, then add a CSV parser/fetch flow
// appropriate to the exact sheet columns. Share the view-only spreadsheet link to configure it safely.

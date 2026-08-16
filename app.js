const $ = (id) => document.getElementById(id);

const library = {
  Filipino: [
    {name:"Pork giniling with potatoes & carrots", mins:28, cost:54, tags:["pork","potato","carrot","tomato"], note:"One-pan, family-friendly. Serve with rice."},
    {name:"Ginisang sayote with ground pork", mins:25, cost:42, tags:["pork","sayote","garlic"], note:"Budget-friendly and easy to stretch."},
    {name:"Beef & cabbage stir-fry", mins:25, cost:62, tags:["beef","cabbage","onion"], note:"Quick high-heat stir-fry; use less beef, more cabbage to save."},
    {name:"Tokwa with vegetables in savory sauce", mins:22, cost:34, tags:["tofu","carrot","cabbage","soy"], note:"Low-cost meatless meal."},
    {name:"Pork adobo with potatoes", mins:35, cost:58, tags:["pork","potato","soy","vinegar"], note:"Cook extra if leftovers are enabled."},
    {name:"Monggo with pork & leafy greens", mins:35, cost:40, tags:["mung beans","pork","greens"], note:"Economical protein; use pre-soaked or quick-cook mung beans."},
    {name:"Tortang talong-style eggplant sauté", mins:20, cost:30, tags:["eggplant","tomato","onion"], note:"Egg-free demo version: sautéed eggplant with garlic and tomato."},
    {name:"Pork sinigang-inspired vegetable soup", mins:35, cost:55, tags:["pork","radish","tomato","greens"], note:"Use a simple tamarind broth; good for batch cooking."},
    {name:"Garlic pork strips with pechay", mins:20, cost:48, tags:["pork","pechay","garlic"], note:"Fast lunch option."},
    {name:"Tofu sisig-style skillet", mins:25, cost:32, tags:["tofu","onion","calamansi"], note:"Cream-free, egg-free version."}
  ],
  Chinese: [
    {name:"Pork & choy sum stir-fry", mins:20, cost:48, tags:["pork","choy sum","garlic"], note:"Fast local-market ingredients."},
    {name:"Tomato tofu rice bowl", mins:18, cost:32, tags:["tofu","tomato","rice"], note:"Soft texture and low cost."},
    {name:"Beef broccoli stir-fry", mins:25, cost:68, tags:["beef","broccoli","garlic"], note:"Use thinly sliced beef for speed."},
    {name:"Braised cabbage with tofu", mins:24, cost:30, tags:["cabbage","tofu","mushroom"], note:"One-pot budget meal."},
    {name:"Minced pork & green beans", mins:22, cost:46, tags:["pork","green beans"], note:"Savory rice partner."},
    {name:"Mushroom vegetable noodles", mins:20, cost:36, tags:["noodles","mushroom","cabbage"], note:"Use rice noodles if preferred."},
    {name:"Pork corn soup", mins:28, cost:42, tags:["pork","corn","carrot"], note:"Simple soup; omit egg."}
  ],
  Western: [
    {name:"Tomato beef pasta", mins:28, cost:60, tags:["beef","pasta","tomato"], note:"Simple tomato sauce, no cream."},
    {name:"Air-fryer pork chops & vegetables", mins:30, cost:65, tags:["pork","potato","carrot"], note:"Use air fryer for the chops, stove for vegetables."},
    {name:"Garlic mushroom pasta", mins:22, cost:38, tags:["pasta","mushroom","garlic"], note:"Budget vegetarian option."},
    {name:"Beef & potato skillet", mins:30, cost:58, tags:["beef","potato","onion"], note:"One-pan comfort meal."},
    {name:"Tomato lentil stew", mins:30, cost:32, tags:["lentils","tomato","carrot"], note:"Low-cost plant protein."},
    {name:"Pork meatballs in tomato sauce", mins:35, cost:55, tags:["pork","tomato","breadcrumbs"], note:"Egg-free binder: breadcrumbs + water."},
    {name:"Vegetable rice skillet", mins:20, cost:28, tags:["rice","carrot","cabbage","peas"], note:"Use leftover rice."}
  ]
};
library.Mixed = [...library.Filipino, ...library.Chinese, ...library.Western];

const breakfastPool = [
  {name:"Banana oatmeal", mins:10, cost:16, tags:["oats","banana"], note:"Cook with water or tolerated milk."},
  {name:"Peanut butter banana toast", mins:8, cost:18, tags:["bread","banana","peanut butter"], note:"Only if peanuts are already known to be safe for the family."},
  {name:"Garlic rice with sautéed vegetables", mins:15, cost:20, tags:["rice","vegetables","garlic"], note:"Great for leftover rice."},
  {name:"Sweet potato & fruit", mins:18, cost:19, tags:["sweet potato","fruit"], note:"Simple, low-prep breakfast."},
  {name:"Oatmeal with apple", mins:12, cost:20, tags:["oats","apple"], note:"Soft and easy to portion."}
];

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function checked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x => x.value);
}
function esc(s="") {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function getProfile() {
  return {
    location: $("location").value.trim() || "your area",
    cuisine: $("cuisine").value,
    adults: +$("adults").value || 1,
    children: +$("children").value || 0,
    childAges: $("childAges").value.trim(),
    allergies: $("allergies").value.trim(),
    currency: $("currency").value,
    budget: +$("budget").value || 0,
    cookTime: +$("cookTime").value || 30,
    meals: checked("meals"),
    shops: $("shops").value.trim(),
    equipment: checked("equipment"),
    leftovers: $("leftovers").checked
  };
}
function renderPreview() {
  const p = getProfile();
  const people = `${p.adults} adult${p.adults !== 1 ? "s" : ""}${p.children ? ` + ${p.children} child${p.children !== 1 ? "ren" : ""}` : ""}`;
  const rows = [
    ["Location", p.location],
    ["Household", people],
    ["Cuisine", p.cuisine],
    ["Budget", `${p.currency} ${p.budget || "—"} / week`],
    ["Meals", p.meals.length ? p.meals.join(", ") : "None selected"],
    ["Cooking", `Up to ${p.cookTime} min`],
    ["Equipment", p.equipment.join(", ") || "Not specified"],
    ["Restrictions", p.allergies || "None entered"]
  ];
  $("profilePreview").innerHTML = rows.map(([a,b]) =>
    `<div class="preview-row"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`
  ).join("");
  localStorage.setItem("mealwiseProfile", JSON.stringify(p));
}
function allergyTokens(text) {
  const t = text.toLowerCase();
  const known = ["chicken","egg","eggs","seafood","fish","shrimp","prawn","shellfish","peanut","peanuts","nuts","dairy","milk","beef","pork","soy","tofu","gluten"];
  return [...new Set(known.filter(k => t.includes(k)).map(k => k === "eggs" ? "egg" : k === "peanuts" ? "peanut" : k))];
}
function conflicts(meal, restricted) {
  const joined = `${meal.name} ${meal.tags.join(" ")}`.toLowerCase();
  return restricted.some(a => {
    if (a === "seafood") return /(seafood|fish|shrimp|prawn|shellfish|tuna|salmon)/.test(joined);
    if (a === "egg") return /\begg\b|\beggs\b/.test(joined);
    if (a === "dairy" || a === "milk") return /(milk|cheese|cream|butter|dairy)/.test(joined);
    if (a === "soy") return /(soy|tofu)/.test(joined);
    return joined.includes(a);
  });
}
function selectMeal(pool, restricted, maxTime, seed) {
  const safe = pool.filter(m => !conflicts(m, restricted) && m.mins <= maxTime);
  const fallback = pool.filter(m => !conflicts(m, restricted));
  const use = safe.length ? safe : fallback.length ? fallback : pool;
  return use[seed % use.length];
}
function buildPlan(p) {
  const restricted = allergyTokens(p.allergies);
  const pool = library[p.cuisine] || library.Mixed;
  const plan = [];
  let total = 0;
  const ingredients = new Set(["Rice / staple grain", "Garlic", "Onion", "Cooking oil", "Seasonings"]);
  let seed = Math.floor((p.budget + p.adults * 11 + p.children * 7) % 17);

  days.forEach((day, di) => {
    const entries = [];
    p.meals.forEach((mealType, mi) => {
      let meal;
      if (mealType === "breakfast") {
        meal = selectMeal(breakfastPool, restricted, p.cookTime, seed + di + mi);
      } else {
        meal = selectMeal(pool, restricted, p.cookTime, seed + di * 2 + mi);
        if (p.leftovers && mealType === "lunch" && di > 0 && di % 3 === 0) {
          const prevDinner = plan[di-1]?.entries.find(x => x.type === "dinner");
          if (prevDinner) {
            meal = {...prevDinner.meal, name:`Leftover ${prevDinner.meal.name}`, cost: Math.max(8, Math.round(prevDinner.meal.cost * .22)), mins:12, note:"Reheat safely; add a fresh vegetable or fruit if available."};
          }
        }
      }
      entries.push({type: mealType, meal});
      total += meal.cost;
      meal.tags.forEach(x => ingredients.add(x.replace(/\b\w/g, c => c.toUpperCase())));
    });
    plan.push({day, entries});
  });

  // Household scaling: demo costs assume roughly 2 adults + 2 children.
  const householdFactor = Math.max(.7, Math.min(2.2, (p.adults + p.children * .55) / 3.1));
  total = Math.round(total * householdFactor);

  return {plan, total, ingredients:[...ingredients], restricted};
}
function renderResults(p, built) {
  $("results").classList.remove("hidden");
  $("resultsTitle").textContent = `${p.cuisine} family plan for ${p.location}`;
  $("resultsMeta").textContent = `${p.meals.length} meal type${p.meals.length!==1?"s":""} × 7 days • up to ${p.cookTime} min • ${p.currency} ${p.budget} target budget`;

  if (p.allergies) {
    $("warningBox").classList.remove("hidden");
    $("warningBox").innerHTML = `<strong>Restriction flag:</strong> ${esc(p.allergies)}. The demo filters obvious ingredient-name matches only; it does not detect hidden ingredients or cross-contact. Verify every ingredient before serving.`;
  } else {
    $("warningBox").classList.add("hidden");
  }

  $("mealPlan").innerHTML = built.plan.map((d, i) => `
    <article class="day-card">
      <div class="day-label"><strong>${d.day}</strong><small>Day ${i+1}</small></div>
      <div class="day-meals">
        ${d.entries.map(e => `
          <div class="meal-row">
            <span class="meal-type">${esc(e.type)}</span>
            <div class="meal-main"><strong>${esc(e.meal.name)}</strong><small>${esc(e.meal.note)}</small></div>
            <span class="time-chip">~${e.meal.mins} min</span>
          </div>
        `).join("")}
      </div>
    </article>`).join("");

  $("groceryList").innerHTML = built.ingredients.sort().map(i => `<div class="grocery-item">${esc(i)}</div>`).join("");

  const pct = p.budget ? Math.min(100, Math.round((built.total / p.budget) * 100)) : 0;
  const diff = p.budget - built.total;
  const status = diff >= 0
    ? `Demo estimate is ${p.currency} ${Math.abs(diff)} under your target.`
    : `Demo estimate is ${p.currency} ${Math.abs(diff)} over your target. The AI version will optimize portions and local prices more precisely.`;
  $("budgetSummary").innerHTML = `
    <div class="budget-big">${esc(p.currency)} ${built.total}</div>
    <div class="budget-sub">Approximate demo estimate for the selected meals. This is not a live market-price quote.</div>
    <div class="budget-bar"><span style="width:${pct}%"></span></div>
    <div class="budget-sub"><strong>${pct}% of budget</strong><br>${esc(status)}</div>
  `;
  $("results").scrollIntoView({behavior:"smooth", block:"start"});
}
function restore() {
  try {
    const p = JSON.parse(localStorage.getItem("mealwiseProfile") || "null");
    if (!p) return;
    const ids = ["location","cuisine","adults","children","childAges","allergies","currency","budget","cookTime","shops"];
    ids.forEach(id => { if (p[id] !== undefined && $(id)) $(id).value = p[id]; });
    if (typeof p.leftovers === "boolean") $("leftovers").checked = p.leftovers;
    ["meals","equipment"].forEach(group => {
      document.querySelectorAll(`input[name="${group}"]`).forEach(x => x.checked = (p[group] || []).includes(x.value));
    });
  } catch {}
}
restore();
renderPreview();

$("plannerForm").addEventListener("input", renderPreview);
$("plannerForm").addEventListener("change", renderPreview);
$("plannerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const p = getProfile();
  if (!p.meals.length) {
    alert("Choose at least one meal to plan.");
    return;
  }
  renderResults(p, buildPlan(p));
});
$("resetBtn").addEventListener("click", () => {
  localStorage.removeItem("mealwiseProfile");
  location.reload();
});
$("printBtn").addEventListener("click", () => window.print());

function getCheckedValues(name) {
  const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checked).map(item => item.value);
}

function isBlocked(menu, hates) {
  if (hates.includes("없음")) return false;

  return hates.some(hate => menu.traits.includes(hate));
}

function showResult() {
  const moods = getCheckedValues("mood");
  const hunger = getCheckedValues("hunger");
  const hates = getCheckedValues("hate");

  let results = menuData
    .filter(menu => !isBlocked(menu, hates))
    .map(menu => {
      let score = 0;

      moods.forEach(mood => {
        if (menu.moods.includes(mood)) score += 4;
      });

      hunger.forEach(h => {
        if (menu.hunger.includes(h)) score += 5;
      });

      if (moods.includes("아무거나 좋아")) score += 1;

      return {
        name: menu.name,
        score: score
      };
    })
    .sort((a, b) => b.score - a.score);

  const top3 = results.slice(0, 3);
  const others = results.slice(3, 23);

  document.getElementById("topMenu").innerHTML = top3
 .map((menu, index) => {
  const medals = ["🥇", "🥈", "🥉"];
  return `<div class="menu-item">${medals[index]} ${menu.name}</div>`;
})
    .join("");

  document.getElementById("otherMenu").innerText =
    others.map(menu => menu.name).join(", ");

  document.getElementById("mainPage").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");
}

function goBack() {
  document.getElementById("resultPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");
}
function resetChoices() {
    document
        .querySelectorAll('input[type="checkbox"], input[type="radio"]')
        .forEach(input => input.checked = false);
}
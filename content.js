// AYS Universal Shopping Protector
const checkoutKeywords = [
  "checkout",
  "proceed",
  "place order",
  "buy now",
  "pay now",
  "confirm",
];
let USER_BUDGET = 50.0;

function updateBudget() {
  chrome.storage.local.get(["userBudget"], (result) => {
    if (result.userBudget) USER_BUDGET = parseFloat(result.userBudget);
  });
}
updateBudget();

function showSpeedBump(cartTotal, originalButton) {
  if (document.getElementById("ays-speed-bump")) return;

  const priceNum = parseFloat(cartTotal.replace(/[^0-9.-]+/g, "")) || 0;
  const isOver = priceNum > USER_BUDGET;

  const overlay = document.createElement("div");
  overlay.id = "ays-speed-bump";
  overlay.innerHTML = `
        <div class="ays-modal">
            <h1>Wait! Is this a Need? 🛑</h1>
            <p>You're about to spend <strong>${cartTotal}</strong>.</p>
            <div class="ays-budget-box ${isOver ? "ays-over" : "ays-under"}">
                Remaining Budget: <strong>$${USER_BUDGET.toFixed(2)}</strong>
                ${isOver ? "<br><strong>⚠️ Over Budget!</strong>" : ""}
            </div>
            <p style="color: #718096; font-size: 14px;">10 seconds of mindfulness...</p>
            <div class="ays-btn-container">
                <button id="ays-cancel" class="ays-button">I'll wait</button>
                <button id="ays-continue" class="ays-button" disabled>Wait (10s)</button>
            </div>
        </div>
    `;
  document.body.appendChild(overlay);

  let timeLeft = 10;
  const countdown = setInterval(() => {
    timeLeft--;
    const btn = document.getElementById("ays-continue");
    if (btn) btn.innerText = `Proceed in ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (btn) {
        btn.disabled = false;
        btn.innerText = "Unlock Purchase";
        btn.style.backgroundColor = "#2ecc71"; // Success Green
      }
    }
  }, 1000);

  document.getElementById("ays-cancel").onclick = () => overlay.remove();

  // THE KEY CHANGE
  document.getElementById("ays-continue").onclick = () => {
    overlay.remove();

    // 1. Give the original button the "Pass"
    originalButton.setAttribute("data-ays-passed", "true");

    // 2. Visual confirmation the button is now "live"
    originalButton.style.border = "4px solid #2ecc71";
    originalButton.style.boxShadow = "0 0 20px #2ecc71";

    // 3. Try to click it once automatically
    originalButton.click();

    console.log(
      "AYS: Button unlocked. Blocker is now disabled for this element.",
    );
  };
}

function getUniversalPrice() {
  const amazonTotal =
    document.querySelector("#sc-subtotal-amount-buybox .a-color-price") ||
    document.querySelector("#subtotals-marketplace-table .a-color-price");
  return amazonTotal ? amazonTotal.innerText.trim() : "$5.72";
}

function interceptCheckouts() {
  // We target every possible button-like element on Amazon
  const elements = document.querySelectorAll(
    'button, a, input[type="submit"], .a-button-inner, #proceed-to-checkout-action',
  );

  elements.forEach((el) => {
    const text = (el.innerText || el.value || "").toLowerCase();

    if (checkoutKeywords.some((kw) => text.includes(kw))) {
      // If we've already set the listener, don't add another one
      if (el.getAttribute("data-ays-guarded")) return;
      el.setAttribute("data-ays-guarded", "true");

      el.addEventListener(
        "click",
        function (e) {
          // CRITICAL CHECK: If the "Pass" exists, EXIT immediately and do nothing.
          if (this.getAttribute("data-ays-passed") === "true") {
            return;
          }

          // Otherwise, block the click and show the modal
          e.preventDefault();
          e.stopPropagation();
          updateBudget();
          showSpeedBump(getUniversalPrice(), this);
        },
        true,
      ); // Capturing phase to beat Amazon's scripts
    }
  });
}

// Check for new buttons (Amazon loads things dynamically)
setInterval(interceptCheckouts, 1500);
interceptCheckouts();

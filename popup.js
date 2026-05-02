document.addEventListener("DOMContentLoaded", () => {
  const budgetInput = document.getElementById("budget-input");
  const saveBtn = document.getElementById("save-btn");
  const statusMsg = document.getElementById("status-msg");
  const timerDisplay = document.getElementById("timer-display");

  // 1. Load existing settings when popup opens
  chrome.storage.local.get(["userBudget", "savingsCount"], (result) => {
    if (result.userBudget) {
      budgetInput.value = result.userBudget;
    }

    // Dynamic subtext based on their history
    const count = result.savingsCount || 0;
    if (count > 0) {
      timerDisplay.innerText = `You've avoided ${count} impulse buys! 🛡️`;
    } else {
      timerDisplay.innerText = "Universal Shopping Protector Active 🛡️";
    }
  });

  // 2. Save Budget Settings
  saveBtn.addEventListener("click", () => {
    const budget = budgetInput.value;

    if (!budget || budget <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    chrome.storage.local.set({ userBudget: budget }, () => {
      // Visual feedback
      statusMsg.style.display = "block";
      saveBtn.style.background = "#10b981"; // Turn green temporarily

      setTimeout(() => {
        statusMsg.style.display = "none";
        saveBtn.style.background = "#3b82f6"; // Back to blue
      }, 2000);

      // Optional: Notify the current tab that the budget changed
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const buyBtn = document.getElementById('buyBtn');
    const saveBtn = document.getElementById('saveBtn');
    const anywayBtn = document.getElementById('anywayBtn');
    const timerElement = document.getElementById('timer');
    
    const mainView = document.getElementById('mainView');
    const nudgeBox = document.getElementById('nudgeBox');
    const successBox = document.getElementById('successBox');

    // Step 1: Trigger the Nudge
    buyBtn.addEventListener('click', () => {
        mainView.style.display = 'none';
        nudgeBox.style.display = 'block';
        
        let timeLeft = 5;
        const countdown = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                anywayBtn.disabled = false;
                anywayBtn.style.background = "transparent";
                anywayBtn.style.border = "1px solid #444";
                anywayBtn.style.color = "#888";
                anywayBtn.style.cursor = "pointer";
                anywayBtn.innerText = "I understand the risk, proceed";
            }
        }, 1000);
    });

    // Step 2: The "Good" Choice (Saving Money)
    saveBtn.addEventListener('click', () => {
        nudgeBox.style.display = 'none';
        successBox.style.display = 'block';
    });

    // Step 3: The "Bad" Choice (Buying anyway)
    anywayBtn.addEventListener('click', () => {
        if(!anywayBtn.disabled) {
            alert("Redirecting to external checkout...");
            window.close();
        }
    });
});
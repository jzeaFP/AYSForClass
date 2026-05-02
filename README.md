# AYS Funding ("Are You Sure?") - MGIS 360 Final Project

AYS Funding is a behavioral-first digital financial wellness tool designed to prevent impulse spending at the exact moment of a purchase decision. This repository documents the live deployment of our web platform and hosts the codebase for our core Google Chrome Extension prototype.

---

## 🚀 Project Links
* **Live Website:** [aysfunding.com](https://aysfunding.com)
* **Direct Extension Download:** [AYS Extension Zip File](https://aysfunding.com/wp-content/uploads/2026/04/AYS-Extension.zip)
* **GitHub Repository:** [https://github.com/jzeaFP/AYSForClass](https://github.com/jzeaFP/AYSForClass)

---

## 📁 Repository Structure

```text
├── assets/                 # Brand assets, logos, and UI screenshots
├── documentation/          # Academic setup guides and technical logs
├── manifest.json           # Chrome Extension configuration (Manifest V3)
├── content.js              # Core DOM script that intercepts checkout buttons
├── styles.css              # Styling for the 10-second pause modal popup
├── popup.html              # Popup interface for setting user budget limits
├── popup.js               # Logic to manage local browser storage
└── README.md               # Project documentation and installation guide

## Live Website
https://aysfunding.com

🖥️ Live Platform Setup (aysfunding.com)
The live website serves as the primary landing page, interactive simulator, and distribution portal for the AYS software.

Tech Stack
Content Management System: WordPress

Hosting Provider: WordPress Premium Hosting

Domain Registrar: WordPress Domains

Security: SSL/HTTPS enabled via WordPress Managed Certificates

Website Goals
Frictionless Delivery: Houses the direct beta download link for our team's Chrome extension.

Conversion Ready: Built to support our premium tier ($10/month) with a clear payment-ready call to action.

For complete setup logs, see the /documentation/ folder for:

domain-setup.md

hosting-setup.md

plugin-list.md

🛠️ Chrome Extension Installation (Private Beta)
The AYS Chrome Extension injects a real-time behavioral speed bump into standard e-commerce checkouts. Since it is currently in Private Beta, use the following steps to load it locally into your browser:

1. Download the Files
Clone this repository to your computer OR download the source code as a .zip file and extract it.

2. Open Chrome Extensions
Open Google Chrome.

Navigate to chrome://extensions/ by typing it directly into your URL bar.

3. Enable Developer Mode
Toggle the Developer mode switch in the top-right corner of the Extensions page to ON.

4. Load Unpacked Extension
Click the Load unpacked button in the top-left corner.

Select the folder containing our latest files (specifically where the manifest.json is located).

5. Test the Behavioral Modal
Click the puzzle piece icon on your toolbar to pin the AYS Extension.

Set your trial budget limits via the extension popup.

Visit any e-commerce site and proceed to a checkout page to experience the 10-second cooling-off intervention.

Julian Zea

Developed for MGIS 360 (Spring 2026).

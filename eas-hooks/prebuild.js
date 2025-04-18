// THANK YOU CHATGPT

const fs = require("fs");
const path = require("path");

console.log("Running prebuild hook for Google Services JSON placement");
const googleServicesJson = process.env.GOOGLE_SERVICES_JSON;
console.log(`GOOGLE_SERVICES_JSON location: ${googleServicesJson}`);

if (!googleServicesJson || !fs.existsSync(googleServicesJson)) {
    console.error(
        "Error: GOOGLE_SERVICES_JSON is not defined or the file does not exist.",
    );
    process.exit(1);
}

const targets = [
    "android/app/google-services.json",
    "android/app/src/google-services.json",
    "android/app/src/debug/google-services.json",
    "android/app/src/Debug/google-services.json",
];

targets.forEach((target) => {
    const dir = path.dirname(target);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(googleServicesJson, target);
});

console.log("Copied Google Services JSON file to Android directories");

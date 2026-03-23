// src/utils/formSubmit.ts

export interface FormData {
    name: string;
    attendance: string[];
    allergies: string;
    alcohol: string[];
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyk3ocGpiT9iUL89CG5wl8d9coYYejAPbDPxTsoXwFibrzrG6A2gMUSvuA6CV5Fhr4tAw/exec";

export async function submitToGoogleSheets(data: FormData): Promise<void> {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Важно для Google Apps Script
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // При mode: 'no-cors' ответ непрозрачный, но если нет ошибки сети — считаем успехом
    if (!response.ok && response.status !== 0) {
        throw new Error('Network response was not ok');
    }
}
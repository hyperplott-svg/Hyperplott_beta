
const email = 'tester@hyperplott.ai';
const password = 'Password123!';
const apiKey = 'AIzaSyCbvni8TwFS3E65peM3-JbNlEokqsXIMhaE';

async function createAccount() {
    try {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });
        const data = await response.json();
        if (data.error) {
            console.error('Error:', data.error.message);
        } else {
            console.log('Successfully created account:', data.email);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

createAccount();

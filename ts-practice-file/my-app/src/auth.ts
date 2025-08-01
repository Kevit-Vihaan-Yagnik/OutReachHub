interface User {
    username: string;
    password: string;
}

export async function signIn(loginForm: HTMLFormElement) {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const data: User = {
        username: usernameInput.value,
        password: passwordInput.value,
    };

    try {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            alert('Login failed');
            usernameInput.value = "",
            passwordInput.value = ""
            return;
        }

        const result = await res.json();
        console.log(result);
        alert('Login successful');
    } catch (err) {
        console.error(err);
        alert('Invalid email or password. Please try again.');
        usernameInput.value = "",
            passwordInput.value = ""
    }
}

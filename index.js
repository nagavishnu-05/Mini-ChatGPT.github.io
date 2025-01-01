const apiKey = "mdb_1ur9vVVneT4lmzfyCVsL5XrAwFbawJs9THkAcSFgtRvM";
const apiUrl = "https://llm.mdb.ai/v1/chat/completions";

document.getElementById('button').addEventListener('click', async () => {
    const inputText = document.getElementById('input').value.trim();
    if (inputText) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('user-message');
        userMessageDiv.innerText = inputText;
        document.getElementById('output').appendChild(userMessageDiv);
        document.getElementById('input').value = '';
        const botResponse = await sendMessageToMindsDB(inputText);

        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('bot-message');
        botMessageDiv.innerText = botResponse;
        document.getElementById('output').appendChild(botMessageDiv);
        document.getElementById('output').scrollTop = document.getElementById('output').scrollHeight;
    }
});

async function sendMessageToMindsDB(prompt) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: prompt,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error(`An error occurred with the MindsDB Serve API: ${error.message}`);
        return `An error occurred: ${error.message}`;
    }
}

document.getElementById('input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('button').click();
    }
});

const input = document.getElementById('input');
const btn   = document.getElementById('gen');
const cards = document.getElementById('cards');
const key   = '<YOUR_OPENAI_KEY>';  // replace with your key

btn.addEventListener('click', async () => {
  btn.disabled = true;
  cards.innerHTML = 'Loading…';
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Turn this text into up to 10 Q&A flashcards.' },
          { role: 'user',   content: input.value }
        ]
      })
    });
    const json = await res.json();
    const text = json.choices[0].message.content;
    cards.innerHTML = text.split('\n')
      .map(line => {
        const [q,a] = line.split('A:');
        if (!a) return '';
        return `<div class="card">
                  <strong>${q.replace(/^.*Q:\s*/,'')}</strong>
                  <p>${a.trim()}</p>
                </div>`;
      }).join('');
  } catch {
    cards.innerHTML = 'Error, please try again.';
  }
  btn.disabled = false;
});add app.js

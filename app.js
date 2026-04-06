const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// --- 1. THE CREATOR PAGE ---
app.get('/create', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Valentine Link Creator</title>
            <style>
                body { background: #fff5f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 10px 25px rgba(255,105,180,0.2); text-align: center; }
                input { padding: 10px; border: 2px solid #ffb6c1; border-radius: 10px; outline: none; width: 200px; }
                button { background: #ff4d6d; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; margin-left: 10px; }
                button:hover { background: #ff758f; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2 style="color: #ff4d6d;">Create a Valentine Link</h2>
                <form action="/generate" method="POST">
                    <input type="text" name="name" placeholder="Target's Name" required>
                    <button type="submit">Create ✨</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/generate', (req, res) => {
    const name = encodeURIComponent(req.body.name);
    const link = `http://localhost:${port}/valentine?name=${name}`;
    res.send(`
        <div style="text-align: center; font-family: sans-serif; margin-top: 50px;">
            <h3>Send this link to your crush:</h3>
            <code style="background: #eee; padding: 10px; border-radius: 5px;">${link}</code>
            <br><br><a href="/create">Create another</a>
        </div>
    `);
});

// --- 2. THE VALENTINE QUESTION ---
app.get('/valentine', (req, res) => {
    const name = req.query.name || "Sweetheart";
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>A Question for ${name}</title>
            <style>
                body { 
                    background: #ffecf2; 
                    font-family: 'Arial', sans-serif; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    margin: 0; 
                    overflow: hidden; 
                }
                h1 { color: #d00000; font-size: 3rem; text-shadow: 2px 2px #fff; text-align: center; padding: 0 20px; }
                .button-container { position: relative; width: 100%; height: 100px; display: flex; justify-content: center; align-items: center; gap: 40px; }
                .btn { 
                    padding: 15px 40px; 
                    font-size: 1.5rem; 
                    border-radius: 50px; 
                    border: none; 
                    cursor: pointer; 
                    font-weight: bold; 
                    transition: transform 0.2s, background-color 0.3s;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                #yes-btn { background-color: #ff4d6d; color: white; }
                #yes-btn:hover { background-color: #ff758f; transform: scale(1.1); }
                #no-btn { 
                    background-color: #f8f9fa; 
                    color: #555; 
                    position: absolute; 
                    transition: 0.15s ease-out; 
                    white-space: nowrap;
                }
                .heart { font-size: 5rem; color: #ff4d6d; margin-bottom: 20px; animation: beat 1s infinite alternate; }
                @keyframes beat { from { transform: scale(1); } to { transform: scale(1.1); } }
            </style>
        </head>
        <body>
            <div class="heart">❤️</div>
            <h1>${name}, will you be my Valentine?</h1>
            
            <div class="button-container">
                <button id="yes-btn" class="btn" onclick="location.href='/success?name=${encodeURIComponent(name)}'">Yes!</button>
                <button id="no-btn" class="btn" onmouseover="moveNoButton()" onclick="moveNoButton()">No</button>
            </div>

            <script>
                function moveNoButton() {
                    const btn = document.getElementById('no-btn');
                    // Get viewport dimensions minus button size
                    const maxX = window.innerWidth - btn.offsetWidth - 20;
                    const maxY = window.innerHeight - btn.offsetHeight - 20;
                    
                    const randomX = Math.floor(Math.random() * maxX);
                    const randomY = Math.floor(Math.random() * maxY);
                    
                    btn.style.left = randomX + 'px';
                    btn.style.top = randomY + 'px';
                }
            </script>
        </body>
        </html>
    `);
});

// --- 3. THE SUCCESS PAGE ---
app.get('/success', (req, res) => {
    const name = req.query.name || "You";
    res.send(`
        <body style="background: #ff4d6d; color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
            <h1 style="font-size: 4rem;">YAY! 🥰</h1>
            <h2>I knew you'd say yes, ${name}!</h2>
            <div style="font-size: 5rem;">🌹🍫💖</div>
        </body>
    `);
});

app.listen(port, () => {
    console.log(`Valentine app running at http://localhost:${port}/create`);
});

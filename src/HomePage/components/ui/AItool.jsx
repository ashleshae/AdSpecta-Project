import "./aitool.css"

function AItool() {
    document.addEventListener('DOMContentLoaded', function() {
        // Tab switching
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Generate button click
        const generateBtn = document.getElementById('generate-btn');
        generateBtn.addEventListener('click', generateImage);

        // Load history from localStorage
        loadHistory();

        // Show toast notification
        function showToast(message, type = '') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = 'toast';
            toast.classList.add(type);
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Generate image function
        function generateImage() {
            const prompt = document.getElementById('prompt').value.trim();
            if (!prompt) {
                showToast('Please enter a prompt', 'error');
                return;
            }

            // Show loading state
            document.getElementById('loading').style.display = 'flex';
            document.getElementById('placeholder').style.display = 'none';
            document.getElementById('generated-image').style.display = 'none';
            document.getElementById('download-btn').style.display = 'none';

            // Get all parameters
            const model = document.getElementById('model').value;
            const width = document.getElementById('width').value;
            const height = document.getElementById('height').value;
            const seed = document.getElementById('seed').value;
            const nologo = document.getElementById('nologo').checked;
            const privateImg = document.getElementById('private').checked;
            const enhance = document.getElementById('enhance').checked;
            const safe = document.getElementById('safe').checked;
            const referrer = document.getElementById('referrer').value;

            // Build URL
            let url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
            url += `?model=${model}&width=${width}&height=${height}`;
            
            if (seed) url += `&seed=${seed}`;
            if (nologo) url += `&nologo=true`;
            if (privateImg) url += `&private=true`;
            if (enhance) url += `&enhance=true`;
            if (safe) url += `&safe=true`;
            if (referrer) url += `&referrer=${encodeURIComponent(referrer)}`;

            // Add timestamp to prevent caching
            url += `&timestamp=${Date.now()}`;

            // Fetch image
            const img = document.getElementById('generated-image');
            img.onload = function() {
                document.getElementById('loading').style.display = 'none';
                img.style.display = 'block';
                
                // Set download link
                const downloadBtn = document.getElementById('download-btn');
                downloadBtn.href = url;
                downloadBtn.style.display = 'inline-block';
                
                // Add to history
                addToHistory(prompt, url);
                
                showToast('Image generated successfully!', 'success');
            };
            
            img.onerror = function() {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('placeholder').style.display = 'block';
                showToast('Error generating image. Please try again.', 'error');
            };
            
            img.src = url;
        }

        // Add to history
        function addToHistory(prompt, imageUrl) {
            // Get current history
            let history = JSON.parse(localStorage.getItem('imageHistory') || '[]');
            
            // Add new item
            history.unshift({
                prompt: prompt,
                imageUrl: imageUrl,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 10 items
            if (history.length > 10) {
                history = history.slice(0, 10);
            }
            
            // Save to localStorage
            localStorage.setItem('imageHistory', JSON.stringify(history));
            
            // Update UI
            loadHistory();
        }

        // Load history
        function loadHistory() {
            const history = JSON.parse(localStorage.getItem('imageHistory') || []);
            const historyContainer = document.getElementById('history-items');
            
            historyContainer.innerHTML = '';
            
            if (history.length === 0) {
                historyContainer.innerHTML = '<p>No history yet. Generate some images!</p>';
                return;
            }
            
            history.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.prompt}">
                    <div class="prompt">${item.prompt}</div>
                `;
                
                historyItem.addEventListener('click', () => {
                    document.getElementById('prompt').value = item.prompt;
                    document.getElementById('generated-image').src = item.imageUrl;
                    document.getElementById('generated-image').style.display = 'block';
                    document.getElementById('placeholder').style.display = 'none';
                    
                    const downloadBtn = document.getElementById('download-btn');
                    downloadBtn.href = item.imageUrl;
                    downloadBtn.style.display = 'inline-block';
                });
                
                historyContainer.appendChild(historyItem);
            });
        }

        // Example prompts
        const examplePrompts = [
            "A beautiful sunset over the ocean with palm trees",
            "A futuristic city with flying cars and neon lights",
            "A cute corgi puppy playing in a field of flowers",
            "An astronaut riding a horse on Mars",
            "A steampunk airship flying through clouds"
        ];

        // Random example prompt button
        const randomPromptBtn = document.createElement('button');
        randomPromptBtn.className = 'btn btn-secondary';
        randomPromptBtn.innerHTML = '<i class="fas fa-random"></i> Random Example Prompt';
        randomPromptBtn.style.marginTop = '0.5rem';
        randomPromptBtn.addEventListener('click', () => {
            const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
            document.getElementById('prompt').value = randomPrompt;
        });
        
        document.querySelector('.form-group:first-child').appendChild(randomPromptBtn);
    });

return (
    <div>
    <div className="container">
        
        <h1>AI Image Generator</h1>
        <p class="subtitle">Create stunning images from text prompts using Pollinations.ai API</p>
        


    <div class="app-container">
        <div class="controls">
            <div class="form-group">
                <label for="prompt">Image Prompt</label>
                <textarea id="prompt" placeholder="Describe the image you want to generate..."></textarea>
            </div>

            <div class="tab-container">
                <div class="tabs">
                    <div class="tab active" data-tab="basic">Basic</div>
                    <div class="tab" data-tab="advanced">Advanced</div>
                </div>
                <div class="tab-content active" id="basic-tab">
                    <div class="form-group">
                        <label for="model">Model</label>
                        <select id="model">
                            <option value="flux">Flux (Default)</option>
                            <option value="turbo">Turbo</option>
                        </select>
                    </div>

                    <div class="form-group dimensions">
                        <div>
                            <label for="width">Width</label>
                            <input type="number" id="width" value="1024" min="256" max="2048"/>
                        </div>
                        <div>
                            <label for="height">Height</label>
                            <input type="number" id="height" value="1024" min="256" max="2048"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Options</label>
                        <div class="checkbox-group">
                            <input type="checkbox" id="enhance"/>
                            <label for="enhance">Enhance prompt with AI</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="nologo"/>
                            <label for="nologo">Remove watermark</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="safe"/>
                            <label for="safe">Strict NSFW filter</label>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="advanced-tab">
                    <div class="form-group">
                        <label for="seed">Seed (leave empty for random)</label>
                        <input type="number" id="seed" placeholder="Random seed"/>
                    </div>

                    <div class="form-group">
                        <label for="referrer">Referrer (optional)</label>
                        <input type="text" id="referrer" placeholder="Your website or app name"/>
                    </div>

                    <div class="form-group">
                        <div class="checkbox-group">
                            <input type="checkbox" id="private"/>
                            <label for="private">Private (don't show in public feed)</label>
                        </div>
                    </div>
                </div>
            </div>

            <button id="generate-btn" class="btn btn-block">
                <i class="fas fa-magic"></i> Generate Image
            </button>
        </div>

        <div class="image-preview">
            <div id="loading" class="loading" styles="display: none;">
                <div class="spinner"></div>
                <p>Generating your image...</p>
            </div>

            <div id="placeholder" class="placeholder">
                <i class="fas fa-image"></i>
                <p>Your generated image will appear here</p>
            </div>

            <img id="generated-image" class="generated-image" alt="Generated image"/>
            
            <a id="download-btn" class="btn download-btn" download="ai-image.jpg">
                <i class="fas fa-download"></i> Download Image
            </a>
        </div>
    </div>

    <div class="history">
        <h3>Generation History</h3>
        <div id="history-items" class="history-items">
            # History items will be added here
        </div>
    </div>

    <footer>
        <p>Powered by Pollinations.ai API | Made with ❤️ for AI enthusiasts</p>
        <p>Made by Kriztech</p>
    </footer>
</div>

<div id="toast" class="toast"></div>
</div>
);
}

export default AItool;
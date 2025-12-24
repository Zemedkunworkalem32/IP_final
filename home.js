
    const stack = document.getElementById('cardStack');
    let currentRotation = 0;
    let targetRotation = 0;
    let isUsingMouse = false;
    let autoRotationSpeed = 0.15; 
    let lastMoveTime = Date.now();

    window.addEventListener('mousemove', (e) => {
        const screenWidth = window.innerWidth;
        targetRotation = (e.clientX / screenWidth - 0.5) * 360;
        isUsingMouse = true;
        lastMoveTime = Date.now();
    });

    window.addEventListener('mouseout', () => isUsingMouse = false);

    function animate() {
        if (Date.now() - lastMoveTime > 2000) {
            isUsingMouse = false;
        }

        if (isUsingMouse) {
            currentRotation += (targetRotation - currentRotation) * 0.05;
        } else {
            currentRotation += autoRotationSpeed;
        }

        stack.style.transform = `rotateY(${currentRotation}deg)`;
        requestAnimationFrame(animate);
    }
    animate();

    function toggleAuth() {
        const modal = document.getElementById('authModal');
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    }

    function switchAuth(mode) {
        const loginF = document.getElementById('loginForm');
        const signupF = document.getElementById('signupForm');
        const loginT = document.getElementById('loginTab');
        const signupT = document.getElementById('signupTab');
        if(mode === 'login') {
            loginF.classList.remove('hidden'); signupF.classList.add('hidden');
            loginT.classList.add('active'); signupT.classList.remove('active');
        } else {
            loginF.classList.add('hidden'); signupF.classList.remove('hidden');
            signupT.classList.add('active'); loginT.classList.remove('active');
        }
    }

    // Handle Login/Signup submission
    const handleAuth = (e) => {
        e.preventDefault();
        
        // Extract info from form
        const name = e.target.querySelector('input[type="text"]')?.value || "Traveler";
        const email = e.target.querySelector('input[type="email"]')?.value || "user@ethiotrip.com";

        // SET LOGIN STATE IN LOCAL STORAGE
        localStorage.setItem("isLoggedIn", "true");

        // Close the modal
        toggleAuth();
        
        // Replace Sign In button with Profile Dropdown
        const signInBtn = document.querySelector('.btn-signin');
        if (signInBtn) {
            const li = signInBtn.closest('li');
            li.innerHTML = `
                <div class="profile-dropdown" style="position: relative; cursor: pointer;">
                    <div id="profileTrigger" style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 35px; height: 35px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                    <div id="dropdownContent" style="display: none; position: absolute; right: 0; top: 45px; background: white; min-width: 200px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border-radius: 12px; padding: 15px; z-index: 1001; text-align: left; border: 1px solid #eee;">
                        <p style="margin: 0; font-weight: 600; color: var(--primary); font-size: 0.9rem;">${name}</p>
                        <p style="margin: 5px 0 10px 0; color: var(--text-light); font-size: 0.8rem; border-bottom: 1px solid #eee; padding-bottom: 10px;">${email}</p>
                        <a href="#" style="text-decoration: none; color: var(--primary); font-size: 0.85rem; display: block; margin-top: 5px;" onclick="localStorage.removeItem('isLoggedIn'); location.reload()">Sign Out</a>
                    </div>
                </div>
            `;


            const trigger = document.getElementById('profileTrigger');
            const content = document.getElementById('dropdownContent');
            
            trigger.onclick = (event) => {
                event.stopPropagation();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            };

            window.addEventListener('click', () => { content.style.display = 'none'; });
        }
    };

    document.getElementById('loginForm').onsubmit = handleAuth;
    document.getElementById('signupForm').onsubmit = handleAuth;
    window.onclick = (e) => { if (e.target == document.getElementById('authModal')) toggleAuth(); }


// ==================== المتغيرات العامة ====================
let currentScreen = 0;
let candlesLit = 4;
let musicPlaying = false;
let sonName = '';
let motherName = '';
let personalMessage = '';
let heartClickCount = 0;
let clickedDua = [false, false, false];
let selectedTheme = 'theme1';
let selectedFont = 'tajawal';

// تعريف الثيمات الستة (متنوعة تناسب كل الأذواق)
const themes = {
    theme1: { // ثيم الغروب - دافئ وحيوي
        primary: '#FF6B6B',
        secondary: '#FFE66D',
        accent1: '#4ECDC4',
        accent2: '#FF9F1C',
        name: 'الغروب'
    },
    theme2: { // ثيم البنفسجي - رومانسي وناعم
        primary: '#9b5de6',
        secondary: '#ff9eb5',
        accent1: '#b5e6e6',
        accent2: '#ffe27a',
        name: 'البنفسجي'
    },
    theme3: { // ثيم المحيط - هادئ ومنعش
        primary: '#00B4D8',
        secondary: '#90E0EF',
        accent1: '#0077B6',
        accent2: '#CAF0F8',
        name: 'المحيط'
    },
    theme4: { // ثيم الدفء - ألوان ترابية دافئة
        primary: '#c44569',
        secondary: '#f19066',
        accent1: '#e66767',
        accent2: '#f5cd79',
        name: 'الدفء'
    },
    theme5: { // ثيم الفخامة - ألوان عميقة راقية
        primary: '#6C5B7B',
        secondary: '#F8A5C2',
        accent1: '#F3D1B0',
        accent2: '#A8D5BA',
        name: 'الفخامة'
    },
    theme6: { // ثيم النعومة - ألوان pastel محبوبة
        primary: '#A8E6CF',
        secondary: '#FFD3B6',
        accent1: '#FFAAA5',
        accent2: '#FF8B94',
        name: 'النعومة'
    }
};

// عناصر الصفحة
const bgMusic = document.getElementById('bgMusic');
const loadingScreen = document.getElementById('loadingScreen');
const screens = document.querySelectorAll('.screen');
const candlesWrapper = document.getElementById('candlesWrapper');
const afterCakeMessage = document.getElementById('afterCakeMessage');
const candlesLeftSpan = document.getElementById('candlesLeft');
const loveWordContainer = document.getElementById('loveWordContainer');
const growingHeart = document.getElementById('growingHeart');
const heartCircle = document.getElementById('heartCircle');
const heartCounter = document.getElementById('heartCounter');
const goToFinalBtn = document.getElementById('goToFinalBtn');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

// ==================== بداية التشغيل ====================
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1800);

    // إنشاء الشمعات
    createCandles();

    // إنشاء قلوب متحركة
    createFloatingHearts();

    // معالجة الرابط
    initFromURL();
    
    // تفعيل الثيم الافتراضي
    selectTheme('theme1');
});

// ==================== إنشاء قلوب متحركة ====================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        container.appendChild(heart);
    }
}

// ==================== إنشاء الشمعات ====================
function createCandles() {
    if (!candlesWrapper) return;
    
    candlesWrapper.innerHTML = '';
    
    for (let i = 1; i <= 4; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.id = `candle${i}`;
        
        candle.innerHTML = `
            <div class="candle-body"></div>
            <div class="wick"></div>
            <div class="flame lit" id="flame${i}" onclick="blowCandle(${i})">
                <div class="flame-inner"></div>
            </div>
        `;
        
        candlesWrapper.appendChild(candle);
    }
    
    candlesLit = 4;
    updateCandlesCounter();
}

// ==================== إطفاء الشموع ====================
function blowCandle(candleNumber) {
    const flame = document.getElementById(`flame${candleNumber}`);
    const candle = document.getElementById(`candle${candleNumber}`);
    
    if (!flame || !flame.classList.contains('lit')) return;
    
    flame.classList.remove('lit');
    flame.style.display = 'none';
    
    // تأثيرات مختلفة
    if (candle) {
        if (candleNumber === 1) {
            candle.style.animation = 'flyAway 0.6s ease-out forwards';
        } else if (candleNumber === 2) {
            candle.style.animation = 'explodeEffect 0.6s ease-out forwards';
            createStarEffect(candle);
        } else if (candleNumber === 3) {
            candle.style.animation = 'jumpEffect 0.6s ease-out forwards';
        } else if (candleNumber === 4) {
            candle.style.animation = 'heartTransform 0.6s ease-out forwards';
            createHeartEffect(candle);
        }
    }
    
    // إظهار كلمة بحبك
    showLoveWord();
    
    candlesLit--;
    playSound('blow');
    updateCandlesCounter();
    
    if (candlesLit === 0 && afterCakeMessage) {
        setTimeout(() => {
            afterCakeMessage.style.opacity = '1';
            playSound('win');
        }, 800);
    }
}

function showLoveWord() {
    if (!loveWordContainer) return;
    
    loveWordContainer.innerHTML = '';
    
    const word = document.createElement('div');
    word.className = 'love-word';
    
    // ألوان حسب الثيم
    const theme = themes[selectedTheme];
    const colors = [theme.primary, theme.secondary, theme.accent1, theme.accent2];
    word.style.color = colors[candlesLit - 1];
    word.textContent = 'بحبك';
    
    loveWordContainer.appendChild(word);
    
    setTimeout(() => {
        loveWordContainer.innerHTML = '';
    }, 1000);
}

function createStarEffect(candle) {
    const rect = candle.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.left = (rect.left + rect.width/2) + 'px';
        star.style.top = (rect.top) + 'px';
        star.style.width = '15px';
        star.style.height = '15px';
        star.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
        star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        star.style.animation = 'rain 1s linear forwards';
        star.style.zIndex = '1000';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    }
}

function createHeartEffect(candle) {
    const rect = candle.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width/2) + 'px';
        heart.style.top = (rect.top) + 'px';
        heart.style.color = '#ff69b4';
        heart.style.fontSize = '2rem';
        heart.innerHTML = '❤️';
        heart.style.animation = 'rain 1s linear forwards';
        heart.style.zIndex = '1000';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

function updateCandlesCounter() {
    if (candlesLeftSpan) candlesLeftSpan.textContent = candlesLit;
}

// ==================== دوال اختيار الثيم والخط ====================
function selectTheme(themeId) {
    // إزالة التحديد من كل الثيمات
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // إضافة التحديد للثيم المختار
    const selectedElement = document.querySelector(`[data-theme="${themeId}"]`);
    if (selectedElement) {
        selectedElement.classList.add('selected');
    }
    
    // حفظ الثيم المختار
    selectedTheme = themeId;
    
    // تطبيق الثيم على المعاينة إذا كان في وضع المعاينة
    const theme = themes[themeId];
    if (theme) {
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent1', theme.accent1);
        document.documentElement.style.setProperty('--accent2', theme.accent2);
    }
}

function selectFont(fontName) {
    selectedFont = fontName;
    
    // تغيير خط الجسم
    document.body.className = '';
    document.body.classList.add(`font-${fontName}`);
}

// ==================== معالجة الرابط ====================
function getParamsFromURL() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        sonName = urlParams.get('from') || '';
        motherName = urlParams.get('to') || '';
        personalMessage = urlParams.get('msg') || '';
        
        // قراءة الثيم والخط من الرابط
        const themeParam = urlParams.get('theme');
        const fontParam = urlParams.get('font');
        
        if (themeParam && themes[themeParam]) {
            selectedTheme = themeParam;
        }
        
        if (fontParam) {
            selectedFont = fontParam;
        }
        
        sonName = decodeURIComponent(sonName).trim();
        motherName = decodeURIComponent(motherName).trim();
        personalMessage = decodeURIComponent(personalMessage).trim();
    } catch (e) {
        sonName = '';
        motherName = '';
        personalMessage = '';
    }
}

function initFromURL() {
    getParamsFromURL();
    
    // إخفاء جميع الشاشات أولاً
    screens.forEach(screen => screen.classList.remove('active'));
    
    if (sonName || motherName) {
        // فيه بيانات = الأم تفتح الموقع
        document.getElementById('screenFingerprint').classList.add('active');
        updateAllNames();
        
        // تطبيق الثيم والخط المخزن
        if (selectedTheme) {
            const theme = themes[selectedTheme];
            document.documentElement.style.setProperty('--primary', theme.primary);
            document.documentElement.style.setProperty('--secondary', theme.secondary);
            document.documentElement.style.setProperty('--accent1', theme.accent1);
            document.documentElement.style.setProperty('--accent2', theme.accent2);
        }
        
        if (selectedFont) {
            document.body.classList.add(`font-${selectedFont}`);
        }
    } else {
        // ما فيه بيانات = الابن يفتح الموقع
        document.getElementById('screenRegister').classList.add('active');
        
        // تطبيق الثيم الافتراضي على شاشة التسجيل
        const theme = themes['theme1'];
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent1', theme.accent1);
        document.documentElement.style.setProperty('--accent2', theme.accent2);
    }
}

// ==================== تحديث الأسماء ====================
function updateAllNames() {
    const displaySon = sonName || 'ابنك';
    const displayMother = motherName || 'أمي';
    
    safeSetText('motherNameDisplay', displayMother);
    safeSetText('sonNameDisplay', displaySon);
    safeSetText('motherNameCake', displayMother);
    safeSetText('motherNameLetter', displayMother);
    safeSetText('signatureNameDetailed', displaySon);
    safeSetText('motherNameWishes', displayMother);
    safeSetText('motherNameFinal', displayMother);
    safeSetText('personalSignature', displaySon);
    
    // بناء نص الرسالة
    buildLetterContent(displaySon, displayMother);
}

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function buildLetterContent(son, mother) {
    const letterBody = document.getElementById('letterBodyDetailed');
    if (!letterBody) return;
    
    letterBody.innerHTML = `
        <p class="greeting">${mother} الغالية،</p>
        <p>كل سنة وأنتِ طيبة وبخير. كل سنة وأنا أشوف النور في عيونك وأفرح. كلمات الدنيا كلها ما توفيك حقك.</p>
        <p>يا ${mother}، والله إني كل ما أشوفك أتذكر كم تعبتي عشاني. كم سهرتِ الليالي عشان أرتاح. كم دعوة دعيتيها لي وما كنت أدري عنها.</p>
        <p class="quote">" يا رب زي ما فرحتيني في صغري، أنا أبي أشوفك تفرحي فيا "</p>
        <p>أنتِ الأساس، أنتِ السند، أنتِ الحضن الدافي. الله لا يحرمني منك ولا من دعواتك.</p>
    `;
}

// ==================== التنقل بين الشاشات ====================
function goToScreen(screenNumber) {
    screens.forEach(screen => screen.classList.remove('active'));
    
    if (screenNumber === 1) document.getElementById('screen1').classList.add('active');
    else if (screenNumber === 2) document.getElementById('screen2').classList.add('active');
    else if (screenNumber === 3) document.getElementById('screen3').classList.add('active');
    else if (screenNumber === 4) document.getElementById('screen4').classList.add('active');
    else if (screenNumber === 5) document.getElementById('screen5').classList.add('active');
    
    updateTrackerDots(screenNumber);
    playSound('transition');
}

function updateTrackerDots(screenNumber) {
    const dots = document.querySelectorAll('.tracker-dot-compact');
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (screenNumber === 1) dots[0]?.classList.add('active');
    else if (screenNumber === 2) dots[1]?.classList.add('active');
    else if (screenNumber === 3) dots[2]?.classList.add('active');
    else if (screenNumber === 5) dots[3]?.classList.add('active');
    else if (screenNumber === 4) dots[4]?.classList.add('active');
}

function startMotherJourney() {
    playSound('magic');
    playMusic();
    
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById('screen1').classList.add('active');
}

function startJourneyAfterFingerprint() {
    playSound('transition');
    goToScreen(2);
}

// ==================== الأدعية ====================
function showDua(index) {
    const duas = [
        "🤲 اللهم اطّل عمرها في طاعتك، واغسل قلبها باليقين والرضا",
        "🤲 اللهم أبدل تعبها راحة، وحزنها فرحًا، ودموعها ابتسامة",
        "🤲 اللهم اجعلني قرة عينها، وسندها في الدنيا، ورفيقها في الجنة"
    ];
    
    document.getElementById('duaMessage').textContent = duas[index];
    clickedDua[index] = true;
    
    playSound('magic');
    
    if (clickedDua.every(v => v === true)) {
        if (goToFinalBtn) goToFinalBtn.style.display = 'inline-flex';
        showNotification('✨ فتحتي كل الأدعية');
    }
}

// ==================== القلب المتنامي ====================
function growHeart() {
    heartClickCount++;
    
    if (heartClickCount <= 8) {
        if (heartCounter) heartCounter.textContent = `${heartClickCount}/8`;
        
        const scale = 1 + (heartClickCount * 0.15);
        if (growingHeart) growingHeart.style.transform = `scale(${scale})`;
        if (heartCircle) heartCircle.style.transform = `scale(${1 + (heartClickCount * 0.05)})`;
        
        playSound('click');
        
        if (heartClickCount === 8) {
            setTimeout(() => {
                goToScreen(4);
            }, 500);
        }
    }
}

// ==================== انفجار القلب النهائي ====================
function explodeFinalHeart() {
    const heart = document.getElementById('colorfulHeart');
    const finalBox = document.getElementById('finalMagicBox');
    
    if (heart) heart.style.display = 'none';
    
    // كونفيتي
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    
    playSound('win');
    
    setTimeout(() => {
        if (finalBox) {
            finalBox.style.display = 'block';
            
            const msgDisplay = document.getElementById('personalMessageDisplay');
            if (msgDisplay) {
                msgDisplay.textContent = personalMessage || 'أمي الغالية... أنتِ كل شيء في حياتي. كلماتي ما توفيك حقك، بس حبي كبير قد الدنيا.';
            }
        }
    }, 800);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
    confetti.style.borderRadius = '50%';
    confetti.style.animation = 'rain ' + (Math.random() * 2 + 2) + 's linear';
    confetti.style.zIndex = '10000';
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
}

// ==================== مطر القلوب ====================
function rainHearts() {
    for (let i = 0; i < 70; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
        heart.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        heart.innerHTML = ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)];
        heart.style.animation = 'rain ' + (Math.random() * 3 + 2) + 's linear';
        heart.style.zIndex = '10000';
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    
    playSound('magic');
}

// ==================== إعادة الرحلة ====================
function restartJourney() {
    // إعادة تعيين الشمعات
    candlesLit = 4;
    if (candlesLeftSpan) candlesLeftSpan.textContent = candlesLit;
    
    document.querySelectorAll('.candle').forEach(candle => {
        candle.style.animation = '';
        candle.style.opacity = '1';
    });
    
    document.querySelectorAll('.flame').forEach(flame => {
        flame.style.display = 'block';
        flame.classList.add('lit');
    });
    
    // إخفاء رسالة الكعكة
    if (afterCakeMessage) afterCakeMessage.style.opacity = '0';
    
    // إعادة القلب المتنامي
    heartClickCount = 0;
    if (heartCounter) heartCounter.textContent = '0/8';
    if (growingHeart) growingHeart.style.transform = 'scale(1)';
    if (heartCircle) heartCircle.style.transform = 'scale(1)';
    
    // إعادة الأدعية
    clickedDua = [false, false, false];
    if (goToFinalBtn) goToFinalBtn.style.display = 'none';
    const duaMsg = document.getElementById('duaMessage');
    if (duaMsg) duaMsg.textContent = '✨ انتظرين تضغطين على الورد ✨';
    
    // إعادة الختام
    const finalHeart = document.getElementById('colorfulHeart');
    const finalBox = document.getElementById('finalMagicBox');
    
    if (finalHeart) finalHeart.style.display = 'block';
    if (finalBox) finalBox.style.display = 'none';
    
    // العودة لشاشة البصمة
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById('screenFingerprint').classList.add('active');
}

// ==================== إدارة الموسيقى ====================
function playMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => {});
    musicPlaying = true;
    if (musicIcon) musicIcon.className = 'fas fa-volume-up';
}

function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    musicPlaying = false;
    if (musicIcon) musicIcon.className = 'fas fa-music';
}

function toggleMusic() {
    if (musicPlaying) pauseMusic();
    else playMusic();
}

// ==================== إنشاء الرابط ====================
function generateLink() {
    const son = document.getElementById('sonName')?.value.trim();
    const mother = document.getElementById('motherName')?.value.trim();
    const msg = document.getElementById('personalMessage')?.value.trim();
    
    if (!son || !mother || !msg) {
        alert('الرجاء كتابة جميع الحقول');
        return;
    }
    
    const cleanSon = encodeURIComponent(son);
    const cleanMother = encodeURIComponent(mother);
    const cleanMsg = encodeURIComponent(msg);
    
    // إضافة الثيم والخط للرابط
    const baseUrl = window.location.href.split('?')[0];
    const link = `${baseUrl}?from=${cleanSon}&to=${cleanMother}&msg=${cleanMsg}&theme=${selectedTheme}&font=${selectedFont}`;
    
    const generatedLink = document.getElementById('generatedLink');
    const linkBox = document.getElementById('linkBox');
    
    if (generatedLink) generatedLink.textContent = link;
    if (linkBox) linkBox.style.display = 'block';
    
    showNotification('✅ تم إنشاء الرابط');
}

function copyLink() {
    const link = document.getElementById('generatedLink')?.textContent;
    if (!link) return;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => showNotification('📋 تم النسخ'));
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('📋 تم النسخ');
    }
}

function previewSite() {
    const son = document.getElementById('sonName')?.value.trim();
    const mother = document.getElementById('motherName')?.value.trim();
    const msg = document.getElementById('personalMessage')?.value.trim();
    
    if (!son || !mother || !msg) return;
    
    sonName = son;
    motherName = mother;
    personalMessage = msg;
    
    updateAllNames();
    
    // تطبيق الثيم والخط على المعاينة
    if (selectedTheme) {
        const theme = themes[selectedTheme];
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent1', theme.accent1);
        document.documentElement.style.setProperty('--accent2', theme.accent2);
    }
    
    if (selectedFont) {
        document.body.className = '';
        document.body.classList.add(`font-${selectedFont}`);
    }
    
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById('screenFingerprint').classList.add('active');
}

// ==================== لوحة التحكم ====================
function togglePanel() {
    const content = document.getElementById('panelContent');
    if (content) {
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    }
}

// ==================== الأصوات والإشعارات ====================
function playSound(type) {
    try {
        const sounds = {
            'blow': 'https://assets.mixkit.co/sfx/preview/mixkit-candle-blow-738.mp3',
            'win': 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
            'transition': 'https://assets.mixkit.co/sfx/preview/mixkit-soft-click-555.mp3',
            'magic': 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-3090.mp3',
            'click': 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'
        };
        
        if (sounds[type]) {
            new Audio(sounds[type]).play().catch(() => {});
        }
    } catch (e) {}
}

function showNotification(message) {
    const old = document.querySelector('.notification');
    if (old) old.remove();
    
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideDown 0.5s ease reverse';
        setTimeout(() => notif.remove(), 500);
    }, 2500);
}

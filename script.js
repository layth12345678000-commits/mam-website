// ==================== المتغيرات العامة ====================
let currentScreen = 1;
let candlesLit = 3;
let musicPlaying = false;
let sonName = '';
let motherName = '';

// عناصر الصفحة
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const loadingScreen = document.getElementById('loadingScreen');
const registerScreen = document.getElementById('registerScreen');
const screens = document.querySelectorAll('.screen');
const candlesWrapper = document.getElementById('candlesWrapper');
const afterCakeMessage = document.getElementById('afterCakeMessage');
const candlesLeftSpan = document.getElementById('candlesLeft');

// ==================== بداية التشغيل ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('💝 موقع أمي - بدأ التشغيل');
    
    // إخفاء شاشة التحميل بعد ثانيتين
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

    // تحديث مؤشر التقدم
    updateProgressTracker();

    // معالجة الرابط
    initFromURL();

    // إضافة مستمع لزر الموسيقى
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
});

// ==================== معالجة الرابط ====================
function getParamsFromURL() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        sonName = urlParams.get('from') || '';
        motherName = urlParams.get('to') || '';
        
        // تنظيف الأسماء من الرموز الخاصة
        sonName = decodeURIComponent(sonName).trim();
        motherName = decodeURIComponent(motherName).trim();
        
        console.log('📝 البيانات المستلمة:', { son: sonName, mother: motherName });
    } catch (e) {
        console.log('خطأ في قراءة الرابط:', e);
        sonName = '';
        motherName = '';
    }
}

function initFromURL() {
    getParamsFromURL();
    
    // إذا كان فيه أسماء في الرابط
    if (sonName || motherName) {
        // إخفاء شاشة التسجيل
        if (registerScreen) {
            registerScreen.style.display = 'none';
        }
        
        // تحديث جميع الأسماء
        updateAllNames();
        
        // إظهار أول شاشة
        showScreen(1);
        
        // محاولة تشغيل الموسيقى
        setTimeout(() => {
            playMusic();
        }, 500);
    } else {
        // إذا ما فيه أسماء، نظهر شاشة التسجيل
        if (registerScreen) {
            registerScreen.style.display = 'flex';
        }
    }
}

// ==================== تحديث الأسماء ====================
function updateAllNames() {
    const displaySon = sonName || 'ابنك';
    const displayMother = motherName || 'أمي';
    
    // تحديث الشاشة 1
    safeSetText('motherNameDisplay', displayMother);
    safeSetText('sonNameDisplay', displaySon);
    
    // تحديث الشاشة 2
    safeSetText('motherNameCake', displayMother);
    
    // تحديث الشاشة 3
    safeSetText('motherNameLetter', displayMother);
    safeSetText('signatureName', displaySon);
    
    // تحديث الشاشة 4
    safeSetText('motherNameFinal', displayMother);
    safeSetText('motherNameFooter', displayMother);
    
    // بناء محتوى الرسالة
    buildLetterContent(displaySon, displayMother);
}

function safeSetText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

function buildLetterContent(son, mother) {
    const letterBody = document.getElementById('letterBody');
    if (!letterBody) return;
    
    letterBody.innerHTML = `
        <p class="greeting-line">${mother} الغالية... يا أغلى الناس،</p>
        
        <p>كل سنة وأنتِ طيبة وبخير، وكل سنة وأنا أشوف النور في عيونك وأفرح. حقيقي كلمات الدنيا كلها ما توفيك حقك، بس حبيت أكتب لك اللي في قلبي.</p>
        
        <div class="heart-divider">
            <i class="fas fa-heart"></i>
            <i class="fas fa-heart"></i>
            <i class="fas fa-heart"></i>
        </div>
        
        <p>يا ${mother}... والله إني كل ما أشوفك أفتكر كم تعبتي عشاني، وكم سهرتي ليالي عشان أرتاح، وكم دعوة دعيتيها لي وما كنت أدري عنها. كل هذا في قلبي ومحتفظ فيه.</p>
        
        <div class="memory-box">
            <i class="fas fa-quote-right"></i>
            <p>" يا رب زي ما فرحتيني في صغري، أنا أبي أشوفك تفرحي فيا وأنا كبيرة "</p>
        </div>
        
        <p>أبي أتمنى لك من كل قلبي:</p>
        
        <ul class="wishes-list">
            <li><i class="fas fa-check-circle"></i> طول العمر والصحة والعافية</li>
            <li><i class="fas fa-check-circle"></i> إنك دايمًا مبسوطة ومبتسمة</li>
            <li><i class="fas fa-check-circle"></i> إن ربنا يخليك لي ولا يحرمني منك أبدًا</li>
            <li><i class="fas fa-check-circle"></i> إنك تشوفي أولادك وأحفادك ناجحين وفرحانين</li>
        </ul>
        
        <p>يا ${mother}... أنتِ الأساس، أنتِ السند، أنتِ الحضن الدافي اللي كل ما ضاقت الدنيا بلقاه. الله لا يحرمني منك ولا من دعواتك.</p>
    `;
    
    // تحديث الاقتباس النهائي
    const finalQuote = document.getElementById('finalQuote');
    if (finalQuote) {
        finalQuote.innerHTML = `" أمي... يا أول كلمة نطقتها، وآخر كلمة رح أقولها "`;
    }
}

// ==================== التنقل بين الشاشات ====================
function showScreen(screenNumber) {
    // إخفاء جميع الشاشات
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // إظهار الشاشة المطلوبة
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenNumber;
        updateProgressTracker();
    }
}

function goToScreen(screenNumber) {
    if (screenNumber < 1 || screenNumber > 4) return;
    showScreen(screenNumber);
    playSound('transition');
}

function startJourney() {
    playSound('transition');
    showNotification('🌸 يلا نبدأ الرحلة الحلوة');
    setTimeout(() => {
        goToScreen(2);
    }, 500);
}

function restartJourney() {
    // إعادة تعيين الشمعات
    candlesLit = 3;
    if (candlesLeftSpan) {
        candlesLeftSpan.textContent = candlesLit;
    }
    
    // إعادة إظهار الشمعات
    document.querySelectorAll('.flame.lit').forEach(flame => {
        flame.classList.remove('hidden');
    });
    
    // إخفاء رسالة الكعكة
    if (afterCakeMessage) {
        afterCakeMessage.classList.remove('show');
    }
    
    // العودة للشاشة الأولى
    showScreen(1);
    showNotification('💝 من البداية... من جديد');
}

// ==================== إنشاء الشمعات ====================
function createCandles() {
    if (!candlesWrapper) return;
    
    candlesWrapper.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.setAttribute('onclick', `blowCandle(this, ${i})`);

        candle.innerHTML = `
            <div class="candle-body"></div>
            <div class="wick"></div>
            <div class="flame lit" id="flame${i}">
                <div class="flame-inner"></div>
            </div>
        `;

        candlesWrapper.appendChild(candle);
    }

    updateCandlesCounter();
}

function blowCandle(candleElement, candleNumber) {
    const flame = document.getElementById(`flame${candleNumber}`);
    
    if (!flame || !flame.classList.contains('lit')) return;
    
    flame.classList.remove('lit');
    flame.classList.add('hidden');
    candlesLit--;
    
    playSound('blow');
    createSmoke(candleElement);
    updateCandlesCounter();
    showNotification(`🕯️ أطفأتي الشمعة ${candleNumber}`);

    if (candlesLit === 0 && afterCakeMessage) {
        setTimeout(() => {
            afterCakeMessage.classList.add('show');
            playSound('win');
            showNotification('🎉 مبروك! أطفأتي كل الشمعات');
        }, 500);
    }
}

function updateCandlesCounter() {
    if (candlesLeftSpan) {
        candlesLeftSpan.textContent = candlesLit;
    }
}

function createSmoke(candleElement) {
    const smoke = document.createElement('div');
    smoke.style.cssText = `
        position: absolute;
        width: 15px;
        height: 30px;
        background: linear-gradient(to top, rgba(150,150,150,0.5), transparent);
        border-radius: 50%;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        filter: blur(3px);
        animation: smokeRise 1s forwards;
        pointer-events: none;
    `;

    candleElement.appendChild(smoke);

    setTimeout(() => {
        if (smoke.parentNode) {
            smoke.remove();
        }
    }, 1000);
}

// ==================== إنشاء قلوب متحركة ====================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        
        heart.style.cssText = `
            font-size: ${size}px;
            left: ${left}%;
            animation: floatUp ${duration}s linear ${delay}s infinite;
        `;
        
        container.appendChild(heart);
    }
}

// ==================== مؤشر التقدم ====================
function updateProgressTracker() {
    const screenNames = ['الاستقبال', 'الكعكة', 'الرسالة', 'الختام'];
    const indicator = document.getElementById('screenIndicator');

    document.querySelectorAll('.tracker-dot').forEach((dot, index) => {
        if (index + 1 === currentScreen) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    if (indicator) {
        indicator.textContent = screenNames[currentScreen - 1];
    }
}

function togglePanel() {
    const panel = document.getElementById('controlPanel');
    if (panel) {
        panel.classList.toggle('collapsed');
    }
}

// ==================== إدارة الموسيقى ====================
function playMusic() {
    if (!bgMusic) return;
    
    bgMusic.volume = 0.5;
    bgMusic.play()
        .then(() => {
            musicPlaying = true;
            updateMusicButton();
            console.log('🎵 الموسيقى تشغل');
        })
        .catch(e => {
            console.log('🎵 الموسيقى تحتاج تفاعل:', e);
            musicPlaying = false;
            updateMusicButton();
        });
}

function pauseMusic() {
    if (!bgMusic) return;
    
    bgMusic.pause();
    musicPlaying = false;
    updateMusicButton();
    console.log('🔇 الموسيقى متوقفة');
}

function toggleMusic() {
    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function updateMusicButton() {
    if (!musicBtn) return;
    
    const icon = musicBtn.querySelector('i');
    if (icon) {
        icon.className = musicPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
}

// ==================== إنشاء الرابط ====================
function generateLink() {
    const sonInput = document.getElementById('sonName');
    const motherInput = document.getElementById('motherName');
    
    if (!sonInput || !motherInput) return;
    
    const son = sonInput.value.trim();
    const mother = motherInput.value.trim();
    
    if (!son || !mother) {
        alert('الرجاء كتابة الاسمين كاملين');
        return;
    }
    
    // تنظيف الأسماء للتأكد من صلاحيتها للرابط
    const cleanSon = encodeURIComponent(son);
    const cleanMother = encodeURIComponent(mother);
    
    // بناء الرابط
    const baseUrl = window.location.href.split('?')[0];
    const link = `${baseUrl}?from=${cleanSon}&to=${cleanMother}`;
    
    // عرض الرابط
    const generatedLink = document.getElementById('generatedLink');
    const linkBox = document.getElementById('linkBox');
    
    if (generatedLink) {
        generatedLink.textContent = link;
    }
    
    if (linkBox) {
        linkBox.style.display = 'block';
    }
    
    showNotification('✅ تم إنشاء الرابط بنجاح');
}

function copyLink() {
    const generatedLink = document.getElementById('generatedLink');
    if (!generatedLink) return;
    
    const link = generatedLink.textContent;
    
    // محاولة النسخ
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link)
            .then(() => {
                showNotification('📋 تم نسخ الرابط');
            })
            .catch(() => {
                fallbackCopy(link);
            });
    } else {
        fallbackCopy(link);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('📋 تم نسخ الرابط');
}

function previewSite() {
    const sonInput = document.getElementById('sonName');
    const motherInput = document.getElementById('motherName');
    
    if (!sonInput || !motherInput) return;
    
    const son = sonInput.value.trim();
    const mother = motherInput.value.trim();
    
    if (!son || !mother) return;
    
    sonName = son;
    motherName = mother;
    
    updateAllNames();
    
    if (registerScreen) {
        registerScreen.style.display = 'none';
    }
    
    showScreen(1);
    playMusic();
}

// ==================== الأصوات ====================
function playSound(type) {
    try {
        const soundMap = {
            'blow': 'https://assets.mixkit.co/sfx/preview/mixkit-candle-blow-738.mp3',
            'win': 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
            'transition': 'https://assets.mixkit.co/sfx/preview/mixkit-soft-click-555.mp3',
            'magic': 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-3090.mp3'
        };

        if (soundMap[type]) {
            const sound = new Audio(soundMap[type]);
            sound.volume = 0.3;
            sound.play().catch(e => console.log('صوت غير متاح:', e));
        }
    } catch (e) {
        console.log('خطأ في تشغيل الصوت:', e);
    }
}

// ==================== الإشعارات ====================
function showNotification(message) {
    // حذف أي إشعار سابق
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideDown 0.5s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, 2500);
}

// ==================== دالة مساعدة للتأكد من وجود العناصر ====================
function ensureElement(id, callback) {
    const element = document.getElementById(id);
    if (element) {
        callback(element);
    }
}
// Game state
let gameData = {
    flames: null,
    horoscope: null,
    flags: [],
    speedrun: {
      years: 100,
      events: []
    }
  };
  
  // FLAMES Game
  function calculateFlames() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
      alert('Please enter both names!');
      return;
    }
  
    const str1 = name1.toLowerCase().replace(/\s/g, '');
    const str2 = name2.toLowerCase().replace(/\s/g, '');
    
    let remaining = [...new Set(str1)].filter(char => !str2.includes(char)).length +
                   [...new Set(str2)].filter(char => !str1.includes(char)).length;
  
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let currentIndex = 0;
  
    while (flames.length > 1) {
      currentIndex = (currentIndex + remaining - 1) % flames.length;
      flames.splice(currentIndex, 1);
    }
  
    const result = flames[0];
    const meanings = {
      F: 'Friends',
      L: 'Lovers',
      A: 'Affection',
      M: 'Marriage',
      E: 'Enemy',
      S: 'Siblings'
    };
  
    const roasts = {
      F: "Friendship is like peeing your pants. Everyone can see it, but only you can feel the warmth... and sometimes you wish it was a little less warm.",
      L: "Love is like a Wi-Fi signal—great when it’s strong, but the moment it starts buffering, you’re like, ‘Did I mess something up?’💑",
      A: "Affection, huh? That's what they all say before the drama begins! 😏",
      M: "Marriage! Start planning that Pinterest wedding board! 💍",
      E: "Enemy?! Yikes, maybe try dating apps instead? 🏃‍♂️",
      S: "Siblings?! Plot twist nobody asked for! 😱"
    };
  
    gameData.flames = {
      result: meanings[result],
      roast: roasts[result]
    };
  
    const resultBox = document.getElementById('flames-result');
    resultBox.innerHTML = `
      <h3>${meanings[result]}!</h3>
      <p>${roasts[result]}</p>
    `;
    resultBox.style.display = 'block';
    // Add visible class after a small delay for animation
    setTimeout(() => resultBox.classList.add('visible'), 50);
    document.querySelector('#flames .next-button').style.display = 'block';
  }
  
  // Horoscope Match
  const FUNNY_STORIES = [
    "Your love is like a microwave: Hot, quick, and occasionally explosive! 🔥",
    "Together you're like pineapple on pizza - controversial but somehow it works! 🍕",
    "Your relationship is as stable as a house of cards in a hurricane... but make it fashion! 💃",
    "You two are like socks in a dryer - destined to get lost in each other! 🧦",
    "Your love story is written in the stars... with comic sans font! ⭐",
    "Together you're like autocorrect: Sometimes wrong, but always confident! 📱"
  ];
  
  function generateHoroscope() {
    const sign1 = document.getElementById('sign1').value;
    const sign2 = document.getElementById('sign2').value;
  
    if (!sign1 || !sign2) {
      alert('Please select both zodiac signs!');
      return;
    }
  
    const story = FUNNY_STORIES[Math.floor(Math.random() * FUNNY_STORIES.length)];
    gameData.horoscope = {
      signs: `${sign1} + ${sign2}`,
      story: story
    };
  
    const resultBox = document.getElementById('horoscope-result');
    resultBox.innerHTML = `<p>${sign1} + ${sign2}: ${story}</p>`;
    resultBox.style.display = 'block';
    setTimeout(() => resultBox.classList.add('visible'), 50);
    document.querySelector('#horoscope .next-button').style.display = 'block';
  }
  
  
  const QUESTIONS = [
    "Would they still love you if you were a worm? 🪱",
    "Do they laugh at your jokes even when they're not funny? 😅",
    "Would they share their last french fry with you? 🍟",
    "Do they text back within 3-5 business days? 📱",
    "Would they help you hide a body? (Hypothetically!) 🕵️‍♂️",
    "Does your partner breathe through their nose",
    "Would they fight a bear for you? 🐻",
    "Do they like your Instagram posts within 10 seconds? 📸"
  ];
  
  let currentQuestion = 0;
  
  function answerFlag(isGreenFlag) {
    gameData.flags.push(isGreenFlag);
    
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    document.getElementById('flag-progress').style.width = `${progress}%`;
  
    if (currentQuestion < QUESTIONS.length - 1) {
      currentQuestion++;
      document.getElementById('flag-question').textContent = QUESTIONS[currentQuestion];
    } else {
      showFlagResults();
    }
  }
  
  function showFlagResults() {
    const greenFlags = gameData.flags.filter(f => f).length;
    const percentage = (greenFlags / gameData.flags.length) * 100;
    
    let message;
    if (percentage >= 80) message = "Perfect! They're definitely a keeper! 💚";
    else if (percentage >= 60) message = "Not bad! Just a few red flags to work on! 🚩💚";
    else if (percentage >= 40) message = "Hmm... Proceed with caution! 🚨";
    else message = "Run. Just run. 🏃‍♂️💨";
  
    const resultBox = document.getElementById('flags-result');
    resultBox.innerHTML = `
      <div class="text-6xl mb-4">${percentage >= 50 ? '💚' : '🚩'}</div>
      <h3>${message}</h3>
      <p>Green Flags: ${greenFlags} / ${gameData.flags.length}</p>
    `;
    resultBox.style.display = 'block';
    setTimeout(() => resultBox.classList.add('visible'), 50);
    document.querySelector('#flags .next-button').style.display = 'block';
  }
  
   
  const EVENTS = [
    { text: "First awkward hello 👋", years: -2 },
    { text: "Shared a meme, it's getting serious! 😂", years: -3 },
    { text: "First date butterflies! 🦋", years: -5 },
    { text: "Met the parents, didn't embarrass yourself (much)! 👪", years: -10 },
    { text: "First argument about dishes 🍽️", years: -15 },
    { text: "Adopted a plant together 🌱", years: -8 },
    { text: "Survived a road trip without breaking up! 🚗", years: -12 },
    { text: "Forgot anniversary... oops! 📅", years: -20 },
    { text: "Made up with expensive gifts 🎁", years: +5 },
    { text: "Finally agreed on a Netflix show! 📺", years: +10 }
  ];
  
  let speedrunInterval;
  
  function startSpeedrun() {
    let currentEvent = 0;
    document.getElementById('speedrun-button').style.display = 'none';
    
    speedrunInterval = setInterval(() => {
      if (currentEvent >= EVENTS.length) {
        clearInterval(speedrunInterval);
        showSpeedrunResults();
        return;
      }
  
      const event = EVENTS[currentEvent];
      gameData.speedrun.years = Math.max(0, gameData.speedrun.years + event.years);
      gameData.speedrun.events.push(event.text);
  
      document.getElementById('years-counter').textContent = `${gameData.speedrun.years} Years`;
      
      const eventDiv = document.createElement('div');
      eventDiv.textContent = event.text;
      document.getElementById('event-log').appendChild(eventDiv);
  
      currentEvent++;
    }, 2000);
  }
  
  function showSpeedrunResults() {
    const resultBox = document.getElementById('speedrun-result');
    resultBox.innerHTML = `
      <h3>${gameData.speedrun.years > 0 ? "Congratulations! 🎉" : "Game Over! 💔"}</h3>
      <p>${gameData.speedrun.years > 0 
        ? `You made it through with ${gameData.speedrun.years} years to spare!` 
        : "Looks like love wasn't meant to last this time!"}</p>
    `;
    resultBox.style.display = 'block';
    setTimeout(() => resultBox.classList.add('visible'), 50);
    document.querySelector('#speedrun .next-button').style.display = 'block';
  }
  
  // Navigation
  function startJourney() {
    const welcome = document.getElementById('welcome');
    const flames = document.getElementById('flames');
    
    welcome.style.transition = 'all 0.5s ease';
    welcome.style.transform = 'translateX(-100%)';
    welcome.style.opacity = '0';
    
    setTimeout(() => {
      welcome.classList.remove('active');
      flames.classList.add('active');
      document.getElementById('flag-question').textContent = QUESTIONS[0];
    }, 500);
  }
  
  function nextGame(current, next) {
    const currentSection = document.getElementById(current);
    const nextSection = document.getElementById(next);
    
    currentSection.style.transition = 'all 0.5s ease';
    currentSection.style.transform = 'translateX(-100%)';
    currentSection.style.opacity = '0';
    
    setTimeout(() => {
      currentSection.classList.remove('active');
      nextSection.classList.add('active');
    }, 500);
  }
  
  function showFinalReport() {
    document.getElementById('speedrun').classList.remove('active');
    document.getElementById('final-report').classList.add('active');
    
    const report = document.getElementById('report-content');
    const sections = [
      {
        title: '💘 FLAMES Result',
        content: gameData.flames ? `${gameData.flames.result}: ${gameData.flames.roast}` : 'Not completed'
      },
      {
        title: '✨ Cosmic Match',
        content: gameData.horoscope ? `${gameData.horoscope.signs}: ${gameData.horoscope.story}` : 'Not completed'
      },
      {
        title: '🚩 Flag Test',
        content: gameData.flags.length > 0 
          ? `Green Flags: ${gameData.flags.filter(f => f).length} / ${gameData.flags.length}`
          : 'Not completed'
      },
      {
        title: '⏱️ Love Speedrun',
        content: `Final Score: ${gameData.speedrun.years} years remaining<div class="event-history">${
          gameData.speedrun.events.map(event => `<div>${event}</div>`).join('')
        }</div>`
      }
    ];
  
    report.innerHTML = sections.map((section, index) => `
      <div class="report-section" style="--index: ${index}">
        <h3>${section.title}</h3>
        <p>${section.content}</p>
      </div>
    `).join('');
  }
  
  function restartJourney() {
     
    gameData = {
      flames: null,
      horoscope: null,
      flags: [],
      speedrun: {
        years: 100,
        events: []
      }
    };
    
     
    document.querySelectorAll('.result-box').forEach(box => {
      box.style.display = 'none';
      box.classList.remove('visible');
    });
    document.querySelectorAll('.next-button').forEach(btn => btn.style.display = 'none');
    document.getElementById('speedrun-button').style.display = 'block';
    document.getElementById('event-log').innerHTML = '';
    document.getElementById('years-counter').textContent = '100 Years';
    document.getElementById('flag-progress').style.width = '0%';
    currentQuestion = 0;
    
     
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelectorAll('select').forEach(select => select.value = '');
    
    
    document.querySelectorAll('.game-section').forEach(section => {
      section.style.transform = '';
      section.style.opacity = '';
      section.classList.remove('active');
    });
    document.getElementById('welcome').classList.add('active');
  }
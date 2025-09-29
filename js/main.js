document.addEventListener("DOMContentLoaded", () => {

  // ===== 인트로 =====
  const subtitle = document.querySelector(".subtitle");
  const mainTitle = document.querySelector(".main-title");
  const player = document.querySelector(".player");
  const description = document.querySelector(".description");

  setTimeout(() => subtitle.style.opacity = 1, 500);
  setTimeout(() => {
    subtitle.style.transform = "translateY(0)";
    mainTitle.style.opacity = 1;
    mainTitle.style.transform = "translateY(0)";
  }, 1000);
  setTimeout(() => {
    player.style.opacity = 1;
    player.style.transform = "translateY(0)";
  }, 1500);
  setTimeout(() => {
    description.style.opacity = 1;
    description.style.transform = "translateY(0)";
  }, 2000);
  setTimeout(() => player.classList.add("blink"), 2500);

  // ===== 프로필 탭 =====
  const ARROW_GRAY = './images/arrow-gray.png';
  const ARROW_RED = './images/arrow-red.png'; 

  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));


  function bindPanel(panel) {
    if (!panel) return;
    if (panel.dataset.bound === 'true') return; 

    const lis = Array.from(panel.querySelectorAll('li'));
    if (!lis.length) return;

    lis.forEach(li => {
      const img = li.querySelector('img.arrow');
      if (img && !img.src) img.src = ARROW_GRAY;
    });

    lis.forEach((li, idx) => {
      li.addEventListener('mouseenter', () => {
        setActiveIndex(panel, idx);
      });
    });

    panel.dataset.bound = 'true';
  }

  function setActiveIndex(panel, idx) {
    const lis = Array.from(panel.querySelectorAll('li'));
    if (!lis.length) return;
    const newIndex = Math.max(0, Math.min(idx, lis.length - 1));

    lis.forEach((li, i) => {
      const img = li.querySelector('img.arrow');
      if (i === newIndex) {
        li.classList.add('active');
        if (img) img.src = ARROW_RED;
      } else {
        li.classList.remove('active');
        if (img) img.src = ARROW_GRAY;
      }
    });

    panel.dataset.activeIndex = String(newIndex);
  }

  panels.forEach(panel => {
    bindPanel(panel);
    setActiveIndex(panel, 0);
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const target = document.querySelector(`#tab-${tabId}`);
      if (!target) return;
      target.classList.add('active');


      bindPanel(target);
      setActiveIndex(target, 0); 
    });
  });

  // ===== 스킬 =====

  const skillSection = document.querySelector(".section.skills");
  const skillBox = document.querySelector(".skill-box");

  if (skillSection && skillBox) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBox.classList.add("active");

          setTimeout(() => {
            skillBox.classList.add("show-items");
            const items = skillBox.querySelectorAll(".skill-item");
            items.forEach((item, i) => {
              item.style.transitionDelay = `${i * 0.15}s`;
            });
          }, 800);

          observer.unobserve(skillSection);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
  }

  // ===== 프로젝트  =====

const wrappers = document.querySelectorAll(".image-wrapper");

wrappers.forEach(wrapper => {
  const video = wrapper.querySelector("video");

  wrapper.addEventListener("mouseenter", () => {
    video.play();
  });

  wrapper.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

const modal = document.querySelector(".project-modal");
const pagination = document.querySelector(".pagination");


function setPaginationPosition() {
  if (!modal || !pagination) return;

  if (pagination.offsetWidth === 0 || pagination.offsetHeight === 0) {
    pagination.style.minWidth = "100px";
    pagination.style.minHeight = "12px";
  }

  pagination.style.position = "fixed";      
  pagination.style.bottom = "20px";        
  pagination.style.left = "50%";            
  pagination.style.transform = "translateX(-50%)";
  pagination.style.zIndex = 9999;           
  pagination.style.display = "flex";       
  pagination.style.opacity = 1;          
}

const projectSwiper = new Swiper('.project-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.right-arrow',
    prevEl: '.left-arrow',
  },
  on: {
    init: function () {
      setTimeout(() => setPaginationPosition(), 50);
    },
    slideChange: function () {
      setPaginationPosition();
    },
    resize: function () {
      setPaginationPosition();
    }
  }
});

window.addEventListener("load", () => setTimeout(setPaginationPosition, 50));
window.addEventListener("resize", setPaginationPosition);
window.addEventListener("scroll", setPaginationPosition);


  // ===== 갤러리 =====
  const pages = document.querySelectorAll(".gallery-page");
  const dots2 = document.querySelectorAll(".gallery-section .dot");
  const prevBtn = document.querySelector(".gallery-section .arrow.left");
  const nextBtn = document.querySelector(".gallery-section .arrow.right");
  let currentIndex = 0;

  function showPage(index) {
    pages.forEach((page, i) => {
      page.classList.toggle("active", i === index);
      dots2[i].classList.toggle("active", i === index);
    });
  }
  function nextPage() {
    currentIndex = (currentIndex + 1) % pages.length;
    showPage(currentIndex);
  }
  function prevPage() {
    currentIndex = (currentIndex - 1 + pages.length) % pages.length;
    showPage(currentIndex);
  }
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);
  dots2.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showPage(currentIndex);
    });
  });
  showPage(currentIndex);



  // ===== 컨택트 =====
const line1 = document.querySelector('.contact-text .line1');
const dots3 = document.querySelector('.contact-text .dots');
const line2 = document.querySelector('.contact-text .line2');
const blinkingArrow = document.querySelector('.contact-text .blinking-arrow');
const character = document.querySelector('.character');
const messageBox = document.querySelector('.message-box');
const messageContainer = document.querySelector('.message-container');


function typeText(text, parent, speed = 50, callback) {
  let i = 0;
  function nextChar() {
    if (i >= text.length) {
      if (callback) callback();
      return;
    }
    parent.append(text[i]);
    i++;
    setTimeout(nextChar, speed);
  }
  nextChar();
}

function typeHTML(element, speed = 50, callback) {
  const nodes = Array.from(element.childNodes); 
  element.innerHTML = '';
  element.style.opacity = 1;

  let i = 0;

  function nextNode() {
    if (i >= nodes.length) {
      if (callback) callback();
      return;
    }

    const node = nodes[i];

    if (node.nodeType === Node.TEXT_NODE) {
      typeText(node.textContent, element, speed, () => {
        i++;
        nextNode();
      });
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
      const span = node;
      const text = span.textContent;
      span.textContent = '';
      element.appendChild(span); 
      typeText(text, span, speed, () => {
        i++;
        nextNode();
      });
    } else {
      element.appendChild(node.cloneNode(true));
      i++;
      nextNode();
    }
  }

  nextNode();
}

function typeDots(element, speed = 200, repeat = 3, callback) {
  let count = 0;
  element.style.opacity = 1;
  const timer = setInterval(() => {
    element.textContent = '.'.repeat(count % (repeat + 1));
    count++;
  }, speed);

  setTimeout(() => {
    clearInterval(timer);
    element.textContent = '...';
    if (callback) callback();
  }, speed * (repeat + 1) * 2);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.classList.contains("contact")) {
      typeHTML(line1, 50, () => {
        typeDots(dots3, 250, 3, () => {
          typeHTML(line2, 50, () => {
            character.style.opacity = 1;
            messageBox.style.opacity = 1;

            blinkingArrow.style.opacity = 1;

            const hoverText = messageContainer.querySelector('.hover-text');
            messageContainer.addEventListener('mouseenter', () => {
              hoverText.classList.add('hover-floating');
            });
            messageContainer.addEventListener('mouseleave', () => {
              hoverText.classList.remove('hover-floating');
            });
          });
        });
      });

      const fpWatermark = document.querySelector('.fp-watermark');
      if (fpWatermark) fpWatermark.remove();

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

observer.observe(document.querySelector(".contact"));


  });

// ===== fullPage.js =====
new fullpage('#fullpage', {
  licenseKey: 'gplv3-license',
  autoScrolling: true,
  navigation: false, 
  anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
  scrollOverflow: false,
  fitToSection: true,
  scrollingSpeed: 700,
  afterLoad: function (origin, destination, direction) {
    const items = document.querySelectorAll(".side-nav .nav-item");
    items.forEach((item, i) => {
      const heart = item.querySelector(".heart");
      item.classList.toggle("active", destination.index === i);
      heart.classList.toggle("tilt", destination.index === i);
    });
  },
  afterRender: function () { 
    const wm = document.getElementById("fp-watermark");
    if (wm) wm.remove();
  }
});

// ===== 사이드 네비 =====
document.querySelectorAll(".side-nav .heart").forEach((h, i) => {
  h.addEventListener("click", () => {
    fullpage_api.moveTo(i + 1);
  });
});


'use strict';

/**
 * copyright 2024 Bishoy Rafeq
 */

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}


// script.js

function toggleLanguage() {
  // التحقق من اللغة الحالية وتغييرها
  const currentLanguage = localStorage.getItem("language") === "ar" ? "en" : "ar";
  localStorage.setItem("language", currentLanguage);

  // تحديث النصوص حسب اللغة الحالية
  changeLanguage(currentLanguage);
}

function changeLanguage(language) {
  // تغيير اتجاه الصفحة بناءً على اللغة
  document.body.classList.toggle("ar", language === "ar");

  // تحديث الزر ليعرض الرمز المقابل للغة
  const languageBtn = document.getElementById("languageBtn");
  languageBtn.textContent = language === "en" ? "عربي" : "English";

  // تحديث النصوص الداخلية حسب اللغة
  const elements = document.querySelectorAll("[data-en][data-ar]");
  elements.forEach(element => {
      element.textContent = element.getAttribute(`data-${language}`);
  });
}

// تحميل اللغة الافتراضية عند بدء التحميل، وتحديد "ar" كقيمة ابتدائية
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "ar";  // يبدأ بـ "ar" إذا لم تكن اللغة محددة مسبقًا
  changeLanguage(savedLanguage);
});


/**
 * PRELOADER
 * 
 * preloader will be visible until document load
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * MOBILE NAVBAR
 * 
 * show the mobile navbar when click menu button
 * and hidden after click menu close button or overlay
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navLink = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const removeNav = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  }
  
  addEventOnElements(navLink, "click", removeNav);


/**
 * HEADER & BACK TOP BTN
 * 
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);

function openLocation() {
  // التحقق من دعم المتصفح لتحديد الموقع
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          // إذا نجح تحديد الموقع
          (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
              window.open(googleMapsUrl, '_blank'); // فتح موقع المستخدم الحالي في نافذة جديدة
          },
          // إذا فشل تحديد الموقع أو رفض المستخدم الإذن
          (error) => {
              openFixedLocation(); // الانتقال إلى الموقع الثابت كخيار بديل
          }
      );
  } else {
      // إذا لم يكن تحديد الموقع مدعومًا، فتح الموقع الثابت مباشرةً
      openFixedLocation();
  }
}

// دالة لفتح الموقع الثابت
function openFixedLocation() {
  const fixedLocationUrl = "https://maps.app.goo.gl/wzZbx4qzUbNtn6p56?g_st=iw";
  window.open(fixedLocationUrl, '_blank'); // فتح الرابط الثابت في نافذة جديدة
}


/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);
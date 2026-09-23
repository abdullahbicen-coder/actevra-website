const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();const h=document.querySelector('header'),m=document.querySelector('.menu');m?.addEventListener('click',()=>h.classList.toggle('open'));document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>h.classList.remove('open')));

// Google Analytics 4
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','G-83KBKDRFKV');
const ga=document.createElement('script');ga.async=true;ga.src='https://www.googletagmanager.com/gtag/js?id=G-83KBKDRFKV';document.head.appendChild(ga);

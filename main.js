/* Portfolio interactions: enlarge-on-click viewer and EMR screenshot carousel */
(function(){
var d=document.getElementById('viewer'),b=document.getElementById('vbody');
function show(img,extra){b.innerHTML='';var i=document.createElement('img');i.src=img.src;i.alt=img.alt;i.onload=function(){if(i.naturalHeight>i.naturalWidth*1.1)i.classList.add('tall');};if(img.classList.contains('avatar'))i.className='round';b.appendChild(i);if(extra){var w=document.createElement('div');w.innerHTML=extra;b.appendChild(w);}d.showModal();}
function wire(el,fn){el.addEventListener('click',fn);el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();}});}
document.querySelectorAll('.card:not([data-folder])').forEach(function(c){wire(c,function(){show(c.querySelector('img'),c.querySelector('div').innerHTML);});});
document.querySelectorAll('.zoom').forEach(function(z){wire(z,function(){show(z,'');});});
d.querySelector('.vclose').addEventListener('click',function(){d.close();});
d.addEventListener('click',function(e){if(e.target===d)d.close();});
})();

(function(){
var f=document.getElementById('folderdlg'),v=document.getElementById('viewer'),b=document.getElementById('vbody');
var T=Array.prototype.slice.call(f.querySelectorAll('.thumb')),idx=0;
function render(n){
idx=(n+T.length)%T.length;
var s=T[idx].querySelector('img'),car=document.createElement('div');car.className='car';
var i=document.createElement('img');i.src=s.src;i.alt=s.alt;
i.onload=function(){if(i.naturalHeight>i.naturalWidth*1.1)i.classList.add('tall');};
var p=document.createElement('button'),x=document.createElement('button');
p.type=x.type='button';p.className='cnav prev';x.className='cnav next';
p.setAttribute('aria-label','Previous screenshot');x.setAttribute('aria-label','Next screenshot');
p.textContent='\u2039';x.textContent='\u203A';
p.addEventListener('click',function(){render(idx-1);});x.addEventListener('click',function(){render(idx+1);});
car.appendChild(i);car.appendChild(p);car.appendChild(x);
var c=document.createElement('div');c.innerHTML='<h3></h3><p class="org"></p>';
c.querySelector('h3').textContent=s.alt;c.querySelector('.org').textContent=(idx+1)+' of '+T.length;
b.innerHTML='';b.appendChild(car);b.appendChild(c);
if(!v.open)v.showModal();
}
var fc=document.querySelector('[data-folder]');var go=function(){f.showModal();};fc.addEventListener('click',go);
fc.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
document.getElementById('closefolder').addEventListener('click',function(){f.close();});
f.addEventListener('click',function(e){if(e.target===f)f.close();});
T.forEach(function(t,n){t.addEventListener('click',function(){render(n);});});
document.addEventListener('keydown',function(e){if(!v.open||!b.querySelector('.car'))return;
if(e.key==='ArrowLeft'){e.preventDefault();render(idx-1);}else if(e.key==='ArrowRight'){e.preventDefault();render(idx+1);}});
var sx=null;b.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});
b.addEventListener('touchend',function(e){if(sx===null||!b.querySelector('.car'))return;var d=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(d)>50)render(idx+(d<0?1:-1));});
})();

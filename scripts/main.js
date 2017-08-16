function ready(callback) {
  if (typeof callback !== 'function') {
    return;
  }

  if (document.readyState === 'complete') {
    return callback();
  }

  document.addEventListener('DOMContentLoaded', callback, false);
}

function slides(el) {
  var hiddenClass = 'slides__slide--hidden';
  var cyclePeriod = 3000;
  var slides = el.querySelectorAll('.slides__slide');
  var slideLength = slides.length;
  var currentIndex = 0;

  if (slideLength === 0) {
    return;
  }

  // show first slide
  slides[currentIndex].classList.remove(hiddenClass);

  setInterval(function() {
    var nextIndex = currentIndex === slideLength - 1 ? 0 : currentIndex + 1;
    slides[nextIndex].classList.remove(hiddenClass);    
    slides[currentIndex].classList.add(hiddenClass);    
    currentIndex = nextIndex;
  }, cyclePeriod);
}

function resizeVideos() {
  var videos = document.querySelectorAll('iframe');
  var fluidEl = document.querySelector('.page-content');

  videos.forEach(function(video) {
    video.setAttribute('data-aspect-ratio', video.clientHeight / video.clientWidth);
    video.setAttribute('height', null);
    video.setAttribute('width', null);
  });

  function doResizing() {
    var newWidth = fluidEl.clientWidth;

    videos.forEach(function(video) {
      var aspectRatio = video.getAttribute('data-aspect-ratio');
      var newHeight = newWidth * aspectRatio;
      video.setAttribute('width', newWidth);
      video.setAttribute('height', newHeight);
    });
  }

  window.addEventListener('resize', doResizing);
  doResizing();
}

ready(function() {
  var slidesEl = document.querySelector('.slides');
  slidesEl && slides(slidesEl);

  resizeVideos();
});

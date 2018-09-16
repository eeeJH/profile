(function () {
  'use strict';

  var slider = $('.slider');  // 슬라이더
  var items = $('.slider_content');
  var len = items.length;
  var unit = 100; // 슬라이드 아이템 너비 단위

  var ref = {
    count: 1,  // 슬라이드 이동 카운트
    curSlide: 1 // 현재 슬라이드 (기준: 1)
  };

  // 자동 슬라이드 기능
  function autoSlider() {
    if (ref.count === len) {
      ref.count = 0;
      ref.curSlide = 0;
    }

    slider.css('transform', 'translateX(-' + (unit * ref.count) + '%)');
    ref.count++;
    ref.curSlide++;
  }

  function setPosition(xPos, count, curSlide) {
    slider.css('transform', 'translateX(' + xPos + ')');
    ref.count = count;
    ref.curSlide = curSlide;
  }

  // 좌측 이동 버튼 클릭 시
  $('.move_btn.prev').on('click', function (e) {
    switch (ref.curSlide) {
      case 1:
        setPosition('-200%', 3, 3);
        break;
      case 2:
        setPosition('0', 1, 1);
        break;
      case 3:
        setPosition('-100%', 2, 2);
        break;
      default:
        ref.curSlide -= 1;
    }
  });

  // 우측 이동 버튼 클릭 시
  $('.move_btn.next').on('click', function (e) {
    switch (ref.curSlide) {
      case 1:
        setPosition('-100%', 2, 2);
        break;
      case 2:
        setPosition('-200%', 3, 3);
        break;
      case 3:
        setPosition('0', 1, 1);
        break;
      default:
        ref.curSlide -= 1;
    }
  });

  setInterval(autoSlider, 5000); // 5초마다 배너 자동 슬라이딩
})();
  
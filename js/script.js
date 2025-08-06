// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 디버깅: jQuery와 플러그인 확인


// a 태그 기본 동작 막기
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

// splitting.js
$(function(){
    Splitting();  // 대문자로 써야 합니다!
});





// 슬라이드 제어 시스템
let currentIndex = 0;
let swipePanels = document.querySelectorAll(".swiper-slide");

const moveSlide = (index) => {
  gsap.to(swipePanels, {
    xPercent: -(index * 100),
    duration: 0.75,
    ease: "power2.out"
  });
  currentIndex = index;
};

// ScrollTrigger만 사용한 슬라이드 구현
ScrollTrigger.create({
  trigger: ".mySwiper",
  pin: true,
  start: "top top",
  end: `+=${(swipePanels.length - 1) * 100}%`, // 슬라이드 개수에 따라 end 값 조정
  markers: false,
  onEnter: () => {
    // 슬라이드 섹션 진입 시 초기 위치 설정
    gsap.set(".swiper-slide", { xPercent: 100 });
    gsap.set(".swiper-slide:first-child", { xPercent: 0 });
  },
  onUpdate: (self) => {
    // 스크롤 진행도에 따라 슬라이드 인덱스 계산 (더 민감하게)
    const progress = self.progress;
    const totalSlides = swipePanels.length;
    const targetIndex = Math.round(progress * (totalSlides - 1));
    
    // 현재 인덱스와 다를 때만 슬라이드 이동
    if (targetIndex !== currentIndex && targetIndex >= 0 && targetIndex < totalSlides) {
      moveSlide(targetIndex);
    }
  }
});



// 일반 스크롤 사용
window.addEventListener("load", function () {
  imagesLoaded(".pin-wrap", function () {
    const pinWrap = document.querySelector(".pin-wrap");
    const scrollLength = pinWrap.scrollWidth - window.innerWidth;

    gsap.to(".pin-wrap", {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: "#clone",
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: false, // ✅ 부자연스러우면 false 추천
        preventOverlaps: true
      }
    });

    ScrollTrigger.refresh();
  });
});











// Swiper 초기화 코드 제거 - GSAP로만 제어

// 전체 DOM 준비 완료 후 실행
$(document).ready(function() {
  

    // works 섹션 애니메이션 수정 - 배경색 변화 추가
    gsap.timeline({
        scrollTrigger: {
            trigger: '.works',
            scrub: 1,
            start: 'top top',
            end: '+=30%',
            // markers: true
        }
    })
    .to('.works', {
        backgroundColor: '#000', // 흰색에서 검은색으로
        duration: 1
    }, 0)
    .to('.works .inner', {
      backgroundColor: '#000', // 흰색에서 검은색으로
      duration: 1
  }, 0)
    .to('.works .inner p', {
        color: '#fff', // 텍스트 색상 변경
        borderColor: '#fff', // 테두리 색상 변경
        backgroundColor: '#000', // 배경색 변경
        duration: 1
    }, 0);
});

// 1. 네비게이션 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤 및 하이라이트 변경 기능 ✨
const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height; // 헤더 높이 계산
const navbarMenu = document.querySelector(".header__menu");
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#license",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = navbarMenu.querySelectorAll(".header__menu__item");

/**
 * 주어진 섹션 ID로 부드럽게 스크롤하는 함수
 * @param {string} selector 스크롤할 대상 섹션의 CSS 선택자 (예: '#home')
 */
function scrollTo(selector) {
  const target = document.querySelector(selector);
  if (target) {
    // target의 Y좌표에서 헤더 높이만큼 빼서 스크롤 위치 보정
    const offsetTop = target.offsetTop - headerHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth", // 부드러운 스크롤 적용
    });
  }
}

// 네비게이션 메뉴에 클릭 이벤트 리스너 추가
navbarMenu.addEventListener("click", (event) => {
  // 클릭된 요소가 메뉴 항목인지 확인
  const target = event.target;
  const link = target.dataset.link; // data-link 속성 값 가져오기
  if (link == null) {
    return; // 메뉴 항목이 아니면 함수 종료
  }

  // 이전에 활성화된 메뉴 항목의 'active' 클래스 제거
  navbarMenu
    .querySelector(".header__menu__item.active")
    .classList.remove("active");
  // 현재 클릭된 메뉴 항목에 'active' 클래스 추가
  target.classList.add("active");
  scrollTo(link);
});
//
//

// 2. 현재 스크롤 위치에 따라 메뉴 하이라이트 변경 기능 💡
// Intersection Observer를 사용하여 섹션의 가시성 감지
const observerOptions = {
  root: null, // 뷰포트를 루트로 설정
  rootMargin: `-${headerHeight - 2}px 0px -50% 0px`, // 헤더 높이만큼 상단 여백 설정하여 헤더 바로 아래에 섹션이 위치할 때 감지
  threshold: 0, // 교차점 임계값
};

let currentSelected = navItems[0]; // 현재 활성화된 메뉴 아이템 (기본값: 홈)

/**
 * 메뉴 하이라이트를 업데이트하는 함수
 * @param {HTMLElement} selected 현재 활성화할 메뉴 항목
 */
function selectNavItem(selected) {
  // 이전에 활성화된 항목의 'active' 클래스 제거
  currentSelected.classList.remove("active");
  // 현재 항목을 활성화하고 currentSelected 변수 업데이트
  currentSelected = selected;
  currentSelected.classList.add("active");
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // 섹션이 뷰포트와 교차하는 경우 (isIntersecting: true)
    if (entry.isIntersecting) {
      // 해당 섹션 ID를 찾아 메뉴 하이라이트 업데이트
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      selectNavItem(navItems[index]);
    }
  });
}, observerOptions);

// 모든 섹션에 Observer를 등록
sections.forEach((section) => observer.observe(section));

// 3. TOP 버튼 클릭 시 페이지 맨 위로 부드럽게 이동 기능 ⬆️
const arrowUp = document.querySelector(".arrow-up");

arrowUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 부드러운 스크롤 적용
  });
});
//
// 5. 다크 모드 / 라이트 모드 전환 기능 (예시) 🌙 / ☀️
// HTML body에 'dark-mode' 클래스를 토글하여 CSS 변수를 변경하는 방식
const themeToggleButton = document.createElement("button"); // 버튼 생성
themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>'; // 초기 아이콘: 달
themeToggleButton.classList.add("theme-toggle"); // CSS 스타일링을 위한 클래스 추가
themeToggleButton.title = "다크/라이트 모드 전환";

// 헤더 로고 옆에 버튼 추가
document.querySelector(".header__logo").appendChild(themeToggleButton);

themeToggleButton.addEventListener("click", () => {
  // body 요소에 'dark-mode' 클래스를 토글
  document.body.classList.toggle("dark-mode");

  // 버튼 아이콘 변경
  const isDarkMode = document.body.classList.contains("dark-mode");
  if (isDarkMode) {
    themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>'; // 다크 모드일 때: 해 아이콘
  } else {
    themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>'; // 라이트 모드일 때: 달 아이콘
  }
});

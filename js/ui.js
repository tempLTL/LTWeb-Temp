const UI = (() => {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');
    
    function toggleMenu() {
        menu.classList.toggle('open');
        // 햄버거 아이콘 애니메이션 토글 (선택사항)
        hamburger.classList.toggle('active');
    }

    function showTab(tabId) {
        // 모든 탭 숨기기
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 선택한 탭 보이기
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // 모바일에서 탭 선택 시 메뉴 닫기
        if (window.innerWidth <= 768) {
            menu.classList.remove('open');
        }
    }

    function showUpdateLog() {
        alert(
            "Update Log (Temp-1)\n\n" +
            "- 기존 기능 일부 복구\n"
        );
    }

    // 초기화: 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target) && menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    });

    return {
        toggleMenu,
        showTab,
        showUpdateLog
    };
})();

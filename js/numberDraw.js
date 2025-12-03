// numberDraw.js - 숫자뽑기 모듈 (개별 숫자 순차 애니메이션 효과)
const NumberDraw = (() => {
  function draw() {
    const start = parseInt(document.getElementById('startNum').value);
    const end = parseInt(document.getElementById('endNum').value);
    const count = parseInt(document.getElementById('countNum').value);

    if ([start, end, count].some(isNaN)) return alert('숫자를 올바르게 입력해주세요.');
    if (start > end) return alert('시작 숫자가 끝 숫자보다 클 수 없습니다.');

    const range = end - start + 1;
    if (count < 1 || count > range) return alert('뽑을 숫자 수가 범위를 벗어났습니다.');

    const numbers = Array.from({ length: range }, (_, i) => i + start);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    const result = numbers.slice(0, count);

    // 순차 애니메이션으로 결과 표시
    revealSequentially(result);
  }

  function revealSequentially(numbers) {
    const container = document.getElementById('result');
    container.innerHTML = ''; // 기존 내용 초기화
    
    // 각 숫자마다 span 생성
    numbers.forEach((number, index) => {
      const span = document.createElement('span');
      span.className = 'number-reveal';
      span.textContent = number;
      
      container.appendChild(span);
    });
    
    // 각 숫자를 순차적으로 애니메이션
    const spans = container.querySelectorAll('.number-reveal');
    spans.forEach((span, index) => {
      // 초기 상태: 투명하고 작게
      span.style.opacity = '0';
      span.style.transform = 'scale(0.3) translateY(20px)';
      span.style.filter = 'blur(10px)';
      
      // 딜레이를 두고 각각 애니메이션 (3초 간격)
      setTimeout(() => {
        // 쾅 효과와 함께 등장
        span.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        span.style.opacity = '1';
        span.style.transform = 'scale(1.2) translateY(0px)';
        span.style.filter = 'blur(0px)';
        span.style.textShadow = '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.4)';
        
        // 글로우 효과 추가
        span.classList.add('number-glow');
        
        // 잠시 후 정상 크기로 복귀
        setTimeout(() => {
          span.style.transform = 'scale(1) translateY(0px)';
          span.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
        }, 200);
        
        // 글로우 효과 제거
        setTimeout(() => {
          span.classList.remove('number-glow');
        }, 600);
        
      }, index * 3000); // 각 숫자마다 3초(3000ms) 간격
    });
  }

  return { draw };
})();

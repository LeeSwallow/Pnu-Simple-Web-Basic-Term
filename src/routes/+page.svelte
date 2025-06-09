<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<svelte:head>
    <title>포모도로 Todo - 생산적인 시간 관리</title>
    <meta name="description" content="포모도로 기법을 활용한 스마트 Todo 관리 앱으로 생산성을 높이세요">
</svelte:head>

<div class="main-container">
    <h1 class="main-title">포모도로 Todo</h1>
    <p class="main-description">스마트한 포모도로 기법으로 할일을 체계적으로 관리하세요</p>
    
    <div class="info-container">
        <!-- 첫 번째 섹션: 포모도로 기법 설명 -->
        
        <div class="info-section">
            <div class="info-section-body">
                <h2 class="info-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    포모도로 기법이란?
                </h2>
                <p class="info-section-text">
                    포모도로 기법은 25분 동안 집중해서 일하고 5분간 휴식을 취하는 시간 관리 방법입니다. 
                    이 앱을 통해 개인 맞춤형 타이머를 만들고 체계적으로 작업을 관리할 수 있습니다.
                </p>
            </div>
        </div>

        <!-- 두 번째 섹션: 주요 기능 설명 -->
        <div class="info-section">
            <div class="info-section-body">
                <h2 class="info-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" class="info-section-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    주요 기능
                </h2>
                <ul class="info-section-list">
                    <li>• 할일 생성 및 관리 (제목, 설명, 목표 포모도로 설정)</li>
                    <li>• 커스텀 포모도로 타이머 생성 (작업/휴식 시간 조절)</li>
                    <li>• 실시간 타이머 (재생, 일시정지, 재시작, 리셋)</li>
                    <li>• 포모도로 진행 상황 자동 추적</li>
                    <li>• 완료된 할일 필터링 및 통계</li>
                    <li>• 활성 할일 선택 및 즉시 시작</li>
                </ul>
            </div>
        </div>

        <!-- 세 번째 섹션: 사용 방법 설명 -->
        <div class="info-section">
            <div class="info-section-body">
                <h2 class="info-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" class="info-section-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    사용 방법
                </h2>
                <ol class="info-section-list">
                    <li>1. 할일 추가 (제목, 설명, 최소 목표 포모도로 설정)</li>
                    <li>2. 원하는 경우 개인 맞춤 타이머 생성</li>
                    <li>3. Todo 리스트에서 작업할 할일 활성화</li>
                    <li>4. 포모도로 타이머 시작 (작업시간 + 휴식시간)</li>
                    <li>5. 진행 상황 확인 및 목표 달성</li>
                </ol>
            </div>
        </div>
    </div>

    <!-- 새로운 섹션: 앱의 특징 -->
    <div class="feature-container">
        <h2 class="feature-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            이런 분들에게 추천해요
        </h2>
        <div class="feature-section">
            <div class="feature-section-item">
                <div class="feature-section-tag"></div>
                <div>
                    <h3 class="feature-section-item-title">집중력 향상이 필요한 분</h3>
                    <p class="feature-section-item-description">25분 집중 + 5분 휴식으로 최적의 집중력 유지</p>
                </div>
            </div>
            <div class="feature-section-item">
                <div class="feature-section-tag"></div>
                <div>
                    <h3 class="feature-section-item-title">할일 관리가 어려운 분</h3>
                    <p class="feature-section-item-description">체계적인 할일 분류와 진행 상황 추적</p>
                </div>
            </div>
            <div class="feature-section-item">
                <div class="feature-section-tag"></div>
                <div>
                    <h3 class="feature-section-item-title">시간 관리를 개선하고 싶은 분</h3>
                    <p class="feature-section-item-description">개인 맞춤형 타이머로 나만의 리듬 찾기</p>
                </div>
            </div>
            <div class="feature-section-item">
                <div class="feature-section-tag"></div>
                <div>
                    <h3 class="feature-section-item-title">생산성을 높이고 싶은 분</h3>
                    <p class="feature-section-item-description">목표 달성률과 완료 통계로 동기 부여</p>
                </div>
            </div>
        </div>
    </div>

    <!-- 바로가기 버튼들 -->
    <div class="shortcut-container">
        <h2 class="shortcut-title">
            바로가기
        </h2>
        <div class="shortcut-section">
            <button 
                class="shortcut-section-button"
                onclick={() => goto('/todo')}
            >
                할일 관리 시작하기
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="shortcut-section-button-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path stroke-linecap="round" 
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            </button>
            
            <button 
                class="shortcut-section-button"
                onclick={() => goto('/timer')}
            >
                커스텀 타이머 만들기
                <svg xmlns="http://www.w3.org/2000/svg" class="shortcut-section-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";

    .main-container {
        @apply px-4 py-16;
        min-width: 80vw;
    }

    .main-title {
        @apply text-4xl font-bold text-center mb-4;
    }

    .main-description {
        @apply text-center mb-12 text-lg text-base-content/70;
    }

    .info-container {
        @apply grid grid-cols-1 md:grid-cols-3 gap-8 mb-16;
    }

    .info-section {
        @apply card bg-base-100 shadow-xl;
    }

    .info-section-title {
        @apply text-xl font-bold mb-4 flex items-center gap-2;
    }

    .info-section-body {
        @apply p-6;
    }

    .info-section-icon { 
        @apply w-8 h-8 text-primary;
    }

    .info-section-list {
        @apply space-y-2 text-base-content/80 text-sm;
    }


    .info-section-text {
        @apply text-base-content/80 text-sm leading-relaxed;
    }

    .feature-container {
        @apply bg-base-200 rounded-2xl p-8 mb-16;
    }
    

    .feature-title {
        @apply text-xl font-bold mb-4 flex items-center gap-2;
    }

    .feature-section {
        @apply grid grid-cols-1 md:grid-cols-2 gap-6;
    }

    .feature-section-tag {
        @apply w-2 h-2 bg-primary rounded-full mt-2;
    }

    .feature-section-item {
        @apply flex items-start space-x-3;
    }

    .feature-section-item-title {
        @apply font-semibold;
    }

    .feature-section-item-description {
        @apply text-sm text-base-content/70;
    }

    .shortcut-container {
        @apply bg-base-200 rounded-2xl p-8;
    }
    
    .shortcut-title {
        @apply text-xl font-bold mb-4 flex items-center gap-2;
    }

    .shortcut-section {
        @apply flex flex-col sm:flex-row gap-4 justify-center;
    }

    .shortcut-section-button {
        @apply btn btn-primary btn-lg;
    }

    .shortcut-section-button-icon {
        @apply w-6 h-6 ml-2;
    }

</style>

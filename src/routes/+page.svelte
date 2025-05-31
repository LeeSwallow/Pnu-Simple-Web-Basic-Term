<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<div class="main-section">
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold text-center mb-12">포모도로 Todo</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <!-- 첫 번째 섹션: 포모도로 기법 설명 -->
            <div class="card-section">
                <div class="card-body">
                    <h2 class="card-title">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        포모도로 기법이란?
                    </h2>
                    <p class="card-content-list">
                        포모도로 기법은 25분 동안 집중해서 일하고 5분간 휴식을 취하는 시간 관리 방법입니다. 
                        이 기법을 통해 생산성을 높이고 피로를 줄일 수 있습니다.
                    </p>
                </div>
            </div>

            <!-- 두 번째 섹션: 주요 기능 설명 -->
            <div class="card-section">
                <div class="card-body">
                    <h2 class="card-title">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        주요 기능
                    </h2>
                    <ul class="card-content-list">
                        <li>25분 타이머와 5분 휴식 타이머</li>
                        <li>할 일 목록 관리</li>
                        <li>포모도로 진행 상황 추적</li>
                        <li>완료된 할 일 필터링</li>
                    </ul>
                </div>
            </div>

            <!-- 세 번째 섹션: 사용 방법 설명 -->
            <div class="card-section">
                <div class="card-body">
                    <h2 class="card-title">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        사용 방법
                    </h2>
                    <ol class="card-content-list">
                        <li>할 일 목록에서 시작할 작업 선택</li>
                        <li>25분 동안 집중해서 작업</li>
                        <li>5분간 휴식</li>
                        <li>목표한 포모도로 횟수 달성</li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- 바로가기 버튼 -->
        <div class="text-center">
            <button 
                class="btn btn-primary btn-lg"
                on:click={() => goto('/todo')}
            >
                Todo 리스트 시작하기
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";


    .card-section {
        @apply card bg-base-100 shadow-xl;
    }

    
    .card-title {
        @apply text-xl font-bold mb-4;
    }

    .card-body {
        @apply p-4;
    }

    .card-content-list {
        @apply space-y-2 text-base-content/80;
    }
</style>


<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let { children } = $props();
	let currentPath = $derived($page.url.pathname);
	let isDark = $state(false);

	onMount(() => {
		// 현재 테마 확인
		const currentTheme = document.documentElement.getAttribute('data-theme');
		isDark = currentTheme === 'dark';
	});

	function toggleTheme() {
		isDark = !isDark;
		const newTheme = isDark ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}
</script>

<!-- 테마 토글 버튼 -->
<button class="theme-toggle-btn" onclick={toggleTheme}>
	<div class="moon-icon" class:dark={isDark}>
		{#if isDark}
			🌙
		{:else}
			☀️
		{/if}
	</div>
</button>

<nav class="main-navbar">
  <div class="flex gap-4">
    
    <a href="/" class="btn normal-case text-lg flex items-center gap-2 {currentPath === '/' ? 'btn-primary' : 'btn-ghost'}">
      Home
    </a>  
    
    <a href="/todo" class="btn normal-case text-lg flex items-center gap-2 {currentPath.startsWith('/todo') ? 'btn-primary' : 'btn-ghost'}">
      Todo
    </a>
    
    <a href="/timer" class="btn normal-case text-lg flex items-center gap-2 {currentPath.startsWith('/timer') ? 'btn-primary' : 'btn-ghost'}">
      Timer
    </a>
  </div>
</nav>

<div class="main-section">
  {@render children()}
</div>

<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>

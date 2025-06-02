<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores';
	let { children } = $props();
	let currentPath = $derived($page.url.pathname);

</script>

<nav class="main-navbar">
  <div class="flex gap-4">
    
    <a href="/" class="btn normal-case text-lg flex items-center gap-2 {currentPath === '/' ? 'btn-primary' : 'btn-ghost'}">
      Home
    </a>  
    
    <a href="/todo" class="btn normal-case text-lg flex items-center gap-2 {currentPath.startsWith('/todo') ? 'btn-primary' : 'btn-ghost'}">
      Todo
    </a>
    
    <a href="/settings" class="btn normal-case text-lg flex items-center gap-2 {currentPath.startsWith('/setting') ? 'btn-primary' : 'btn-ghost'}">
      Setting
    </a>
    
    <a href="/stats" class="btn normal-case text-lg flex items-center gap-2 {currentPath.startsWith('/stats') ? 'btn-primary' : 'btn-ghost'}">
      Stats
    </a>

  </div>
</nav>

<div class="main-section">
  {@render children()}
</div>

<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>

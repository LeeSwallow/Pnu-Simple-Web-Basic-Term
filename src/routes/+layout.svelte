<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<nav class="main-header">
  <div class="flex gap-4">
    <a href="/" class="btn btn-ghost normal-case text-lg flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
      Home
    </a>
    <a href="/todo" class="btn btn-ghost normal-case text-lg flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      Todo
    </a>
    <a href="/setting" class="btn btn-ghost normal-case text-lg flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-1.14 1.603-1.14 1.902 0a1.724 1.724 0 002.573 1.01c.943-.545 2.042.354 1.497 1.297a1.724 1.724 0 001.01 2.573c1.14.3 1.14 1.603 0 1.902a1.724 1.724 0 00-1.01 2.573c.545.943-.354 2.042-1.297 1.497a1.724 1.724 0 00-2.573 1.01c-.3 1.14-1.603 1.14-1.902 0a1.724 1.724 0 00-2.573-1.01c-.943.545-2.042-.354-1.497-1.297a1.724 1.724 0 00-1.01-2.573c-1.14-.3-1.14-1.603 0-1.902a1.724 1.724 0 001.01-2.573c-.545-.943.354-2.042 1.297-1.497a1.724 1.724 0 002.573-1.01z" /></svg>
      Setting
    </a>
  </div>
</nav>

<div class="pt-24">
  {@render children()}
</div>

<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>

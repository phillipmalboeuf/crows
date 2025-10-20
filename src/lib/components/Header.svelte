<script lang="ts">
	import Logo from './Logo.svelte'
	import { page } from '$app/state'
</script>

<header class="flex">
  <a href="/" class="logo">
    <Logo />
  </a>
  <nav class="flex flex--bottom">
    <a href="/materials" aria-current={page.url.pathname === '/materials' ? 'page' : undefined}>Materials</a>
    <a href="/hours" aria-current={page.url.pathname === '/hours' ? 'page' : undefined}>Hours</a>
    <a href="/goblins" aria-current={page.url.pathname.startsWith('/goblins') ? 'page' : undefined}>Goblins</a>
    <a href="/payouts" aria-current={page.url.pathname === '/payouts' ? 'page' : undefined}>Payouts</a>
  </nav>
</header>

<style lang="scss">
  header {
    align-items: stretch;

    .logo {
      display: block;
      padding: $s-2;
      color: $blanc;
      background: $noir;

      :global(svg) {
        width: $s5;
        height: $s3;
      }
    }

    nav {
      width: auto;

      a {
        display: block;
        padding: $s1 $s0 $s0;
        height: 100%;
        line-height: 1;
        border-right: 1px solid $grey;

        &:hover,
        &:focus {
          background: $gris-pale;
        }

        &[aria-current="page"] {
          background: $gris-pale;
          border-bottom: 2px solid;
        }
      }
    }
  }
</style>
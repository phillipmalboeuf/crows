<script lang="ts">
	import Logo from './Logo.svelte'
	import { page } from '$app/state'
  import { getLocale, setLocale } from '$lib/paraglide/runtime'
</script>

<header class="flex">
  <a href="/" class="logo">
    <Logo />
  </a>
  <nav class="flex flex--bottom">
    <a href="/materials" aria-current={page.url.pathname === '/materials' ? 'page' : undefined}>{getLocale() === 'fr' ? 'Matériaux' : 'Materials'}</a>
    <a href="/hours" aria-current={page.url.pathname === '/hours' ? 'page' : undefined}>{getLocale() === 'fr' ? 'Heures' : 'Hours'}</a>
    <a href="/goblins" aria-current={page.url.pathname.startsWith('/goblins') ? 'page' : undefined}>Goblins</a>
    <a href="/payouts" aria-current={page.url.pathname === '/payouts' ? 'page' : undefined}>{getLocale() === 'fr' ? 'Paiements' : 'Payouts'}</a>
    <a href="/orders" aria-current={page.url.pathname === '/orders' ? 'page' : undefined}>{getLocale() === 'fr' ? 'Commandes' : 'Orders'}</a>
  </nav>
  <nav class="flex flex--tight_gapped flex--middle">
    <button class:button--muted={getLocale() !== 'fr'} class:button--dark={getLocale() === 'fr'} onclick={() => setLocale('fr')}>Français</button>
    <button class:button--muted={getLocale() !== 'en'} class:button--dark={getLocale() === 'en'} onclick={() => setLocale('en')}>English</button>
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

      & + nav {
        margin-left: auto;
        margin-right: $s0;
      }
    }
  }
</style>
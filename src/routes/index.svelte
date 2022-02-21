<script lang="ts">
    import Banner from "../banner.svelte";
    import Sidebar from "../sidebar.svelte";
</script>
<style lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
<Banner/>
<h1 class="text-center">Welcome to a new project!</h1>
<Sidebar/>
<a href="/about">about us.</a>

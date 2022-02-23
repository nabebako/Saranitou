<script lang="ts">
    import './main.css';

    $: name = '';
    $: description = '';

    function refresh()
    {
        const req = new XMLHttpRequest();
        req.onload = () =>
        {
            const res = JSON.parse(req.response);
            console.log(res);
            name = res.name;
            description = res.description;
        }
        req.open('get', '/rec');
        req.send();
    }

    function reset()
    {
        name = '';
        description = '';
    }

</script>

<div class="rec mx-auto w-fit">
    {#if name === '' && description === ''}
        <div class="mx-auto text-center pb-4">
            <p class="text-xl">Welcome to the application</p>
            <p class="text-base">Hit the button below to get a food recomendation.</p>
        </div>
    {:else}
        <p id="title" class="text-center">{name}</p>
        <div class="relative text-center">
            <img class="mx-auto w-96" src="/favicon.png" alt="{name}" id="food-img" />
            <p class="absolute bottom-5" id="description">{description}</p>
        </div>
    {/if}
    <div class="flex">
        <div class="bnt" on:click="{refresh}">
            <p class="w-fit py-1 px-2">Hit me up!</p>
        </div>
        <div class="bnt">
            <p class="w-fit py-1 px-2" on:click="{reset}">Reset</p>
        </div>
    </div>
</div>
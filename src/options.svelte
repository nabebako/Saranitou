<script>
    import './main.pcss';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let shouldBeOpen = false;
    export let options = {};

    onMount(() =>
    {
        options = JSON.parse(localStorage.getItem('options')) ?? {};
        Object.keys(options).forEach((key) =>
        {
            const input: HTMLInputElement = document.querySelector(`input[name=${key}]`);
            if(input.type === 'text')
            {
                input.value = options[key]['value'];
            }
            input.checked = options[key]['checked'];
        });
    });
    
    function saveOptions()
    {
        document
            .querySelector('form')
            .querySelectorAll('input')
            .forEach((input) => {
                options[input.name] = {
                    'value': input.value ?? '',
                    'checked': input?.checked ?? true,
                }
            });
        localStorage.setItem('options', JSON.stringify(options));
        shouldBeOpen = false;
    }
</script>
<div>
    <form on:submit|preventDefault="{saveOptions}">
        <fieldset name="time">
            <legend>Time</legend>
            <input type="checkbox" name="breakfast" id="breakfast" value="breakfast">
            <label for="breakfast">Breakfast</label>
            <input type="checkbox" name="lunch" id="lunch" value="lunch">
            <label for="lunch">Lunch</label>
            <input type="checkbox" name="dinner" id="dinner" value="dinner">
            <label for="dinner">Dinner</label>
        </fieldset>
        <input class="bnt" type="submit" name="submit" value="Save & exit">
    </form>
</div>
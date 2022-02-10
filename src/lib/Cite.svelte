<script>
    import { bibliography } from "$lib/bib.js";

    export let to;

    // set an index to each item
    let index = 1;
    for (const value of Object.values(bibliography)) {
        value.index = index;
        ++index;
    }

    const getBibIndex = (to) => {
        if (to in bibliography) return bibliography[to].index;
        return undefined;
    };
</script>

<span
    class="cite"
    on:click={(e) => {
        e.preventDefault();
        let el = document.querySelector(`#bib-${to}`);
        el.scrollIntoView({
            behavior: "smooth",
        });
    }}>[<a href="#bib-{to}" class="no-underline">{getBibIndex(to)}</a>]</span
>

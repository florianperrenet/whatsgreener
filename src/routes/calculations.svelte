<script context="module">
  import { browser, dev } from "$app/env";

  // // we don't need any JS on this page, though we'll load
  // // it in dev so that we get hot module replacement...
  // export const hydrate = dev;

  // // ...but if the client-side router is already loaded
  // // (i.e. we came here from elsewhere in the app), use it
  // export const router = browser;

  // // since there's no dynamic data here, we can prerender
  // // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script>
  import { afterNavigate } from "$app/navigation";

  import Toc from "$lib/Toc.svelte";
  import CalculationContent from "$lib/CalculationContent.svelte";
  import SidebarLayout from "$lib/SidebarLayout.svelte";
  import Input from "$lib/Input.svelte";
  import SearchBox from "$lib/components/SearchBox.svelte";
  import { MeiliSearch } from "meilisearch";

  const meilisearch_apikey =
    "XZEH8BS98d4f2cef44a4d29a97af21020348f08a6942ff07c2e905d064177d766676e1fb";

  const meilisearch_client = new MeiliSearch({
    host: "https://search.whatsgreener.xyz",
    apiKey: meilisearch_apikey,
  });

  const search_index = meilisearch_client.index("calculations");

  function titleToId(title) {
    return title.toLowerCase().replace(/\W/g, "_");
  }

  let search = "";
  let search_result;

  $: if (search) {
    search_index
      .search(search, {
        attributesToHighlight: ["title", "content"],
      })
      .then((res) => {
        search_result = res;
      });
  }

  let headings = [];
  let headingSelector = "main :where(h1, h2, h3, h4, h5, h6)";
  // let headingSelector = "main :where(h1, h2)";
  let getHeadingLevels = (node) => Number(node.nodeName[1]); // get the number from H1, H2, ...

  let getHeadingLevel = (node) => Number(node.nodeName[1]);

  $: levels = headings.map(getHeadingLevels);
  $: minLevel = Math.min(...levels);

  let toc = [];
  let scrollY;
  let windowWidth;
  let windowHeight;

  let activeHeading = null;
  let visibleHeadings = [];

  afterNavigate(() => {
    // let citeSelector = "main :where(.cite)";
    // let cites = [...document.querySelectorAll(citeSelector)];
    // let citeidx = 1;
    // cites.map((el) => {
    // 	el.innerHTML = `[${citeidx}]`;
    // 	++citeidx;
    // });

    headings = [...document.querySelectorAll(headingSelector)];

    // set first heading as active if null on page load
    if (activeHeading === null) activeHeading = headings[0];
    const observer = new IntersectionObserver(
      (entries) => {
        // callback receives only observed nodes whose intersection changed
        entries = entries.filter((en) => en.isIntersecting);
        visibleHeadings = entries.map((en) => en.target);
      },
      {
        threshold: 1,
        rootMargin: "-60px 0px -80% 0px",
      } // only consider headings intersecting once they fully entered viewport
    );

    headings.map((hdn) => observer.observe(hdn));

    // set ids on headings
    headings.map((el) => {
      el.id = titleToId(el.innerText);
    });

    function get_nested(arr) {
      let idx = 0;
      let level = 2;

      function helper(level) {
        let res = [];

        while (idx < arr.length) {
          let item = arr[idx];
          let num = Number(item.nodeName[1]);

          if (num == level) {
            res.push({
              id: titleToId(item.innerText),
              item,
              level,
              children: [],
            });
            idx += 1;
          } else if (num > level) {
            let tmp = helper(num);
            // console.log(res);
            res[res.length - 1].children.push(...tmp);
          } else {
            return res;
          }
        }

        return res;
      }

      return helper(level);
    }

    toc = get_nested(headings);

    return () => observer.disconnect(); // clean up function to run when component unmounts
  });

  function setActiveHeading() {
    if (visibleHeadings.length === 1) {
      activeHeading = visibleHeadings[0];
    } else if (visibleHeadings.length > 1) {
      activeHeading = visibleHeadings[0];
    }
  }

  let searchbox_show = false;
</script>

<svelte:head>
  <title>Calculations</title>
</svelte:head>

<svelte:window
  bind:scrollY
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
  on:scroll={setActiveHeading}
/>

<SidebarLayout fixed={true}>
  <div slot="sidebar">
    <div class="sticky top-0">
      <div class="h-16 bg-gray-50" />
      <div class="bg-gray-50">
        <button
          class="relative flex w-full items-center rounded-md bg-white py-1.5 pl-2 pr-3 text-sm leading-6 text-gray-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-gray-300"
          on:click={() => (searchbox_show = true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          Quick search...
        </button>
      </div>
      <div class="h-8 bg-gradient-to-b from-gray-50" />
    </div>
    <div class="-mt-8">
      <Toc {toc} {activeHeading} root />
    </div>
  </div>

  <div slot="content">
    <CalculationContent />
  </div>
</SidebarLayout>

<SearchBox bind:search {search_result} bind:show={searchbox_show} />

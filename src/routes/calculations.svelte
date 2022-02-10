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
	import AboutContent from "$lib/AboutContent.svelte";
	import SidebarLayout from "$lib/SidebarLayout.svelte";

	function titleToId(title) {
		return title.toLowerCase().replace(/\W/g, "_");
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
						console.log(res);
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
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<svelte:window
	bind:scrollY
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight}
	on:scroll={setActiveHeading}
/>

<SidebarLayout>
	<div slot="sidebar">
		<Toc {toc} {activeHeading} root />
	</div>

	<div slot="content">
		<AboutContent />
	</div>
</SidebarLayout>

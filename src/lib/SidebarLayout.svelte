<script>
  export let fixed = false;
</script>

{#if fixed}
  <div class="relative w-full bg-white lg:bg-gray-50">
    <div
      class="hidden lg:block absolute top-0 bottom-0 right-0 left-1/2 bg-white"
    />
    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
      <nav
        class="hidden lg:block overflow-y-auto fixed inset-0 top-16 left-[max(0px,calc(50%-42.5rem))] right-auto w-[20rem] lg:w-[22.5rem] pb-10 px-8"
      >
        <div class="relative">
          <slot name="sidebar" />
        </div>
      </nav>

      <div class="lg:pl-[20.5rem]">
        <div class="relative mx-auto py-16 lg:px-16 bg-white lg:shadow-md">
          <div
            class="hidden lg:block absolute top-0 bottom-0 -right-4 w-8 bg-white"
          />
          <div class="prose lg:prose-lg prose-slate mx-auto">
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="relative flex w-full">
    <div
      class="hidden lg:block absolute top-0 bottom-0 right-0 left-1/2 bg-white"
    />
    <div
      class="relative bg-white lg:bg-gray-50 flex w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="w-full flex-none lg:grid lg:grid-cols-3 lg:gap-8">
        <div
          class="bg-gray-50 lg:bg-transparent -mx-4 sm:-mx-6 lg:mx-0 py-12 sm:py-16 px-4 sm:px-6 lg:pl-0 lg:pr-8"
        >
          <nav
            class="max-w-[37.5rem] mx-auto lg:max-w-none lg:mx-0 relative lg:sticky lg:top-20"
          >
            <slot name="sidebar" />
          </nav>
        </div>
        <div class="relative col-span-2 lg:-ml-8 bg-white lg:shadow-md">
          <div
            class="hidden lg:block absolute top-0 bottom-0 -right-4 w-8 bg-white"
          />
          <div class="relative py-16 lg:px-16">
            <div class="prose lg:prose-lg prose-slate mx-auto">
              <slot name="content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

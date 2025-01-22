<script lang="ts">
  export let dataTarget: string;
  export let initialValue: string;
</script>

<div
  class="flex w-full flex-col items-center rounded-base border-2 border-border bg-orange-400 p-4 text-black shadow-light"
>
  <h3 class="mb-2 text-2xl font-bold">Svelte</h3>
  <p data-value data-target={dataTarget} class="mb-4 text-8xl font-bold">
    {initialValue}
  </p>
</div>

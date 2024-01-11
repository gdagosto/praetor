export const indexJS = (name) => `export { default as ${name} } from './${name}.svelte';`;

export const svelteFile = (name) =>
	`<script lang='ts'>
</script>

<div class='wrapper'>
  ${name}
</div>

<style lang='scss'>
</style>
`;

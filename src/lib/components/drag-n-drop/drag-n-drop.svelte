<script lang="ts" generics="T">
	import { flip } from 'svelte/animate';
	import { type DndEvent, dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { onDestroy, onMount, type Snippet } from 'svelte';

	type ItemStep<T> = T & { id?: string; _id?: string };
	type DndItem<U> = U & { id: string; _id?: string };

	let {
		items = [],
		group = 'my-group',
		disabled = false,
		children,
		listName,
		class: className = '',
		onFinalize,
		itemClass = '',
		dragging = $bindable(false),
		maxItems = 0,
		timeLongPress = 0
	}: {
		items: T[]; // items of dnd
		children: Snippet<[T, number]>; // slot template for each item
		listName: string; // ari-label for accessibility and serve to make unique id
		onFinalize: (items: T[]) => void; // return the items list
		group?: string; // to group multiple dnd
		disabled?: boolean; // disable drag
		class?: string; // add class in dnd container
		itemClass?: string; // add items class
		dragging?: boolean; // is true when an item is dragging
		maxItems?: number; // max limit number of item in dnd container
		timeLongPress?: number; // time in milliseconds on press before active drag
	} = $props();

	const flipDurationMs = 100;

	let dndItems: DndItem<T>[] = $state([]);
	let mounted = $state(false);
	let itemsCache: T[] = $state([]);
	let full = $state(false);

	let longValid = false;
	let firstUp = false;
	let timeoutPtr: number | undefined;

	let dndElement: HTMLElement;

	/**
	 * return the HTML elements by class from the dnd group name
	 */
	const dndGroupElements = () => {
		return document.getElementsByClassName(`dnd-${group}`);
	};

	$effect(() => {
		if (items && mounted && !dragging) {
			if (JSON.stringify(items) !== JSON.stringify(itemsCache)) {
				buildListIn();
				itemsCache = JSON.parse(JSON.stringify(items));
			}
		}
	});

	onMount(async () => {
		itemsCache = JSON.parse(JSON.stringify(items));
		await buildListIn();
		mounted = true;

		if (timeLongPress > 0) {
			addLongPressEventListener();
		}
	});

	onDestroy(() => {
		if (timeLongPress > 0) {
			removeLongPressEventListener();
		}
	});

	// DND FUNCTIONS

	/**
	 * build the inside list from the outside list
	 * transform items to dnd items and set a unique id
	 */
	async function buildListIn(): Promise<void> {
		dndItems = [];
		for await (let [i, item] of Object.entries(items)) {
			let dndItem: DndItem<T> = JSON.parse(JSON.stringify(item));
			if (dndItem.id) dndItem._id = dndItem.id;
			dndItem.id = `${listName.replace(' ', '_')}-${i}`;
			dndItems = [...dndItems, dndItem];
		}
		// determines if this dnd container is full
		full = maxItems !== 0 && dndItems.length >= maxItems;
		if (full) {
			dndElement.classList.add('full');
		} else {
			dndElement.classList.remove('full');
		}
		return;
	}

	/**
	 * build outside list from the inside list
	 * transform dnd items to items without the id
	 */
	function buildListOut(): void {
		let mirrorItems: ItemStep<T>[] = JSON.parse(JSON.stringify(dndItems));
		items = mirrorItems.map((e) => {
			if (e._id) {
				e.id = e._id;
				delete e._id;
			} else {
				delete e.id;
			}
			return e;
		});
		full = maxItems !== 0 && dndItems.length >= maxItems;
	}

	/**
	 * run on each item moving
	 * @param e
	 */
	function handleDndConsider(e: CustomEvent<DndEvent<DndItem<T>>>) {
		if (!dragging) {
			dragging = true;
		}
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		dndItems = newItems;
		// Ensure dragging is stopped on drag finish via keyboard
		if (timeLongPress > 0 && source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			stopDrag();
		}
	}

	/**
	 * run when an item moved
	 * @param e
	 */
	function handleDndFinalize(e: CustomEvent<DndEvent<DndItem<T>>>) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		dragging = false;
		dndItems = newItems;
		buildListOut();
		onFinalize(items);
		itemsCache = JSON.parse(JSON.stringify(items));
		// Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (timeLongPress > 0 && source === SOURCES.POINTER) {
			stopDrag();
		}
	}

	/**
	 * run when an item is dragging
	 * @param draggedEl
	 */
	function transformDraggedElement(draggedEl: HTMLElement | undefined) {
		if (draggedEl) {
			draggedEl.style.border = 'none';
			draggedEl.style.outline = 'none';
		}
	}

	// LONG PRESS FEATURES

	/**
	 * add event listener for long press feature, need to use in "onMount()" method
	 */
	function addLongPressEventListener() {
		disabled = true;
		if (dndGroupElements()) {
			for (let elem of dndGroupElements()) {
				elem.addEventListener('mousedown', handleMouseDown);
				elem.addEventListener('touchstart', handleMouseDown);
			}
		}
		// disable long press menu in dnd items
		for (let elem of dndGroupElements()) {
			let item = elem as HTMLElement;
			item.oncontextmenu = function (e) {
				e.preventDefault();
				e.stopPropagation();
				// e.stopImmediatePropagation();
				return false;
			};
		}
	}

	/**
	 * need to use in "onDestroy()" method
	 */
	function removeLongPressEventListener() {
		for (let elem of dndGroupElements()) {
			elem.removeEventListener('mousedown', handleMouseDown);
			elem.removeEventListener('touchstart', handleMouseDown);
		}
		longValid = false;
	}

	/**
	 * serves for long press feature
	 */
	function startDrag() {
		disabled = false;
	}

	/**
	 * serves for long press feature
	 */
	function stopDrag() {
		disabled = true;
	}

	/**
	 * serves for long press feature
	 */
	function handleMouseDown() {
		if (timeLongPress > 0) {
			window.addEventListener('mousemove', handleMoveBeforeLong);
			if (!longValid) {
				timeoutPtr = window.setTimeout(() => {
					window.addEventListener('mouseup', handleMouseUp);
					window.addEventListener('touchend', handleMouseUp);
					window.removeEventListener('mousemove', handleMoveBeforeLong);
					longValid = true;
					firstUp = true;
					startDrag();
				}, timeLongPress);
			}
		}
	}

	/**
	 * serves for long press feature
	 */
	function handleMoveBeforeLong() {
		window.clearTimeout(timeoutPtr);
		window.removeEventListener('mousemove', handleMoveBeforeLong);
		window.removeEventListener('mouseup', handleMouseUp);
		window.removeEventListener('touchend', handleMouseUp);
	}

	/**
	 * serves for long press feature
	 */
	function handleMouseUp() {
		if (!firstUp) {
			window.clearTimeout(timeoutPtr);
			window.removeEventListener('mousemove', handleMoveBeforeLong);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('touchend', handleMouseUp);
			stopDrag();
			longValid = false;
		}
		firstUp = false;
	}
</script>

<section
	class="{className} dnd-{group}"
	use:dndzone={{
		items: dndItems,
		flipDurationMs,
		type: group,
		dragDisabled: disabled,
		dropTargetStyle: { outline: 'none' },
		dropTargetClasses: ['bg-slate-300/10', 'w-full'],
		transformDraggedElement,
		dropFromOthersDisabled: full
	}}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	aria-label={listName}
	bind:this={dndElement}
>
	{#each dndItems as dndItem, idx (dndItem.id)}
		<div animate:flip={{ duration: flipDurationMs }} class={itemClass}>
			{@render children(dndItem, idx)}
		</div>
	{/each}
</section>
